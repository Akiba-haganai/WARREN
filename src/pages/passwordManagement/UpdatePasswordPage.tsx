import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.trim().length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const {
        error: updateError,
      } = await supabase.auth.updateUser({
        password: password.trim(),
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(
        "Password updated successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.message ??
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white">
              W
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            Update Password
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Enter your new password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="New password"
            required
            minLength={6}
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}