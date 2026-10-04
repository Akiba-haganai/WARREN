import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { Search, FileText, Users, MessageSquare, X, ChevronRight } from "lucide-react";
import {
  searchPosts,
  searchUsers,
  searchMaterials,
} from "../../services/searchService";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [materials, setMaterials] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMaterials([]);
      setPosts([]);
      setUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const [matResults, postResults, userResults] = await Promise.all([
          searchMaterials(query),
          searchPosts(query),
          searchUsers(query),
        ]);
        setMaterials(matResults);
        setPosts(postResults);
        setUsers(userResults);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const hasResults = materials.length > 0 || users.length > 0 || posts.length > 0;

  return (
    <AppShell>
      <div className="p-4 max-w-lg mx-auto pb-24">
        {/* Search Input */}
        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, courses, users, or posts…"
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shadow-sm"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Empty Search Prompt */}
        {!query && (
          <div className="text-center py-16 text-slate-400">
            <Search size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-sm text-slate-600 dark:text-slate-300">Quick search</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Find exam past papers, test solutions, course codes, classmates, and discussions.
            </p>
          </div>
        )}

        {/* Searching indicator */}
        {isSearching && query && (
          <div className="text-center py-6 text-xs text-slate-400">
            Searching…
          </div>
        )}

        {/* No results */}
        {!isSearching && query && !hasResults && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm font-semibold">No matches for &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1">Try a course code (e.g. MAT1100), topic, or student name.</p>
          </div>
        )}

        {/* 1. Study Materials */}
        {materials.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-1.5 mb-2.5 px-1">
              <FileText size={15} className="text-blue-600 dark:text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Past Papers & Notes ({materials.length})
              </h2>
            </div>
            <div className="space-y-2">
              {materials.map((m) => (
                <Link
                  key={m.id}
                  to={`/papers/${m.id}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-blue-400 dark:hover:border-blue-700 transition active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0 text-base">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{m.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {[m.course_code ?? m.subject, m.academic_year, m.paper_type].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 2. Users */}
        {users.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-1.5 mb-2.5 px-1">
              <Users size={15} className="text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Students & Lecturers ({users.length})
              </h2>
            </div>
            <div className="space-y-2">
              {users.map((u) => (
                <Link
                  key={u.id}
                  to={`/profile/${u.id}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-emerald-400 dark:hover:border-emerald-700 transition active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                    {u.avatar_url ? (
                      <img src={u.avatar_url} alt={u.username ?? ""} className="w-full h-full object-cover" />
                    ) : (
                      u.username?.[0]?.toUpperCase() ?? "U"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{u.username ?? "Anonymous"}</p>
                    <p className="text-[11px] text-slate-500 capitalize">{u.role ?? "Student"}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. Community Posts */}
        {posts.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-1.5 mb-2.5 px-1">
              <MessageSquare size={15} className="text-purple-600 dark:text-purple-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Discussions ({posts.length})
              </h2>
            </div>
            <div className="space-y-2">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to={`/?post=${p.id}`}
                  className="block p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-purple-400 dark:hover:border-purple-700 transition active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {p.profiles?.username ?? "Student"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
                    {p.content}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}