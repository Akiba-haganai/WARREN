import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { Search } from "lucide-react";
import {
  searchPosts,
  searchUsers,
} from "../../services/searchService";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setPosts([]);
        setUsers([]);
        return;
      }

      const [postResults, userResults] =
        await Promise.all([
          searchPosts(query),
          searchUsers(query),
        ]);

      setPosts(postResults);
      setUsers(userResults);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <AppShell>
      <div className="p-4">

        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search posts or users..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border"
          />
        </div>

        {users.length > 0 && (
          <>
            <h2 className="font-bold mb-3">
              Users
            </h2>

            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-2"
              >
                <p className="font-semibold">
                  {user.username}
                </p>

                <p className="text-sm opacity-70">
                  {user.role}
                </p>
              </div>
            ))}
          </>
        )}

        {posts.length > 0 && (
          <>
            <h2 className="font-bold mt-6 mb-3">
              Posts
            </h2>

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-2"
              >
                <p>{post.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </AppShell>
  );
}