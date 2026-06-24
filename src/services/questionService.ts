import { supabase } from "../lib/supabase";

export type Question = {
  id: string;
  title: string;
  body: string | null;
  community_id: string | null;
  author_id: string;
  created_at: string;
  author?: { username: string | null; avatar_url: string | null };
  answers_count?: number;
};

export type Answer = {
  id: string;
  question_id: string;
  author_id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  is_accepted: boolean;
  created_at: string;
  author?: { username: string | null; avatar_url: string | null; is_senior?: boolean };
  userVote?: "up" | "down" | null;
};

export async function fetchQuestions(communityId?: string): Promise<Question[]> {
  let query = supabase
    .from("questions")
    .select("*, author:profiles!questions_author_id_fkey (username, avatar_url)")
    .order("created_at", { ascending: false });

  if (communityId) query = query.eq("community_id", communityId);

  const { data, error } = await query;
  if (error) throw error;

  const ids = data?.map((q) => q.id) ?? [];
  const answerCounts = await getAnswerCounts(ids);

  return (data ?? []).map((q: any) => ({
    ...q,
    author: q.author ?? null,
    answers_count: answerCounts[q.id] ?? 0,
  }));
}

async function getAnswerCounts(questionIds: string[]): Promise<Record<string, number>> {
  if (questionIds.length === 0) return {};
  const { data } = await supabase.from("answers").select("question_id").in("question_id", questionIds);
  const counts: Record<string, number> = {};
  data?.forEach((a) => { counts[a.question_id] = (counts[a.question_id] ?? 0) + 1; });
  return counts;
}

export async function askQuestion(title: string, body: string, communityId?: string): Promise<Question> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("questions")
    .insert({ title, body: body || null, community_id: communityId || null, author_id: user.id })
    .select("*, author:profiles!questions_author_id_fkey (username, avatar_url)")
    .single();
  if (error) throw error;
  return { ...data, author: (data as any).author ?? null, answers_count: 0 };
}

export async function fetchAnswers(questionId: string, userId?: string): Promise<Answer[]> {
  const { data: answers, error } = await supabase
    .from("answers")
    .select("*, author:profiles!answers_author_id_fkey (username, avatar_url, is_senior)")
    .eq("question_id", questionId)
    .order("upvotes", { ascending: false });

  if (error) throw error;

  if (userId && answers?.length) {
    const { data: votes } = await supabase
      .from("answer_votes")
      .select("answer_id, vote_type")
      .eq("user_id", userId)
      .in("answer_id", answers.map((a) => a.id));

    const voteMap: Record<string, "up" | "down"> = {};
    votes?.forEach((v) => { voteMap[v.answer_id] = v.vote_type as "up" | "down"; });

    return (answers ?? []).map((a: any) => ({
      ...a,
      author: a.author ?? null,
      userVote: voteMap[a.id] ?? null,
    }));
  }

  return (answers ?? []).map((a: any) => ({
    ...a,
    author: a.author ?? null,
    userVote: null,
  }));
}

export async function submitAnswer(questionId: string, content: string): Promise<Answer> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("answers")
    .insert({ question_id: questionId, author_id: user.id, content })
    .select("*, author:profiles!answers_author_id_fkey (username, avatar_url, is_senior)")
    .single();
  if (error) throw error;
  return { ...data, author: (data as any).author ?? null, userVote: null };
}

export async function voteAnswer(answerId: string, type: "up" | "down"): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("answer_votes")
    .select("id, vote_type")
    .eq("answer_id", answerId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing?.vote_type === type) {
    await supabase.from("answer_votes").delete().eq("id", existing.id);
    await supabase.rpc("decrement_vote", { p_post_id: answerId, p_column: type === "up" ? "upvotes" : "downvotes" });
  } else if (existing) {
    await supabase.from("answer_votes").update({ vote_type: type }).eq("id", existing.id);
    await supabase.rpc("increment", { table_name: "answers", column_name: type === "up" ? "upvotes" : "downvotes", row_id: answerId });
    await supabase.rpc("decrement_vote", { p_post_id: answerId, p_column: type === "up" ? "downvotes" : "upvotes" });
  } else {
    await supabase.from("answer_votes").insert({ answer_id: answerId, user_id: user.id, vote_type: type });
    await supabase.rpc("increment", { table_name: "answers", column_name: type === "up" ? "upvotes" : "downvotes", row_id: answerId });
  }
}

export async function acceptAnswer(answerId: string, questionId: string): Promise<void> {
  await supabase.from("answers").update({ is_accepted: false }).eq("question_id", questionId);
  await supabase.from("answers").update({ is_accepted: true }).eq("id", answerId);
}