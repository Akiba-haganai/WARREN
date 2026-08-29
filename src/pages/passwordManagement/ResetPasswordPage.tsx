import { useState } from "react";
import { Link } from "react-router-dom";
import { requestReset } from "../../features/auth/services/auth.service";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await requestReset(email);
      if (res.success) {
        setSent(true);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit reset request.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50 text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold mb-2">Request Queued!</h1>
          <p className="text-sm opacity-70">
            Your password reset request for <span className="font-semibold">{email}</span> has been queued.
          </p>
          <p className="text-sm opacity-70 mt-2">
            An admin will approve it shortly, and you will receive an email with the reset link.
          </p>
          <Link
            to="/login"
            className="inline-block mt-6 text-blue-600 font-medium hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white">W</span>
          </div>
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm opacity-70">
            Enter your email and we'll send your request to an admin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Request Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}