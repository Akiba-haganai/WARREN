import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, BookOpen, Users, Map, GraduationCap } from "lucide-react";

const SLIDES = [
  {
    id: "intro",
    icon: GraduationCap,
    title: "Welcome to Wave",
    subtitle: "Connect. Learn. Interact.",
    description: "Your digital campus hub. Connect, study, and thrive.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    id: "study",
    icon: BookOpen,
    title: "Study Smarter",
    subtitle: "",
    description: "Access past papers, shared notes, and collaborate on coursework with peers.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
  {
    id: "community",
    icon: Users,
    title: "Connect & Ask",
    subtitle: "",
    description: "Join student communities, join live rooms, and ask seniors for advice.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
  {
    id: "campus",
    icon: Map,
    title: "Navigate Campus Life",
    subtitle: "",
    description: "Discover local events and find your way with the interactive campus map.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
];

export function OnboardingCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("has-seen-onboarding");
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("has-seen-onboarding", "true");
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> Go Next
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> Go Prev
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (!isVisible) return null;

  const currentSlide = SLIDES[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[200] flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden select-none"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Skip Button */}
      <div className="relative z-10 flex justify-end p-6">
        <button
          onClick={handleComplete}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div key={currentSlide.id} className="flex flex-col items-center max-w-sm w-full animate-in slide-in-from-right-8 fade-in duration-500">
          
          <div className={`flex items-center justify-center w-24 h-24 mb-8 rounded-3xl ${currentSlide.bg} ${currentSlide.color} shadow-inner`}>
            <Icon size={40} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            {currentSlide.title}
          </h1>
          {currentSlide.subtitle && (
            <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4 tracking-wide uppercase">
              {currentSlide.subtitle}
            </p>
          )}
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div className="relative z-10 p-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] flex flex-col items-center">
        {/* Dots */}
        <div className="flex items-center gap-2 mb-8">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-blue-600 dark:bg-blue-500"
                  : "w-2 bg-slate-200 dark:bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between w-full max-w-sm gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all ${
              currentIndex === 0
                ? "opacity-0 invisible"
                : "opacity-100 visible hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
          >
            {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
            {currentIndex !== SLIDES.length - 1 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
