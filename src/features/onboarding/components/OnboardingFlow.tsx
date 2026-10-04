import { useState } from "react";
import { GraduationCap, MapPin, BookOpen, ChevronRight, Check } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { supabase } from "../../../lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    university: "",
    course: "",
    year_of_study: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      // 1. Update academic profile
      const { error: acError } = await (supabase.from as any)("student_academic_profile")
        .upsert({
          user_id: user.id,
          university: formData.university,
          course: formData.course,
          year_of_study: formData.year_of_study,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        });

      if (acError) throw acError;

      // 2. Also update profiles table year_of_study for backwards compatibility
      await supabase
        .from("profiles")
        .update({ year_of_study: formData.year_of_study })
        .eq("id", user.id);

      // Invalidate queries to refresh route guard
      await queryClient.invalidateQueries({ queryKey: ["academic_profile", user.id] });
      await queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      
      onComplete();
    } catch (err) {
      console.error("Failed to save onboarding data", err);
      // Fallback completion so user isn't stuck forever if there's an error
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full max-w-md">
          {/* Progress bar */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-200 dark:bg-slate-800"
                }`} 
              />
            ))}
          </div>

          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <MapPin size={32} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-3">Where do you study?</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Connect with your campus community and find locally relevant content.
                </p>
                
                <input
                  type="text"
                  placeholder="e.g. University of Zambia"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  autoFocus
                />
                
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Popular Options</p>
                  <div className="flex flex-wrap gap-2">
                    {["UNZA", "CBU", "Mulungushi", "ZCAS", "Evelyn Hone", "Cavendish", "UNILUS"].map(uni => (
                      <button
                        key={uni}
                        onClick={() => setFormData({ ...formData, university: uni })}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          formData.university === uni 
                            ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600"
                        }`}
                      >
                        {uni}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <BookOpen size={32} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-3">What are you studying?</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  We'll tailor your feed and study materials to your academic track.
                </p>
                
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  autoFocus
                />
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
                  <GraduationCap size={32} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-3">What stage are you at?</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Help us connect you with peers at the same stage of their journey.
                </p>
                
                <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[40vh] pb-4">
                  {[
                    { v: 1, l: "Year 1" }, { v: 2, l: "Year 2" }, { v: 3, l: "Year 3" },
                    { v: 4, l: "Year 4" }, { v: 5, l: "Year 5" }, { v: 6, l: "Year 6" },
                    { v: 7, l: "Master's" }, { v: 8, l: "PhD" }, { v: 9, l: "Alumni" },
                    { v: 10, l: "Faculty" }
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setFormData({ ...formData, year_of_study: opt.v })}
                      className={`p-3 rounded-xl border text-center font-medium text-sm transition ${
                        formData.year_of_study === opt.v
                          ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300 ring-1 ring-blue-500"
                          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-700"
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                Back
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                variant="primary" 
                className="w-full flex items-center justify-center"
                onClick={handleNext}
                disabled={step === 1 && !formData.university.trim() || step === 2 && !formData.course.trim()}
              >
                Continue
                <ChevronRight size={18} className="ml-1" />
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="w-full flex items-center justify-center"
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Complete Setup"}
                {!isSubmitting && <Check size={18} className="ml-1" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
