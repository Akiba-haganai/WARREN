import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useRegister } from "../../features/auth/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

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
      { onSuccess: () => navigate("/") }
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
              <span className="text-3xl font-black text-white">W</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Join Campus
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Create your account to connect with students worldwide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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