import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../store/themeStore";
import { useAccessibilityStore } from "../../../store/accessibility.store";
import { Type, Sun, Moon, Languages } from "lucide-react";

export function AccessibilityPanel() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { fontSize, setFontSize, highContrast, toggleHighContrast } =
    useAccessibilityStore();
  const darkMode = theme === "dark";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3">
        <h3 className="text-white font-bold text-sm">
          {t("accessibility title") || "Accessibility"}
        </h3>
      </div>

      <div className="p-4 space-y-5">
        {/* Font Size */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Type size={14} />
            {t("accessibility fontSize") || "Font Size"}
          </p>
          <div className="flex gap-2">
            {(["normal", "large", "x-large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  fontSize === size
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            {darkMode ? <Moon size={14} /> : <Sun size={14} />}
            {t("accessibility displayMode") || "Display Mode"}
          </p>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>
              {darkMode
                ? t("accessibility darkMode") || "Dark Mode"
                : t("accessibility lightMode") || "Light Mode"}
            </span>
            <span className="text-[10px] text-slate-400">
              {darkMode ? "ON" : "OFF"}
            </span>
          </button>
        </div>

        {/* High Contrast */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            {t("accessibility highContrast") || "High Contrast"}
          </p>
          <button
            onClick={toggleHighContrast}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              highContrast
                ? "bg-yellow-400 text-black shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span>High Contrast</span>
            <span className="text-[10px]">{highContrast ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Language */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Languages size={14} />
            {t("accessibility language") || "Language"}
          </p>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
            aria-label={t("accessibility selectLanguage") || "Select language"}
          >
            <option value="en">English</option>
            <option value="bem">Bemba</option>
            <option value="nya">Chinyanja</option>
          </select>
        </div>
      </div>
    </div>
  );
}