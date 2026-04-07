"use client";

import { useState, useCallback } from "react";

const SALARIU_MINIM = 4050;
const CHELTUIELI_FORFETARE = 0.20; // 20% deducere forfetară
const COTA_IMPOZIT = 0.10;
const COTA_CASS = 0.10;
const PLAFON_MIN_CASS = 6 * SALARIU_MINIM;   // 24.300 RON/an
const PLAFON_MAX_CASS = 60 * SALARIU_MINIM;  // 243.000 RON/an

interface Result {
  venitBrutAnual: number;
  cheltuieliForfetare: number;
  venitNetImpozabil: number;
  impozit: number;
  cass: number;
  cassMotiv: string;
  venitRamas: number;
  cotaEfectiva: number;
}

function calculeazaChirii(
  venitBrutAnual: number,
  areVenitSalariu: boolean,
  nrProprietati: number
): Result {
  // Deducere forfetară 20%
  const cheltuieliForfetare = Math.round(venitBrutAnual * CHELTUIELI_FORFETARE);
  const venitNetImpozabil = venitBrutAnual - cheltuieliForfetare;

  // Impozit 10% din venitul net impozabil
  const impozit = Math.round(venitNetImpozabil * COTA_IMPOZIT);

  // CASS pe chirii (similar dividende — se cumulează cu alte venituri)
  let cass = 0;
  let cassMotiv = "";

  if (areVenitSalariu) {
    cass = 0;
    cassMotiv = "Nu se datorează separat (ești deja asigurat prin salariu)";
  } else if (venitBrutAnual < PLAFON_MIN_CASS) {
    cass = 0;
    cassMotiv = `Nu se datorează (venit sub plafonul minim de ${PLAFON_MIN_CASS.toLocaleString("ro-RO")} RON/an)`;
  } else if (venitBrutAnual <= PLAFON_MAX_CASS) {
    cass = Math.round(venitBrutAnual * COTA_CASS);
    cassMotiv = `10% × ${venitBrutAnual.toLocaleString("ro-RO")} RON venit brut`;
  } else {
    cass = Math.round(PLAFON_MAX_CASS * COTA_CASS);
    cassMotiv = `Plafonat la 10% × ${PLAFON_MAX_CASS.toLocaleString("ro-RO")} RON (60 salarii minime)`;
  }

  const venitRamas = venitBrutAnual - impozit - cass;
  const cotaEfectiva = venitBrutAnual > 0
    ? Math.round(((impozit + cass) / venitBrutAnual) * 100)
    : 0;

  return {
    venitBrutAnual,
    cheltuieliForfetare,
    venitNetImpozabil,
    impozit,
    cass,
    cassMotiv,
    venitRamas,
    cotaEfectiva,
  };
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

export default function CalculatorChirii() {
  const [chiriaLunara, setChiriaLunara] = useState<number>(2000);
  const [inputValue, setInputValue] = useState<string>("2000");
  const [nrProprietati, setNrProprietati] = useState<number>(1);
  const [areVenitSalariu, setAreVenitSalariu] = useState<boolean>(false);

  const venitBrutAnual = chiriaLunara * 12 * nrProprietati;
  const result = calculeazaChirii(venitBrutAnual, areVenitSalariu, nrProprietati);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0) {
      setChiriaLunara(num);
    } else if (raw === "") {
      setChiriaLunara(0);
    }
  }, []);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setChiriaLunara(val);
    setInputValue(String(val));
  }, []);

  const impozitPercent = venitBrutAnual > 0 ? Math.round((result.impozit / venitBrutAnual) * 100) : 0;
  const cassPercent = venitBrutAnual > 0 ? Math.round((result.cass / venitBrutAnual) * 100) : 0;
  const deducerePercent = 20;

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Input chirie lunară */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4">
        <label htmlFor="chirie-lunara" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
          Chirie lunară (per proprietate)
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            id="chirie-lunara"
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInput}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-1 bg-transparent outline-none focus:border-blue-600"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 dark:text-slate-500 shrink-0">RON / lună</span>
        </div>
        <input
          type="range"
          min={0}
          max={20000}
          step={100}
          value={chiriaLunara}
          onChange={handleSlider}
          aria-label="Ajustează chiria lunară"
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-1">
          <span>0 RON</span>
          <span className="text-gray-500 dark:text-slate-400 font-medium hidden sm:inline">
            Venit anual: {formatRON(venitBrutAnual)}
          </span>
          <span>20.000 RON</span>
        </div>

        {/* Nr proprietăți */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700">
          <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-2">
            Număr de proprietăți închiriate
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setNrProprietati(n)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                  nrProprietati === n
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle salariu */}
        <div className="mt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={areVenitSalariu}
              onChange={(e) => setAreVenitSalariu(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-500 shrink-0"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300">
              Am și venituri din <strong>salariu</strong> (sunt deja asigurat pentru CASS)
            </span>
          </label>
        </div>
      </div>

      {/* Result principal */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-4 text-white text-center shadow-md">
        <p className="text-blue-200 text-sm font-medium mb-1">Venit net din chirii (după taxe)</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight">
          {formatRON(result.venitRamas)}
          <span className="text-xl font-normal text-blue-300 ml-2">/an</span>
        </p>
        <p className="text-blue-200 text-sm mt-2">
          {formatRON(Math.round(result.venitRamas / 12))}/lună · Taxe: {formatRON(result.impozit + result.cass)} ({result.cotaEfectiva}%)
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
          Detaliu calcul anual
        </h3>

        {/* Venit brut */}
        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
          <span className="font-medium text-gray-700 dark:text-slate-300">
            Venit brut ({nrProprietati} × {formatRON(chiriaLunara)} × 12 luni)
          </span>
          <span className="font-bold text-gray-900 dark:text-white">{formatRON(result.venitBrutAnual)}</span>
        </div>

        {/* Deducere forfetară 20% */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Deducere forfetară </span>
              <span className="text-xs text-gray-400 dark:text-slate-500">(cheltuieli, 20%)</span>
            </div>
            <span className="text-sm font-semibold text-green-500">
              -{formatRON(result.cheltuieliForfetare)}
            </span>
          </div>
          <PercentBar percent={deducerePercent} color="bg-green-300" />
        </div>

        {/* Venit net impozabil */}
        <div className="flex justify-between items-center py-1 px-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-slate-400">Venit net impozabil</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{formatRON(result.venitNetImpozabil)}</span>
        </div>

        {/* Impozit 10% */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Impozit venit </span>
              <span className="text-xs text-gray-400 dark:text-slate-500">(10% din {formatRON(result.venitNetImpozabil)})</span>
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
          <span className="font-bold text-gray-800 dark:text-white">Venit net din chirii</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
            {formatRON(result.venitRamas)}
          </span>
        </div>
      </div>

      {/* Obligație ANAF */}
      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-4">
        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
          ⚠️ Obligații declarative ANAF
        </h3>
        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
          <li>• Înregistrați contractul de închiriere la ANAF în termen de <strong>30 de zile</strong> de la semnare.</li>
          <li>• Depuneți <strong>Declarația Unică</strong> până pe <strong>25 mai</strong> a anului următor.</li>
          <li>• Plata impozitului și CASS — la aceeași dată (25 mai).</li>
        </ul>
      </div>

      {/* Info box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-3 text-sm text-gray-600 dark:text-slate-400">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">
          Cum se impozitează veniturile din chirii în România 2026?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Deducere forfetară</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              ANAF permite deducerea automată a 20% din venitul brut drept cheltuieli, fără a prezenta documente.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Impozit 10%</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Se aplică asupra venitului net impozabil (brut minus 20% deducere).
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">CASS 10%</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Se datorează dacă venitul brut din chirii depășește 24.300 RON/an, plafonat la 24.300 RON contribuție maximă.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Declarația Unică</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Veniturile din chirii se declară anual prin Declarația Unică (formular 212) depusă la ANAF.
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
          <code className="text-blue-600 dark:text-blue-400 font-mono text-xs bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded block">
            Net = Brut − Impozit 10% × (Brut × 80%) − CASS 10% (dacă aplicabil)
          </code>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 pt-1">
          * Calcul orientativ 2026. Salariu minim de referință: 4.050 RON. Consultați un contabil pentru situații specifice.
        </p>
      </div>
    </div>
  );
}
