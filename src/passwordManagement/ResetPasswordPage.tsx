import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            "/update-password",
        }
      );

    setLoading(false);

    if (!error) {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          required
          className="w-full border rounded-xl p-3"
        />

        <button
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white rounded-xl py-3"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {sent && (
          <p className="mt-3 text-green-600">
            Check your email.
          </p>
        )}
      </form>
    </div>
  );
}