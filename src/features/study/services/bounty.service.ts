import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type PaperBounty = Database["public"]["Tables"]["paper_bounties"]["Row"] & {
  creator_username?: string | null;
};

export type PaperSolution = Database["public"]["Tables"]["paper_solutions"]["Row"] & {
  author_username?: string | null;
  has_upvoted?: boolean;
};

export type BountyStatus = "open" | "fulfilled" | "closed" | "all";

export type CreateBountyParams = {
  course_code: string;
  academic_year: string;
  paper_type: string;
  bounty_karma?: number;
};

// ─── Bounties ────────────────────────────────────────────────────────────
export async function fetchBounties(status: BountyStatus = "open"): Promise<PaperBounty[]> {
  let query = supabase
    .from("paper_bounties")
    .select(`*, profiles:created_by (username)`)
    .order("created_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((b: any) => ({
    ...b,
    creator_username: b.profiles?.username ?? null,
  }));
}

export async function createBounty(userId: string, params: CreateBountyParams) {
  const { error } = await supabase.from("paper_bounties").insert({
    course_code: params.course_code,
    academic_year: params.academic_year,
    paper_type: params.paper_type,
    bounty_karma: params.bounty_karma ?? 10,
    created_by: userId,
  });
  if (error) throw error;
}

export async function closeBounty(bountyId: string) {
  const { error } = await supabase.from("paper_bounties").update({ status: "closed" }).eq("id", bountyId);
  if (error) throw error;
}

// Atomic: verifies the bounty is still open, marks it fulfilled, links the
// material, and pays out karma to the fulfiller — all in one server-side
// transaction, so it can't be raced or handed a fabricated karma amount.
export async function fulfillBounty(bountyId: string, materialId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("fulfill_bounty", {
    p_bounty_id: bountyId,
    p_material_id: materialId,
  });
  if (error) {
    console.warn("Failed to fulfill bounty", error);
    return false;
  }
  return Boolean(data);
}

// ─── Solutions ───────────────────────────────────────────────────────────
export async function fetchSolutions(materialId: string, userId?: string): Promise<PaperSolution[]> {
  const { data, error } = await supabase
    .from("paper_solutions")
    .select(`*, profiles:author_id (username)`)
    .eq("material_id", materialId)
    .order("upvotes_count", { ascending: false })
    .order("created_at", { ascending: true });
  if (error) throw error;

  let upvotedIds = new Set<string>();
  if (userId && data?.length) {
    const { data: upvotes } = await supabase
      .from("solution_upvotes")
      .select("solution_id")
      .eq("user_id", userId)
      .in(
        "solution_id",
        data.map((s) => s.id)
      );
    upvotedIds = new Set((upvotes ?? []).map((u) => u.solution_id));
  }

  return (data ?? []).map((s: any) => ({
    ...s,
    author_username: s.profiles?.username ?? null,
    has_upvoted: upvotedIds.has(s.id),
  }));
}

export async function createSolution(
  authorId: string,
  materialId: string,
  questionNumber: string,
  solutionText: string
) {
  const { error } = await supabase.from("paper_solutions").insert({
    material_id: materialId,
    question_number: questionNumber,
    solution_text: solutionText,
    author_id: authorId,
  });
  if (error) throw error;
}

// Atomic toggle — the RPC resolves the user from auth.uid() server-side
// rather than trusting a client-supplied id, and updates upvotes_count in
// the same transaction as the upvote row so the count can't drift.
export async function toggleSolutionUpvote(solutionId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("toggle_solution_upvote", {
    p_solution_id: solutionId,
  });
  if (error) {
    console.warn("Failed to toggle upvote", error);
    throw error;
  }
  return Boolean(data);
}
