import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

export type PostWithProfile =
  Database["public"]["Tables"]["posts"]["Row"] & {
    profiles: {
      username: string | null;
      avatar_url: string | null;
      role: string | null;
    } | null;

    comments_count: number;
  };

async function getCommentCounts(
  postIds: string[]
) {
  if (postIds.length === 0)
    return {};

  const { data } =
    await supabase
      .from("comments")
      .select("post_id");

  const counts: Record<
    string,
    number
  > = {};

  data?.forEach((comment) => {
    const postId =
      comment.post_id;

    if (!postId) return;

    counts[postId] =
      (counts[postId] ?? 0) + 1;
  });

  return counts;
}

export async function fetchPosts({
  cursor,
  limit = 10,
  sortBy = "hot",
}: {
  cursor?: string;
  limit?: number;
  sortBy?: "hot" | "new";
} = {}): Promise<{
  data: PostWithProfile[];
  nextCursor: string | null;
}> {
  let query = supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url,
        role
      )
    `
    )
    .limit(limit + 1);

  if (sortBy === "hot") {
    query = query.order(
      "score",
      {
        ascending: false,
      }
    );
  } else {
    query = query.order(
      "created_at",
      {
        ascending: false,
      }
    );

    if (cursor) {
      query = query.lt(
        "created_at",
        cursor
      );
    }
  }

  const { data, error } =
    await query;

  if (error) throw error;

  const rows = data ?? [];

  const hasMore =
    rows.length > limit;

  const posts = hasMore
    ? rows.slice(0, limit)
    : rows;

  const postIds =
    posts.map((p) => p.id);

  const countMap =
    await getCommentCounts(
      postIds
    );

  const enriched =
    posts.map((post: any) => ({
      ...post,

      profiles:
        Array.isArray(
          post.profiles
        )
          ? post.profiles[0] ??
            null
          : post.profiles ??
            null,

      comments_count:
        countMap[
          post.id
        ] ?? 0,
    }));

  return {
    data:
      enriched as PostWithProfile[],

    nextCursor:
      hasMore &&
      sortBy === "new"
        ? enriched[
            enriched.length - 1
          ].created_at
        : null,
  };
}

export async function fetchHotPosts(
  limit = 20
) {
  const result =
    await fetchPosts({
      limit,
      sortBy: "hot",
    });

  return result.data;
}

export async function createPost(
  userId: string,
  content: string,
  imageUrl?: string | null
) {
  const { data, error } =
    await supabase
      .from("posts")
      .insert({
        user_id: userId,
        content,
        image_url:
          imageUrl ?? null,
        upvotes: 0,
        downvotes: 0,
      })
      .select()
      .single();

  if (error) throw error;

  return data;
}


export async function votePost(
  postId: string,
  userId: string,
  type: "up" | "down"
) {
  const { data: existingVote, error: voteError } =
    await supabase
      .from("post_votes")
      .select("id,vote_type")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

  if (voteError) throw voteError;

  // REMOVE EXISTING VOTE
  if (
    existingVote &&
    existingVote.vote_type === type
  ) {
    const { error: deleteVoteError } =
      await supabase
        .from("post_votes")
        .delete()
        .eq("id", existingVote.id);

    if (deleteVoteError)
      throw deleteVoteError;

    const {
      data: post,
      error: postError,
    } = await supabase
      .from("posts")
      .select("upvotes,downvotes")
      .eq("id", postId)
      .single();

    if (postError) throw postError;
    if (!post) return;

    const upvotes =
      post.upvotes ?? 0;

    const downvotes =
      post.downvotes ?? 0;

    const { error: updateError } =
      await supabase
        .from("posts")
        .update({
          upvotes:
            type === "up"
              ? Math.max(
                  0,
                  upvotes - 1
                )
              : upvotes,

          downvotes:
            type === "down"
              ? Math.max(
                  0,
                  downvotes - 1
                )
              : downvotes,
        })
        .eq("id", postId);

    if (updateError)
      throw updateError;

    return;
  }

  // SWITCH VOTE
  if (existingVote) {
    const { error: switchError } =
      await supabase
        .from("post_votes")
        .update({
          vote_type: type,
        })
        .eq("id", existingVote.id);

    if (switchError)
      throw switchError;

    const {
      data: post,
      error: postError,
    } = await supabase
      .from("posts")
      .select("upvotes,downvotes")
      .eq("id", postId)
      .single();

    if (postError) throw postError;
    if (!post) return;

    const upvotes =
      post.upvotes ?? 0;

    const downvotes =
      post.downvotes ?? 0;

    const { error: updateError } =
      await supabase
        .from("posts")
        .update({
          upvotes:
            type === "up"
              ? upvotes + 1
              : Math.max(
                  0,
                  upvotes - 1
                ),

          downvotes:
            type === "down"
              ? downvotes + 1
              : Math.max(
                  0,
                  downvotes - 1
                ),
        })
        .eq("id", postId);

    if (updateError)
      throw updateError;

    return;
  }

  // FIRST VOTE
  const { error: insertVoteError } =
    await supabase
      .from("post_votes")
      .insert({
        post_id: postId,
        user_id: userId,
        vote_type: type,
      });

  if (insertVoteError)
    throw insertVoteError;

  const {
    data: post,
    error: postError,
  } = await supabase
    .from("posts")
    .select("upvotes,downvotes")
    .eq("id", postId)
    .single();

  if (postError) throw postError;
  if (!post) return;

  const upvotes =
    post.upvotes ?? 0;

  const downvotes =
    post.downvotes ?? 0;

  const { error: updateError } =
    await supabase
      .from("posts")
      .update({
        upvotes:
          type === "up"
            ? upvotes + 1
            : upvotes,

        downvotes:
          type === "down"
            ? downvotes + 1
            : downvotes,
      })
      .eq("id", postId);

  if (updateError)
    throw updateError;
}

export async function deletePost(
  postId: string
) {
  const { error } =
    await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

  if (error) throw error;
}

export async function deleteComment(
  commentId: string
) {
  const { error } =
    await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

  if (error) throw error;
}

export function subscribeToPosts(
  callback: (payload: any) => void
) {
  return supabase
    .channel("posts-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        
        callback(payload)
      }
    )
    .subscribe();
}

export async function fetchAllPostsForModeration() {
  const { data, error } =
    await supabase
      .from("posts")
      .select(
        `
        *,
        profiles (
          username,
          avatar_url,
          role
        )
      `
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) throw error;

  return (data ?? []).map(
    (post: any) => ({
      ...post,

      profiles:
        Array.isArray(
          post.profiles
        )
          ? post.profiles[0] ??
            null
          : post.profiles ??
            null,

      comments_count: 0,
    })
  ) as PostWithProfile[];
}

export async function fetchAllCommentsForModeration() {
  const { data, error } =
    await supabase
      .from("comments")
      .select(
        `
        *,
        profiles (
          username,
          role
        )
      `
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) throw error;

  return data ?? [];
}