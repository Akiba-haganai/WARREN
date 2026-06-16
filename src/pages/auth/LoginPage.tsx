import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } =
      await login(
        email.trim(),
        password
      );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      
      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-black text-white">
                W
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Warren
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Connect with students, share ideas and stay updated with campus life.
            </p>
</div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
w-full
rounded-2xl
border
border-slate-300
dark:border-slate-700
bg-white/70
dark:bg-slate-950/70
px-4
py-4
outline-none
transition
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/20
"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
w-full
rounded-2xl
border
border-slate-300
dark:border-slate-700
bg-white/70
dark:bg-slate-950/70
px-4
py-4
outline-none
transition
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/20
"
                  placeholder="Password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                <div className="text-right mt-2">
  <Link
    to="/reset-password"
    className="text-sm text-blue-600"
  >
    Forgot Password?
  </Link>
</div>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="
w-full
rounded-2xl
bg-gradient-to-r
from-blue-600
to-cyan-500
text-white
py-4
font-semibold
shadow-lg
active:scale-[0.98]
transition
"
              >
              {loading ? (
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
    Join students from
    campuses around the world
  </p>
</div>
            <Link
              to="/register"
              className="text-blue-600 font-medium"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}