import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";

import {
  Send,
  Trash2,
  ImageIcon,
  ArrowBigUp,
  ArrowBigDown,
  X,
  Loader2,
} from "lucide-react";

interface Props {
  postId: string;
  onClose? : ()=> void;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string | null;
  image_url: string | null;
  created_at: string;

  profiles?: {
    username?: string;
    avatar_url?: string;
    role?: string;
  };

  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
}

const MAX_COMMENT_LENGTH = 500;

export default function CommentSection({
  postId,
}: Props) {
  const user =
    useAuthStore(
      (s) => s.user
    );

  const { role } =
    useUserRole();

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [content, setContent] =
    useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const imagePreview =
    useMemo(() => {
      if (!imageFile)
        return null;

      return URL.createObjectURL(
        imageFile
      );
    }, [imageFile]);

  async function loadComments() {
    try {
      const {
        data: commentsData,
        error,
      } = await supabase
        .from("comments")
        .select(`
          *,
          profiles(
            username,
            avatar_url,
            role
          )
        `)
        .eq(
          "post_id",
          postId
        )
        .order(
          "created_at",
          {
            ascending: true,
          }
        );

      if (error)
        throw error;

      const ids =
        commentsData?.map(
          (c) => c.id
        ) ?? [];

      let votes: any[] = [];

      if (ids.length) {
        const {
          data,
        } = await supabase
          .from(
            "comment_votes"
          )
          .select(
            "comment_id,user_id,vote_type"
          )
          .in(
            "comment_id",
            ids
          );

        votes = data ?? [];
      }

      const mapped: Comment[] =
        (commentsData??[]).map(
          (
            comment
          ) => {
            const commentVotes =
              votes.filter(
                (
                  vote
                ) =>
                  vote.comment_id ===
                  comment.id
              );

            return {
  ...comment,

  profiles: Array.isArray(
    comment.profiles
  )
    ? comment.profiles[0] ?? undefined
    : comment.profiles ?? undefined,

  upvotes:
    commentVotes.filter(
      (vote) =>
        vote.vote_type === "up"
    ).length,

  downvotes:
    commentVotes.filter(
      (vote) =>
        vote.vote_type === "down"
    ).length,

  userVote:
    commentVotes.find(
      (vote) =>
        vote.user_id === user?.id
    )?.vote_type ?? null,
} as Comment;
          }
        ) ?? [];

      setComments(
        mapped
      );
    } catch (
      error
    ) {
      console.error(
        error
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(() => {
    loadComments();

    const channel =
      supabase
        .channel(
          `comments-${postId}`
        )
        .on(
          "postgres_changes",
          {
            event:
              "*",
            schema:
              "public",
            table:
              "comments",
            filter: `post_id=eq.${postId}`,
          },
          (
            payload
          ) => {
            if (
              payload.eventType ===
              "INSERT"
            ) {
              loadComments();
            }

            if (
              payload.eventType ===
              "DELETE"
            ) {
              setComments(
                (
                  prev
                ) =>
                  prev.filter(
                    (
                      c
                    ) =>
                      c.id !==
                      payload.old.id
                  )
              );
            }
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  }, [
    postId,
    user?.id,
  ]);

  async function uploadImage() {
    if (!imageFile)
      return null;

    setUploadingImage(
      true
    );

    try {
      const fileName = `${user?.id}/${Date.now()}-${imageFile.name}`;

      const {
        error,
      } =
        await supabase.storage
          .from(
            "comment-images"
          )
          .upload(
            fileName,
            imageFile,
            {
              upsert: false,
            }
          );

      if (error)
        throw error;

      const {
        data,
      } =
        supabase.storage
          .from(
            "comment-images"
          )
          .getPublicUrl(
            fileName
          );

      return data.publicUrl;
    } finally {
      setUploadingImage(
        false
      );
    }
  }

  async function handleSubmit() {
    if (
      sending ||
      !user
    )
      return;

    if (
      !content.trim() &&
      !imageFile
    ) {
      return;
    }

    try {
      setSending(
        true
      );

      let imageUrl =
        null;

      if (
        imageFile
      ) {
        imageUrl =
          await uploadImage();
      }

      const {
        error,
      } = await supabase
        .from(
          "comments"
        )
        .insert({
          post_id:
            postId,
          user_id:
            user.id,
          content:
            content.trim(),
          image_url:
            imageUrl,
        });

      if (error)
        throw error;

      setContent(
        ""
      );

      setImageFile(
        null
      );
    } catch (
      error
    ) {
      console.error(
        error
      );
    } finally {
      setSending(
        false
      );
    }
  }

  async function handleVote(
    commentId: string,
    type:
      | "up"
      | "down"
  ) {
    if (!user)
      return;

    const comment =
      comments.find(
        (
          c
        ) =>
          c.id ===
          commentId
      );

    if (!comment)
      return;

    const current =
      comment.userVote;

    setComments(
      (prev) =>
        prev.map(
          (c) => {
            if (
              c.id !==
              commentId
            )
              return c;

            let up =
              c.upvotes;

            let down =
              c.downvotes;

            if (
              current ===
              "up"
            )
              up--;

            if (
              current ===
              "down"
            )
              down--;

            if (
              current !==
              type
            ) {
              if (
                type ===
                "up"
              )
                up++;

              if (
                type ===
                "down"
              )
                down++;
            }

            return {
              ...c,
              upvotes:
                up,
              downvotes:
                down,
              userVote:
                current ===
                type
                  ? null
                  : type,
            };
          }
        )
    );

    if (
      current ===
      type
    ) {
      await supabase
        .from(
          "comment_votes"
        )
        .delete()
        .eq(
          "comment_id",
          commentId
        )
        .eq(
          "user_id",
          user.id
        );
    } else {
      await supabase
        .from(
          "comment_votes"
        )
        .upsert({
          comment_id:
            commentId,
          user_id:
            user.id,
          vote_type:
            type,
        });
    }
  }

  async function handleDelete(
    id: string
  ) {
    setComments(
      (prev) =>
        prev.filter(
          (
            c
          ) =>
            c.id !== id
        )
    );

    await supabase
      .from(
        "comments"
      )
      .delete()
      .eq(
        "id",
        id
      );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-sm opacity-60">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {comments.map(
          (
            comment
          ) => (
            <div
              key={
                comment.id
              }
              className="flex gap-3"
            >
              {comment
                .profiles
                ?.avatar_url ? (
                <img
                  src={
                    comment
                      .profiles
                      .avatar_url
                  }
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                  {comment.profiles?.username?.[0]?.toUpperCase() ??
                    "?"}
                </div>
              )}

              <div className="flex-1">
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-3">
                  <div className="font-semibold text-sm">
                    {comment.profiles?.username ??
                      "Anonymous"}
                  </div>

                  {comment.content && (
                    <p className="mt-1 text-sm whitespace-pre-wrap">
                      {
                        comment.content
                      }
                    </p>
                  )}

                  {comment.image_url && (
                    <img
                      src={
                        comment.image_url
                      }
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="mt-3 rounded-2xl max-h-72 w-full object-cover"
                    />
                  )}
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <button
                    onClick={() =>
                      handleVote(
                        comment.id,
                        "up"
                      )
                    }
                    className={`flex items-center gap-1 text-xs ${
                      comment.userVote ===
                      "up"
                        ? "text-emerald-500"
                        : ""
                    }`}
                  >
                    <ArrowBigUp size={16} />
                    {
                      comment.upvotes
                    }
                  </button>

                  <button
                    onClick={() =>
                      handleVote(
                        comment.id,
                        "down"
                      )
                    }
                    className={`flex items-center gap-1 text-xs ${
                      comment.userVote ===
                      "down"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <ArrowBigDown size={16} />
                    {
                      comment.downvotes
                    }
                  </button>

                  {(user?.id ===
                    comment.user_id ||
                    role ===
                      "admin" ||
                    role ===
                      "moderator") && (
                    <button
                    aria-label="delete"
                      onClick={() =>
                        handleDelete(
                          comment.id
                        )
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <textarea
          rows={3}
          value={content}
          maxLength={
            MAX_COMMENT_LENGTH
          }
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="Write a comment..."
          className="w-full rounded-2xl border p-3 bg-slate-50 dark:bg-slate-900"
        />

        {imagePreview && (
          <div className="relative mt-3">
            <img
              src={
                imagePreview
              }
              alt=""
              className="h-28 rounded-xl object-cover"
            />

            <button
            aria-label="image"
              onClick={() =>
                setImageFile(
                  null
                )
              }
              className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white"
            >
              <X size={14} />
            </button>

            <div className="mt-2 text-xs text-emerald-500 font-medium">
              ✓ Image selected successfully
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <label className="cursor-pointer">
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(
                  e.target.files?.[0] ??
                    null
                )
              }
            />

            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
          </label>

          <button
            disabled={
              sending ||
              uploadingImage
            }
            onClick={
              handleSubmit
            }
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center gap-2"
          >
            {sending ||
            uploadingImage ? (
              <Loader2
                size={15}
                className="animate-spin"
              />
            ) : (
              <Send size={15} />
            )}

            {uploadingImage
              ? "Uploading..."
              : sending
              ? "Posting..."
              : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}