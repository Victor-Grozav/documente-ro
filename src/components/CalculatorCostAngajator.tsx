"use client";

import { useState, useCallback } from "react";

const CAS = 0.25;
const CASS = 0.10;
const IMPOZIT = 0.10;
const CAM = 0.0225;

// Tichete de masă 2026 — valoare maximă deductibilă per zi lucrătoare
const VALOARE_TICHET_MAX = 40; // RON
const ZILE_LUCRATOARE_LUNA = 21;

interface Beneficii {
  tichete: boolean;
  valoareTichet: number;
  telefon: boolean;
  valoareTelefon: number;
  masina: boolean;
  valoareMasinaLuna: number;
  asigurarePrivata: boolean;
  valoareAsigurare: number;
}

interface Result {
  brutLunar: number;
  netLunar: number;
  // Angajat
  casAngajat: number;
  cassAngajat: number;
  impozitAngajat: number;
  // Angajator
  camAngajator: number;
  // Beneficii
  costuriBeneficii: number;
  // Totale
  costTotalLunar: number;
  costTotalAnual: number;
  // Beneficii nete angajat
  valoareNetaBeneficii: number;
  remuneratieEfectiva: number;
}

function calculeaza(brut: number, beneficii: Beneficii): Result {
  const casAngajat = Math.round(brut * CAS);
  const cassAngajat = Math.round(brut * CASS);
  const venitImpozabil = brut - casAngajat - cassAngajat;
  const impozitAngajat = Math.round(venitImpozabil * IMPOZIT);
  const netLunar = brut - casAngajat - cassAngajat - impozitAngajat;
  const camAngajator = Math.round(brut * CAM);

  // Beneficii — cost angajator lunar
  let costuriBeneficii = 0;
  let valoareNetaBeneficii = 0;

  if (beneficii.tichete) {
    const valTichet = Math.min(beneficii.valoareTichet, VALOARE_TICHET_MAX);
    const costTichete = valTichet * ZILE_LUCRATOARE_LUNA;
    costuriBeneficii += costTichete;
    // Tichetele sunt neimpozabile — angajatul primește valoarea integrală
    valoareNetaBeneficii += costTichete;
  }

  if (beneficii.telefon) {
    costuriBeneficii += beneficii.valoareTelefon;
    // Telefonul de serviciu — neimpozabil dacă e în scop profesional
    valoareNetaBeneficii += beneficii.valoareTelefon;
  }

  if (beneficii.masina) {
    costuriBeneficii += beneficii.valoareMasinaLuna;
    // Mașina de serviciu folosită și personal — impozitată (avantaj în natură)
    // Simplificat: angajatul primește ~70% din valoare (după impozitare avantaj natură)
    valoareNetaBeneficii += Math.round(beneficii.valoareMasinaLuna * 0.70);
  }

  if (beneficii.asigurarePrivata) {
    costuriBeneficii += beneficii.valoareAsigurare;
    // Asigurare medicală privată — neimpozabilă până la 400 EUR/an
    valoareNetaBeneficii += beneficii.valoareAsigurare;
  }

  const costTotalLunar = brut + camAngajator + costuriBeneficii;
  const remuneratieEfectiva = netLunar + valoareNetaBeneficii;

  return {
    brutLunar: brut,
    netLunar,
    casAngajat,
    cassAngajat,
    impozitAngajat,
    camAngajator,
    costuriBeneficii,
    costTotalLunar,
    costTotalAnual: costTotalLunar * 12,
    valoareNetaBeneficii,
    remuneratieEfectiva,
  };
}

function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " RON";
}

export default function CalculatorCostAngajator() {
  const [brut, setBrut] = useState<number>(7000);
  const [inputValue, setInputValue] = useState<string>("7000");
  const [beneficii, setBeneficii] = useState<Beneficii>({
    tichete: false,
    valoareTichet: 40,
    telefon: false,
    valoareTelefon: 100,
    masina: false,
    valoareMasinaLuna: 500,
    asigurarePrivata: false,
    valoareAsigurare: 200,
  });

  const result = calculeaza(brut, beneficii);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0 && num <= 100000) {
      setBrut(num);
    } else if (raw === "") {
      setBrut(0);
    }
  }, []);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setBrut(val);
    setInputValue(String(val));
  }, []);

  const toggleBeneficiu = (key: keyof Beneficii) => {
    setBeneficii((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateBeneficiu = (key: keyof Beneficii, value: number) => {
    setBeneficii((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto lg:max-w-4xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

      {/* ── LEFT — inputs ── */}
      <div>
      {/* Input salariu brut */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4">
        <label htmlFor="salariu-brut-angajator" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
          Salariu brut lunar
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            id="salariu-brut-angajator"
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInput}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-1 bg-transparent outline-none focus:border-blue-600"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 dark:text-slate-500 shrink-0">RON</span>
        </div>
        <input
          type="range"
          min={4050}
          max={50000}
          step={100}
          value={brut}
          onChange={handleSlider}
          aria-label="Ajustează salariul brut"
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-1">
          <span>4.050 RON</span>
          <span className="text-gray-500 dark:text-slate-400 font-medium hidden sm:inline">Salariu minim: 4.050 RON</span>
          <span>50.000 RON</span>
        </div>
      </div>

      {/* Beneficii */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-4">
          Beneficii extrasalariale
        </h3>
        <div className="space-y-4">

          {/* Tichete de masă */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={beneficii.tichete}
                onChange={() => toggleBeneficiu("tichete")}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Tichete de masă</span>
              <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">max {VALOARE_TICHET_MAX} RON/zi</span>
            </label>
            {beneficii.tichete && (
              <div className="mt-2 ml-7 flex items-center gap-3">
                <input
                  type="range"
                  min={10}
                  max={VALOARE_TICHET_MAX}
                  step={1}
                  value={beneficii.valoareTichet}
                  onChange={(e) => updateBeneficiu("valoareTichet", parseInt(e.target.value))}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-20 text-right">
                  {beneficii.valoareTichet} RON/zi
                </span>
              </div>
            )}
            {beneficii.tichete && (
              <p className="text-xs text-gray-400 dark:text-slate-500 ml-7 mt-1">
                Cost lunar: {formatRON(Math.min(beneficii.valoareTichet, VALOARE_TICHET_MAX) * ZILE_LUCRATOARE_LUNA)} · Neimpozabil pentru angajat
              </p>
            )}
          </div>

          {/* Telefon de serviciu */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={beneficii.telefon}
                onChange={() => toggleBeneficiu("telefon")}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Telefon / abonament de serviciu</span>
            </label>
            {beneficii.telefon && (
              <div className="mt-2 ml-7 flex items-center gap-3">
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={beneficii.valoareTelefon}
                  onChange={(e) => updateBeneficiu("valoareTelefon", parseInt(e.target.value))}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-20 text-right">
                  {beneficii.valoareTelefon} RON/lună
                </span>
              </div>
            )}
          </div>

          {/* Mașină de serviciu */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={beneficii.masina}
                onChange={() => toggleBeneficiu("masina")}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Mașină de serviciu</span>
              <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">(cost leasing/întreținere)</span>
            </label>
            {beneficii.masina && (
              <div className="mt-2 ml-7 flex items-center gap-3">
                <input
                  type="range"
                  min={200}
                  max={3000}
                  step={50}
                  value={beneficii.valoareMasinaLuna}
                  onChange={(e) => updateBeneficiu("valoareMasinaLuna", parseInt(e.target.value))}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-20 text-right">
                  {beneficii.valoareMasinaLuna} RON/lună
                </span>
              </div>
            )}
          </div>

          {/* Asigurare medicală privată */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={beneficii.asigurarePrivata}
                onChange={() => toggleBeneficiu("asigurarePrivata")}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Asigurare medicală privată</span>
              <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">neimpozabilă ≤400 EUR/an</span>
            </label>
            {beneficii.asigurarePrivata && (
              <div className="mt-2 ml-7 flex items-center gap-3">
                <input
                  type="range"
                  min={50}
                  max={400}
                  step={10}
                  value={beneficii.valoareAsigurare}
                  onChange={(e) => updateBeneficiu("valoareAsigurare", parseInt(e.target.value))}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-20 text-right">
                  {beneficii.valoareAsigurare} RON/lună
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>{/* end left */}

      {/* ── RIGHT — results ── */}
      <div className="mt-4 lg:mt-0">
      {/* Result principal */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-4 text-white text-center shadow-md">
        <p className="text-blue-200 text-sm font-medium mb-1">Cost total angajator / lună</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight">
          {formatRON(result.costTotalLunar)}
        </p>
        <p className="text-blue-200 text-sm mt-2">
          {formatRON(result.costTotalAnual)}/an · Angajatul primește net: {formatRON(result.remuneratieEfectiva)}/lună
        </p>
      </div>

      {/* Breakdown cost angajator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
          Structura costului lunar
        </h3>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
          <span className="text-sm text-gray-700 dark:text-slate-300">Salariu brut</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatRON(result.brutLunar)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
          <div>
            <span className="text-sm text-gray-700 dark:text-slate-300">CAM angajator </span>
            <span className="text-xs text-gray-400 dark:text-slate-500">(2.25%)</span>
          </div>
          <span className="text-sm font-semibold text-red-500">+{formatRON(result.camAngajator)}</span>
        </div>
        {result.costuriBeneficii > 0 && (
          <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
            <span className="text-sm text-gray-700 dark:text-slate-300">Beneficii extrasalariale</span>
            <span className="text-sm font-semibold text-purple-500">+{formatRON(result.costuriBeneficii)}</span>
          </div>
        )}
        <div className="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-950 rounded-xl px-4">
          <span className="font-bold text-gray-800 dark:text-white">Cost total angajator</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{formatRON(result.costTotalLunar)}</span>
        </div>
      </div>

      {/* Ce primește angajatul */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
          Ce primește angajatul
        </h3>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
          <span className="text-sm text-gray-600 dark:text-slate-400">Salariu brut</span>
          <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{formatRON(result.brutLunar)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
          <span className="text-sm text-gray-600 dark:text-slate-400">CAS (25%) + CASS (10%) + Impozit (10%)</span>
          <span className="text-sm font-semibold text-red-500">
            -{formatRON(result.casAngajat + result.cassAngajat + result.impozitAngajat)}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Salariu net în mână</span>
          <span className="font-semibold text-gray-900 dark:text-white">{formatRON(result.netLunar)}</span>
        </div>
        {result.valoareNetaBeneficii > 0 && (
          <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
            <span className="text-sm text-gray-600 dark:text-slate-400">Valoare netă beneficii</span>
            <span className="text-sm font-semibold text-purple-500">+{formatRON(result.valoareNetaBeneficii)}</span>
          </div>
        )}
        <div className="flex justify-between items-center py-3 bg-green-50 dark:bg-green-950 rounded-xl px-4">
          <span className="font-bold text-gray-800 dark:text-white">Remunerație efectivă totală</span>
          <span className="font-bold text-green-600 dark:text-green-400 text-lg">{formatRON(result.remuneratieEfectiva)}</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500">
          * Calcul orientativ 2026. CAM = 2.25%, CAS = 25%, CASS = 10%, Impozit = 10%. Fără deducere personală.
        </p>
      </div>

      </div>{/* end right */}
      </div>{/* end grid */}
    </div>
  );
}
