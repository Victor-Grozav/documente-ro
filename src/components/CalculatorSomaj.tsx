"use client";

import { useState } from "react";

// Legea 76/2002 — indemnizație de șomaj România 2025
// ISR (Indicatorul Social de Referință) = 500 RON (valoare legală nemodificată)
// Component fix = 75% × ISR = 375 RON
// Component variabilă = procent din media salariului brut din ultimele 12 luni

const ISR = 500; // RON — Legea 76/2002 art. 33
const COMPONENT_FIX = ISR * 0.75; // 375 RON

// Procent component variabilă în funcție de stagiu total (art. 39 alin. 2)
const TRANSE_PROCENT = [
  { minAni: 1,  maxAni: 5,        procent: 0.03, label: "1–5 ani"    },
  { minAni: 5,  maxAni: 10,       procent: 0.05, label: "5–10 ani"   },
  { minAni: 10, maxAni: 15,       procent: 0.07, label: "10–15 ani"  },
  { minAni: 15, maxAni: 20,       procent: 0.10, label: "15–20 ani"  },
  { minAni: 20, maxAni: 25,       procent: 0.15, label: "20–25 ani"  },
  { minAni: 25, maxAni: Infinity, procent: 0.20, label: "25+ ani"    },
];

// Durata acordării în funcție de stagiu (art. 39 alin. 1)
function getDurataLuni(stagiu: number): number {
  if (stagiu < 5)  return 6;
  if (stagiu < 10) return 9;
  return 12;
}

function getTransa(stagiu: number) {
  return TRANSE_PROCENT.find((t) => stagiu >= t.minAni && stagiu < t.maxAni)
    ?? TRANSE_PROCENT[TRANSE_PROCENT.length - 1];
}

interface Rezultat {
  eligibil: boolean;
  componentFix: number;
  componentVariabila: number;
  brutLunar: number;
  cass: number;
  impozit: number;
  netLunar: number;
  durataLuni: number;
  netTotal: number;
  procent: number;
  transa: typeof TRANSE_PROCENT[0];
}

function calculeaza(salariuBrut: number, stagiu: number): Rezultat {
  if (stagiu < 1) {
    const dummy = TRANSE_PROCENT[0];
    return {
      eligibil: false, componentFix: 0, componentVariabila: 0, brutLunar: 0,
      cass: 0, impozit: 0, netLunar: 0, durataLuni: 0, netTotal: 0,
      procent: 0, transa: dummy,
    };
  }

  const transa = getTransa(stagiu);
  const componentFix = COMPONENT_FIX;
  const componentVariabila = Math.round(salariuBrut * transa.procent);
  const brutLunar = componentFix + componentVariabila;

  // Deduceri: CASS 10% + impozit venit 10% din (brut - CASS)
  // CAS nu se reține din indemnizația de șomaj
  const cass    = Math.round(brutLunar * 0.10);
  const impozit = Math.round((brutLunar - cass) * 0.10);
  const netLunar = brutLunar - cass - impozit;

  const durataLuni = getDurataLuni(stagiu);
  const netTotal   = netLunar * durataLuni;

  return { eligibil: true, componentFix, componentVariabila, brutLunar, cass, impozit, netLunar, durataLuni, netTotal, procent: transa.procent, transa };
}

function fmt(n: number) {
  return new Intl.NumberFormat("ro-RO").format(Math.round(n)) + " RON";
}

export default function CalculatorSomaj() {
  const [salariu, setSalariu]       = useState(5000);
  const [salariuInput, setSalariuInput] = useState("5000");
  const [stagiu, setStagiu]         = useState(5);
  const [stagiuInput, setStagiuInput] = useState("5");

  const r = calculeaza(salariu, stagiu);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* Salariu brut mediu */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Salariu brut mediu lunar (ultimele 12 luni)
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            value={salariuInput}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setSalariuInput(raw);
              const n = parseInt(raw, 10);
              if (!isNaN(n) && n >= 0 && n <= 200000) setSalariu(n);
            }}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 border-b-2 border-teal-500 pb-1 bg-transparent outline-none"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 shrink-0">RON</span>
        </div>
        <input
          type="range"
          min={1000}
          max={30000}
          step={100}
          value={Math.min(salariu, 30000)}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setSalariu(v);
            setSalariuInput(String(v));
          }}
          className="w-full accent-teal-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1.000 RON</span>
          <span className="text-gray-500 font-medium hidden sm:inline">
            Salariu minim: 4.050 RON
          </span>
          <span>30.000 RON</span>
        </div>
      </div>

      {/* Stagiu de cotizare */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Stagiu total de cotizare
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            value={stagiuInput}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setStagiuInput(raw);
              const n = parseInt(raw, 10);
              if (!isNaN(n) && n >= 0 && n <= 50) setStagiu(n);
            }}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 border-b-2 border-teal-500 pb-1 bg-transparent outline-none"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 shrink-0">
            {stagiu === 1 ? "an" : "ani"}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={40}
          step={1}
          value={stagiu}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setStagiu(v);
            setStagiuInput(String(v));
          }}
          className="w-full accent-teal-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0 ani</span>
          <span>40 ani</span>
        </div>
        {stagiu < 1 && (
          <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mt-3">
            Stagiu insuficient. Sunt necesare minimum 12 luni de cotizare în ultimele 24 de luni pentru a beneficia de indemnizație de șomaj.
          </p>
        )}
        {stagiu >= 1 && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="bg-teal-100 text-teal-700 font-semibold px-2 py-1 rounded-lg">
              {r.transa.label}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">
              Component variabilă: {Math.round(r.procent * 100)}% din salariu · Durată: {r.durataLuni} luni
            </span>
          </div>
        )}
      </div>

      {/* Rezultat principal */}
      {r.eligibil ? (
        <div className="bg-teal-600 rounded-2xl p-6 text-white text-center shadow-md">
          <p className="text-teal-200 text-sm font-medium mb-1">
            Indemnizație lunară netă estimată
          </p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight">
            {fmt(r.netLunar)}
          </p>
          <p className="text-teal-200 text-sm mt-2">
            {fmt(r.brutLunar)} brut · timp de {r.durataLuni} luni
          </p>
          <p className="text-teal-100 text-base font-semibold mt-3">
            Total net: {fmt(r.netTotal)}
          </p>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm font-medium mb-1">Neeligibil</p>
          <p className="text-2xl font-bold text-gray-500">0 RON</p>
          <p className="text-gray-400 text-sm mt-2">
            Introduceți un stagiu de cotizare de minimum 1 an.
          </p>
        </div>
      )}

      {/* Detaliu calcul */}
      {r.eligibil && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Detaliu calcul
          </h3>

          {/* Componentele brute */}
          <div className="space-y-2 pb-3 border-b border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Component fix (75% × ISR 500 RON)
              </span>
              <span className="font-medium">{fmt(r.componentFix)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Component variabilă ({Math.round(r.procent * 100)}% × {fmt(salariu)})
              </span>
              <span className="font-medium">{fmt(r.componentVariabila)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-2">
              <span className="text-gray-800">Total brut lunar</span>
              <span className="text-gray-800">{fmt(r.brutLunar)}</span>
            </div>
          </div>

          {/* Deduceri */}
          <div className="space-y-2 pb-3 border-b border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">CASS — 10%</span>
              <span className="font-medium text-red-500">−{fmt(r.cass)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impozit venit — 10% din (brut − CASS)</span>
              <span className="font-medium text-red-500">−{fmt(r.impozit)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>CAS (pensie)</span>
              <span>scutit</span>
            </div>
          </div>

          {/* Total lunar și pe perioadă */}
          <div className="flex justify-between items-center py-3 bg-teal-50 rounded-xl px-4">
            <span className="font-bold text-gray-800">Net lunar</span>
            <span className="font-bold text-teal-700 text-lg">{fmt(r.netLunar)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Durată acordare</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{r.durataLuni} luni</p>
              <p className="text-xs text-gray-400 mt-0.5">stagiu {r.transa.label}</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Total net pe toată perioada</p>
              <p className="text-xl font-bold text-teal-700 mt-1">{fmt(r.netTotal)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{r.durataLuni} × {fmt(r.netLunar)}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 pt-1">
            * Calcul orientativ 2025 per Legea 76/2002. ISR = 500 RON. Deduceri: CASS 10% + impozit venit 10%.
            CAS nu se reține din indemnizația de șomaj. Valoarea reală poate diferi în funcție de venitul lunar
            exact din fiecare din ultimele 12 luni.
          </p>
        </div>
      )}

      {/* Tabel stagiu → procent → durată */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Stagiu de cotizare → indemnizație și durată
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-gray-500 font-medium py-2 pr-4">Stagiu</th>
                <th className="text-right text-gray-500 font-medium py-2 pr-4">Procent variabilă</th>
                <th className="text-right text-gray-500 font-medium py-2 pr-4">Durată</th>
                <th className="text-right text-gray-500 font-medium py-2">Net lunar (ex. 5.000 RON)</th>
              </tr>
            </thead>
            <tbody>
              {TRANSE_PROCENT.map((t, i) => {
                const exemplu = calculeaza(5000, t.minAni);
                const activa = r.eligibil && r.transa.minAni === t.minAni;
                return (
                  <tr key={i} className={`border-b border-gray-100 ${activa ? "bg-teal-50" : ""}`}>
                    <td className={`py-2 pr-4 ${activa ? "font-semibold text-teal-800" : "text-gray-700"}`}>
                      {t.label}
                    </td>
                    <td className={`py-2 pr-4 text-right ${activa ? "font-bold text-teal-700" : "text-gray-700"}`}>
                      {Math.round(t.procent * 100)}%
                    </td>
                    <td className={`py-2 pr-4 text-right ${activa ? "font-semibold text-teal-700" : "text-gray-500"}`}>
                      {getDurataLuni(t.minAni)} luni
                    </td>
                    <td className={`py-2 text-right ${activa ? "font-semibold text-teal-700" : "text-gray-500"}`}>
                      {fmt(exemplu.netLunar)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Exemplul folosește salariu brut mediu 5.000 RON. Componenta fixă (375 RON) este inclusă în toate rândurile.
        </p>
      </div>

      {/* Info box */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 text-sm text-gray-600">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Ce trebuie să știi despre indemnizația de șomaj
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-teal-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Condiție de eligibilitate</p>
            <p className="text-xs text-gray-500">
              Minimum 12 luni de cotizare în ultimele 24 de luni. Aplicați în cel mult 60 de zile de la data pierderii locului de muncă.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Unde se depune dosarul</p>
            <p className="text-xs text-gray-500">
              La AJOFM (Agenția Județeană pentru Ocuparea Forței de Muncă) din județul în care aveți domiciliul.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Obligații în perioada de șomaj</p>
            <p className="text-xs text-gray-500">
              Prezentare lunară la AJOFM, disponibilitate pentru oferte de muncă, participare la programe de formare dacă sunt solicitate.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Suspendare / Încetare</p>
            <p className="text-xs text-gray-500">
              Indemnizația încetează la reangajare, la expirarea duratei, la refuzul nejustificat al unei oferte adecvate sau la împlinirea vârstei de pensionare.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
