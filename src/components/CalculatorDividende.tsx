"use client";

import { useState, useCallback } from "react";

const SALARIU_MINIM = 4050;
const PLAFON_MIN_CASS = 6 * SALARIU_MINIM;   // 24.300 RON/an
const PLAFON_MAX_CASS = 60 * SALARIU_MINIM;  // 243.000 RON/an
const COTA_IMPOZIT = 0.08;
const COTA_CASS = 0.10;

interface Result {
  dividendeBrute: number;
  impozit: number;
  cass: number;
  cassMotiv: string;
  net: number;
  cotaEfectiva: number;
}

function calculeazaDividende(brutAnual: number, areVenitSalariu: boolean): Result {
  const impozit = Math.round(brutAnual * COTA_IMPOZIT);

  let cass = 0;
  let cassMotiv = "";

  if (areVenitSalariu) {
    // Cu salariu: CASS pe dividende nu se mai datorează separat
    cass = 0;
    cassMotiv = "Nu se datorează separat (ești deja asigurat prin salariu)";
  } else if (brutAnual < PLAFON_MIN_CASS) {
    cass = 0;
    cassMotiv = `Nu se datorează (dividende sub plafonul minim de ${PLAFON_MIN_CASS.toLocaleString("ro-RO")} RON/an)`;
  } else if (brutAnual <= PLAFON_MAX_CASS) {
    cass = Math.round(brutAnual * COTA_CASS);
    cassMotiv = `10% × ${brutAnual.toLocaleString("ro-RO")} RON`;
  } else {
    cass = Math.round(PLAFON_MAX_CASS * COTA_CASS);
    cassMotiv = `Plafonat la 10% × ${PLAFON_MAX_CASS.toLocaleString("ro-RO")} RON (60 salarii minime)`;
  }

  const net = brutAnual - impozit - cass;
  const cotaEfectiva = brutAnual > 0 ? Math.round(((impozit + cass) / brutAnual) * 100) : 0;

  return { dividendeBrute: brutAnual, impozit, cass, cassMotiv, net, cotaEfectiva };
}

function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " RON";
}

function PercentBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

export default function CalculatorDividende() {
  const [inputValue, setInputValue] = useState<string>("50000");
  const [brutAnual, setBrutAnual] = useState<number>(50000);
  const [areVenitSalariu, setAreVenitSalariu] = useState<boolean>(false);

  const result = calculeazaDividende(brutAnual, areVenitSalariu);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0 && num <= 5000000) {
      setBrutAnual(num);
    } else if (raw === "") {
      setBrutAnual(0);
    }
  }, []);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setBrutAnual(val);
    setInputValue(String(val));
  }, []);

  const impozitPercent = brutAnual > 0 ? Math.round((result.impozit / brutAnual) * 100) : 0;
  const cassPercent = brutAnual > 0 ? Math.round((result.cass / brutAnual) * 100) : 0;
  const netPercent = brutAnual > 0 ? Math.round((result.net / brutAnual) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto lg:max-w-4xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

      {/* ── LEFT — input ── */}
      <div>
      {/* Input */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4">
        <label htmlFor="dividende-brute" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
          Dividende brute distribuite (anual)
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            id="dividende-brute"
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInput}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-1 bg-transparent outline-none focus:border-blue-600"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 dark:text-slate-500 shrink-0">RON / an</span>
        </div>
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={brutAnual}
          onChange={handleSlider}
          aria-label="Ajustează dividendele brute"
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-1">
          <span>0 RON</span>
          <span className="text-gray-500 dark:text-slate-400 font-medium hidden sm:inline">
            Prag CASS: {PLAFON_MIN_CASS.toLocaleString("ro-RO")} RON/an
          </span>
          <span>500.000 RON</span>
        </div>

        {/* Toggle salariu */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={areVenitSalariu}
              onChange={(e) => setAreVenitSalariu(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-500 shrink-0"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300">
              Am și venituri din <strong>salariu</strong> (sunt deja asigurat pentru CASS prin angajator)
            </span>
          </label>
        </div>
      </div>

      </div>{/* end left */}

      {/* ── RIGHT — results ── */}
      <div className="mt-4 lg:mt-0">
      {/* Result principal */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-4 text-white text-center shadow-md">
        <p className="text-blue-200 text-sm font-medium mb-1">Dividende nete (după taxe)</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight">
          {formatRON(result.net)}
        </p>
        <p className="text-blue-200 text-sm mt-2">
          {netPercent}% din brut · Taxe totale: {formatRON(result.impozit + result.cass)} ({result.cotaEfectiva}%)
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
          Detaliu calcul anual
        </h3>

        {/* Brut */}
        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
          <span className="font-medium text-gray-700 dark:text-slate-300">Dividende brute</span>
          <span className="font-bold text-gray-900 dark:text-white">{formatRON(result.dividendeBrute)}</span>
        </div>

        {/* Impozit 8% */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Impozit dividende </span>
              <span className="text-xs text-gray-400 dark:text-slate-500">(8%)</span>
            </div>
            <span className="text-sm font-semibold text-red-500">
              -{formatRON(result.impozit)}
            </span>
          </div>
          <PercentBar percent={impozitPercent} color="bg-red-300" />
        </div>

        {/* CASS */}
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">CASS </span>
              <span className="text-xs text-gray-400 dark:text-slate-500">(sănătate, 10%)</span>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{result.cassMotiv}</p>
            </div>
            <span className={`text-sm font-semibold shrink-0 ${result.cass > 0 ? "text-orange-500" : "text-green-500"}`}>
              {result.cass > 0 ? `-${formatRON(result.cass)}` : "0 RON"}
            </span>
          </div>
          {result.cass > 0 && <PercentBar percent={cassPercent} color="bg-orange-300" />}
        </div>

        {/* Net */}
        <div className="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-950 rounded-xl px-4 mt-2">
          <span className="font-bold text-gray-800 dark:text-white">Dividende nete</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
            {formatRON(result.net)}
          </span>
        </div>
      </div>

      {/* Comparatie cu/fara CASS */}
      {!areVenitSalariu && brutAnual >= PLAFON_MIN_CASS && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-4">
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
            💡 Dacă ai și un salariu (minim)
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Cu un salariu minim de <strong>4.050 RON/lună</strong>, CASS-ul pe dividende nu s-ar mai datora separat,
            economisind <strong>{formatRON(result.cass)}</strong> anual.
          </p>
        </div>
      )}

      {/* Plafon CASS atins */}
      {!areVenitSalariu && brutAnual > PLAFON_MAX_CASS && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-5 mb-4">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
            ✅ Plafon CASS atins
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            CASS este plafonat la <strong>{formatRON(PLAFON_MAX_CASS * COTA_CASS)}/an</strong> — indiferent cât de mari sunt dividendele.
            Dividendele suplimentare față de 243.000 RON sunt impozitate <strong>doar cu 8%</strong>.
          </p>
        </div>
      )}

      </div>{/* end right */}
      </div>{/* end grid */}

      {/* ── FULL WIDTH — info ── */}
      <div className="mt-4 lg:mt-8">
      {/* Info box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-3 text-sm text-gray-600 dark:text-slate-400">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">
          Cum se impozitează dividendele în România 2026?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Impozit dividende</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              8% din valoarea brută a dividendelor distribuite (reținut la sursă de societate).
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">CASS (sănătate)</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              10%, dacă dividendele depășesc 24.300 RON/an (6 salarii minime). Plafon maxim: 24.300 RON/an.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Prag CASS</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Sub 24.300 RON/an dividende → nu se datorează CASS. Peste → 10% din dividende, max 24.300 RON.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Nu există CAS</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Dividendele nu sunt supuse CAS (contribuția la pensie) — avantaj față de salariu.
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
          <code className="text-blue-600 dark:text-blue-400 font-mono text-xs bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded block">
            Net = Dividende brute − Impozit 8% − CASS 10% (dacă aplicabil)
          </code>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 pt-1">
          * Calcul orientativ 2026. Salariu minim de referință: 4.050 RON. Consultați un contabil pentru situații specifice.
        </p>
      </div>
      </div>{/* end full width */}
    </div>
  );
}
