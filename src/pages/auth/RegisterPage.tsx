import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useRegister } from "../../features/auth/hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

export default function RegisterPage() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/";
  const registerMutation = useRegister();
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage =
    registerMutation.error instanceof Error ? registerMutation.error.message : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) return;
    if (password.length < 6) return;
    registerMutation.mutate(
      { email: email.trim().toLowerCase(), password, username: username.trim() },
      { onSuccess: () => navigate(next) }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-black text-white">515</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Join 515
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Find the paper. Understand it. Plan the cram.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={async () => {
                setGoogleLoading(true);
                const res = await signInWithGoogle(next);
                if (res.error) {
                  setGoogleLoading(false);
                  alert(res.error);
                }
              }}
              disabled={googleLoading}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3.5 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
              <div className="relative flex justify-center"><span className="bg-white/80 dark:bg-slate-900/80 px-2 text-xs text-slate-400">or</span></div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                autoComplete="username"
                required
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            {errorMessage && (
              <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </div>
            )}

            <button
              disabled={registerMutation.isPending}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? (
                "Creating Account..."
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <UserPlus size={18} />
                  Create Account
                </span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-blue-600 dark:text-cyan-400 font-medium hover:underline"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}