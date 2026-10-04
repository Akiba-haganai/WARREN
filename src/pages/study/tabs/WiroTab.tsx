import { useState } from "react";
import { Clock, ChevronDown, Zap, Rocket, Flame } from "lucide-react";

export function WiroTab() {
  const [showUsage, setShowUsage] = useState(false);

  // Mock usage data for now
  const usage = {
    max: 50,
    used: 12,
    remaining: 38,
    resetTime: "00:00 AM"
  };

  return (
    <div className="flex flex-col h-[60vh]">
      {/* Header & Usage Dropdown */}
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
            <Zap size={20} />
            <h2 className="font-bold text-sm tracking-wide">WIRO</h2>
          </div>
          <button 
            onClick={() => setShowUsage(!showUsage)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg"
          >
            <Zap size={12} className={usage.remaining < 10 ? "text-amber-500" : "text-orange-500"} />
            {usage.remaining} energy
            <ChevronDown size={14} className={`transition-transform duration-200 ${showUsage ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Hidden Usage Menu */}
        {showUsage && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Max</p>
                <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">{usage.max}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Remaining</p>
                <p className="font-mono text-sm font-bold text-orange-600 dark:text-orange-500">{usage.remaining}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">Resets At</p>
                <div className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300">
                  <Clock size={12} className="text-slate-400" />
                  <p className="font-mono text-xs font-bold">{usage.resetTime}</p>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${usage.remaining < 10 ? 'bg-amber-500' : 'bg-orange-500'}`}
                style={{ width: `${(usage.used / usage.max) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chat Area (Empty State) */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 rotate-3 hover:rotate-6 transition-transform">
            <Flame size={40} className="drop-shadow-sm" />
          </div>
          
          <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2 tracking-tight">I am Wiro.</h3>
          
          <div className="space-y-3 max-w-[280px]">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Your dashing 515 hero. 🦸🏾‍♂️
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              I don't write your generic essays—I conquer 515's vault. Select any past paper, textbook, or note from the platform and let's crush it together.
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-4 relative">
        <input 
          type="text" 
          placeholder="Summon Wiro..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-orange-500 text-white rounded-xl hover:bg-orange-600 active:scale-95 transition-all shadow-sm">
          <Rocket size={16} className="-mr-0.5 mt-0.5" />
        </button>
      </div>
    </div>
  );
}
