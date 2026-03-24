"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const STORAGE_KEY = "fn_theme_chosen";

export default function ThemePickerModal() {
  const [visible, setVisible] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function choose(theme: "light" | "dark" | "system") {
    setTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">

        {/* Icon */}
        <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Monitor className="w-7 h-7 text-gray-600 dark:text-gray-300" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Cum preferi site-ul?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
          Alegi o dată, îți amintim preferința.
        </p>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => choose("light")}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950 transition-all group"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <Sun className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Luminos</span>
          </button>

          <button
            onClick={() => choose("dark")}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all group"
          >
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Întunecat</span>
          </button>

          <button
            onClick={() => choose("system")}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-all group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Monitor className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sistem</span>
          </button>
        </div>

        <button
          onClick={() => choose("system")}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Sari peste
        </button>
      </div>
    </div>
  );
}
