"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const SESSION_KEY = "fn_disclaimer_accepted";

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-1">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">Înainte de a continua</h2>
          </div>
          <p className="text-sm text-gray-500 ml-9">
            Citește cu atenție — durează 30 de secunde.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3 text-sm text-gray-700">
          {[
            {
              icon: "📄",
              text: "Documentele de pe această platformă sunt <strong>modele precompletate</strong>, nu acte juridice certificate.",
            },
            {
              icon: "⚖️",
              text: "FaraNotar.ro <strong>nu oferă consultanță juridică</strong> și nu este cabinet de avocatură (Legea 51/1995).",
            },
            {
              icon: "✍️",
              text: "Ești <strong>singurul responsabil</strong> pentru corectitudinea datelor introduse și pentru conținutul documentului semnat.",
            },
            {
              icon: "🧠",
              text: "Platforma <strong>nu verifică</strong> capacitatea juridică, identitatea sau discernământul semnatarilor.",
            },
            {
              icon: "🏠",
              text: "Pentru imobile, succesiuni și procuri autentice, <strong>notarul rămâne obligatoriu</strong> prin lege.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 text-base">{item.icon}</span>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          ))}
        </div>

        {/* Checkbox */}
        <div className="px-6 pb-5">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Am citit și am înțeles că FaraNotar.ro oferă modele de documente, nu consultanță
              juridică, și că răspunderea pentru utilizarea acestora îmi aparține în întregime.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between gap-4">
          <Link
            href="/termeni"
            className="text-sm text-blue-600 hover:underline whitespace-nowrap"
          >
            Termeni și Condiții →
          </Link>
          <button
            disabled={!checked}
            onClick={accept}
            className="bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Am înțeles, continuă
          </button>
        </div>

      </div>
    </div>
  );
}
