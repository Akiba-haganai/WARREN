import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLogin } from "../../features/auth/hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
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
  const loginMutation = useLogin();
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage =
    loginMutation.error instanceof Error ? loginMutation.error.message : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: () => navigate(next),
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      {/* decorative blobs unchanged */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-black text-white">515</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              515
              <span className="sr-only"> — Find the paper. Understand it. Plan the cram.</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
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
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="text-sm text-blue-600">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
                {errorMessage}
              </div>
            )}

            <button
              disabled={loginMutation.isPending}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition"
            >
              {loginMutation.isPending ? (
                "Signing In..."
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <LogIn size={18} />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Join students from campuses around the world
              </p>
            </div>
            <Link to="/register" className="text-blue-600 font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}