import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Shield, ArrowLeft, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: string[];
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "quiz" | "result">("email");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resultData, setResultData] = useState<{ queued: boolean; score: number; message: string } | null>(null);

  // Step 1: Request Password Recovery Challenge
  async function handleStartQuiz(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.rpc("get_password_recovery_challenge", {
        p_email: email.trim().toLowerCase(),
      });

      if (error) throw error;

      const payload = data as any;
      if (payload && payload.questions && Array.isArray(payload.questions)) {
        setQuestions(payload.questions);
        setStep("quiz");
      } else {
        throw new Error("Failed to load security questions. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch recovery challenge.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Submit Quiz Answers for Verification
  async function handleSubmitQuiz(e: React.FormEvent) {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      setErrorMsg("Please answer all security questions before proceeding.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.rpc("verify_password_recovery_challenge", {
        p_email: email.trim().toLowerCase(),
        p_answers: answers,
      });

      if (error) throw error;

      const resObj = data as any;
      setResultData({
        queued: !!resObj?.queued,
        score: resObj?.score || 0,
        message: resObj?.message || "Verification completed.",
      });
      setStep("result");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to verify answers.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/login"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Password Recovery
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero-Spam Proof-of-Ownership Verification
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === "email" && (
          <form onSubmit={handleStartQuiz} className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
              <Shield size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                To prevent unauthorized email spam, complete a quick 3-question identity quiz based on your account activity before a reset link is sent.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Account Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@cbu.ac.zm"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all duration-150"
            >
              {loading ? "Verifying Account..." : "Continue to Identity Quiz"}
            </button>
          </form>
        )}

        {/* STEP 2: Identity Quiz */}
        {step === "quiz" && (
          <form onSubmit={handleSubmitQuiz} className="space-y-6">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">{email}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">3 Questions</span>
            </div>

            <div className="space-y-5">
              {questions.map((q, qIdx) => (
                <div key={q.id || qIdx} className="space-y-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-blue-600" />
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold"
                              : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all duration-150"
            >
              {loading ? "Evaluating Answers..." : "Submit Identity Answers"}
            </button>
          </form>
        )}

        {/* STEP 3: Verification Result */}
        {step === "result" && resultData && (
          <div className="text-center space-y-5 py-4">
            {resultData.queued ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Identity Verified! (Score: {resultData.score}/3)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {resultData.message}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1">
                  <p className="font-bold">Next Steps:</p>
                  <p>1. An admin will review your verified score in the control panel.</p>
                  <p>2. A password reset link will be sent to <strong>{email}</strong> upon 1-click approval.</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle size={36} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Verification Failed
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {resultData.message}
                  </p>
                </div>
              </>
            )}

            <Link
              to="/login"
              className="inline-block w-full py-3.5 px-4 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Return to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
