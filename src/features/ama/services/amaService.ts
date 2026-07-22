import { supabase } from "../../../lib/supabase";

export type AMASession = {
  id: string;
  lecturer_id: string;
  community_id: string;
  scheduled_for: string;
  duration_minutes: number;
  status: "scheduled" | "live" | "ended";
  created_at: string;
  lecturer?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

export type AMAQuestion = {
  id: string;
  session_id: string;
  asked_by: string;
  question: string;
  upvotes: number;
  answered: boolean;
  created_at: string;
  askedByProfile?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
  userVote?: "up" | null;
};

export async function fetchCommunityAMAs(communityId: string): Promise<AMASession[]> {
  const { data, error } = await supabase
    .from("ama_sessions")
    .select("*, lecturer:lecturer_id (username, avatar_url)")
    .eq("community_id", communityId)
    .order("scheduled_for", { ascending: false });

  if (error) throw error;
  return (data ?? []) as any;
}

export async function fetchAMASession(
  sessionId: string,
  userId?: string | null
): Promise<{ session: AMASession; questions: AMAQuestion[] }> {
  const { data: session, error: sessionError } = await supabase
    .from("ama_sessions")
    .select("*, lecturer:lecturer_id (username, avatar_url)")
    .eq("id", sessionId)
    .single();

  if (sessionError) throw sessionError;
  if (!session) throw new Error("AMA session not found");

  const { data: questions, error: qError } = await supabase
    .from("ama_questions")
    .select("*, askedByProfile:asked_by (username, avatar_url)")
    .eq("session_id", sessionId)
    .order("upvotes", { ascending: false })
    .order("created_at", { ascending: true });

  if (qError) throw qError;

  // Attach userVote so the UI can reflect whether the current user upvoted.
  const userVoteMap: Record<string, "up"> = {};
  if (userId) {
    const { data: votes, error: vError } = await supabase
      .from("ama_question_votes")
      .select("question_id")
      .eq("user_id", userId)
      .in("question_id", (questions ?? []).map((q: any) => q.id));

    if (vError) throw vError;
    (votes ?? []).forEach((v: any) => {
      userVoteMap[v.question_id] = "up";
    });
  }

  return {
    session: session as any,
    questions: (questions ?? []).map((q: any) => ({
      ...q,
      askedByProfile: Array.isArray(q.askedByProfile)
        ? q.askedByProfile[0] ?? null
        : q.askedByProfile,
      userVote: userVoteMap[q.id] ?? null,
    })),
  };
}

export async function submitAMAQuestion(
  sessionId: string,
  question: string
): Promise<AMAQuestion> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("ama_questions")
    .insert({ session_id: sessionId, asked_by: user.id, question })
    .select("*, askedByProfile:asked_by (username, avatar_url)")
    .single();

  if (error) throw error;
  return data as any;
}

export async function toggleUpvote(questionId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: existing, error: existingError } = await supabase
    .from("ama_question_votes")
    .select("question_id")
    .eq("question_id", questionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    // Already voted — remove the vote (toggle off).
    const { error: delErr } = await supabase
      .from("ama_question_votes")
      .delete()
      .eq("question_id", questionId)
      .eq("user_id", user.id);
    if (delErr) throw delErr;
    return;
  }

  // New vote — insert.
  const { error: insErr } = await supabase
    .from("ama_question_votes")
    .insert({ question_id: questionId, user_id: user.id });
  if (insErr && insErr.code !== "23505") throw insErr;
}
