import { create } from "zustand";

export type Post = {
  id: string;
  user: string;
  role: "Student" | "Admin" | "Moderator";
  time: string;
  content: string;
  votes: number;
  comments: number;
};

interface PostStore {
  posts: Post[];

  addPost: (content: string) => void;

  upvote: (id: string) => void;
  downvote: (id: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [
    {
      id: "1",
      user: "Campus Admin",
      role: "Admin",
      time: "2m",
      content: "Welcome to Warren 🚀",
      votes: 12,
      comments: 4,
    },
  ],

  addPost: (content) =>
    set((state) => ({
      posts: [
        {
          id: Date.now().toString(),
          user: "You",
          role: "Student",
          time: "now",
          content,
          votes: 0,
          comments: 0,
        },
        ...state.posts,
      ],
    })),

  upvote: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, votes: p.votes + 1 }
          : p
      ),
    })),

  downvote: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, votes: p.votes - 1 }
          : p
      ),
    })),
}));