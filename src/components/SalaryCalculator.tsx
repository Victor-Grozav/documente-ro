"use client";

import { useState, useCallback } from "react";

interface SalaryBreakdown {
  brut: number;
  cas: number;
  cass: number;
  venitImpozabil: number;
  impozit: number;
  net: number;
  costAngajator: number;
  cam: number;
}

function calculateSalary(brut: number): SalaryBreakdown {
  const cas = Math.round(brut * 0.25);
  const cass = Math.round(brut * 0.10);
  const venitImpozabil = brut - cas - cass;
  const impozit = Math.round(venitImpozabil * 0.10);
  const net = brut - cas - cass - impozit;
  const cam = Math.round(brut * 0.0225);
  const costAngajator = brut + cam;

  return { brut, cas, cass, venitImpozabil, impozit, net, costAngajator, cam };
}

function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " RON";
}

function PercentBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

export default function SalaryCalculator() {
  const [brut, setBrut] = useState<number>(7000);
  const [inputValue, setInputValue] = useState<string>("7000");
  const [view, setView] = useState<"lunar" | "anual">("lunar");

  const result = calculateSalary(brut);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0 && num <= 100000) {
      setBrut(num);
    }
  }, []);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setBrut(val);
    setInputValue(String(val));
  }, []);

  const mult = view === "anual" ? 12 : 1;
  const netPercent = Math.round((result.net / result.brut) * 100);
  const casPercent = Math.round((result.cas / result.brut) * 100);
  const cassPercent = Math.round((result.cass / result.brut) * 100);
  const impozitPercent = Math.round((result.impozit / result.brut) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Salariu brut lunar
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInput}
            className="flex-1 text-3xl font-bold text-gray-900 border-b-2 border-blue-500 pb-1 bg-transparent outline-none focus:border-blue-600"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400">RON</span>
        </div>
        <input
          type="range"
          min={1000}
          max={50000}
          step={100}
          value={brut}
          onChange={handleSlider}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1.000 RON</span>
          <span className="text-gray-500 font-medium">Salariu minim: 4.050 RON</span>
          <span>50.000 RON</span>
        </div>
      </div>

      {/* Toggle lunar/anual */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-4 w-fit mx-auto">
        <button
          onClick={() => setView("lunar")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "lunar"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Lunar
        </button>
        <button
          onClick={() => setView("anual")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "anual"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Anual
        </button>
      </div>

      {/* Result principal */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-4 text-white text-center shadow-md">
        <p className="text-blue-200 text-sm font-medium mb-1">Salariu net {view}</p>
        <p className="text-5xl font-bold tracking-tight">
          {formatRON(result.net * mult)}
        </p>
        <p className="text-blue-200 text-sm mt-2">
          {netPercent}% din brut • Retineri: {formatRON((result.brut - result.net) * mult)}
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Detaliu calcul {view}
        </h3>

        {/* Brut */}
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="font-medium text-gray-700">Salariu brut</span>
          <span className="font-bold text-gray-900">{formatRON(result.brut * mult)}</span>
        </div>

        {/* CAS */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700">CAS </span>
              <span className="text-xs text-gray-400">(pensie, 25%)</span>
            </div>
            <span className="text-sm font-semibold text-red-500">
              -{formatRON(result.cas * mult)}
            </span>
          </div>
          <PercentBar percent={casPercent} color="bg-red-300" />
        </div>

        {/* CASS */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700">CASS </span>
              <span className="text-xs text-gray-400">(sanatate, 10%)</span>
            </div>
            <span className="text-sm font-semibold text-orange-500">
              -{formatRON(result.cass * mult)}
            </span>
          </div>
          <PercentBar percent={cassPercent} color="bg-orange-300" />
        </div>

        {/* Impozit */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700">Impozit venit </span>
              <span className="text-xs text-gray-400">(10% din {formatRON(result.venitImpozabil)})</span>
            </div>
            <span className="text-sm font-semibold text-yellow-600">
              -{formatRON(result.impozit * mult)}
            </span>
          </div>
          <PercentBar percent={impozitPercent} color="bg-yellow-300" />
        </div>

        {/* Net final */}
        <div className="flex justify-between items-center py-3 bg-blue-50 rounded-xl px-4 mt-2">
          <span className="font-bold text-gray-800">Salariu net</span>
          <span className="font-bold text-blue-600 text-lg">
            {formatRON(result.net * mult)}
          </span>
        </div>
      </div>

      {/* Cost angajator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Cost total angajator
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Salariu brut</span>
          <span className="text-sm font-medium">{formatRON(result.brut * mult)}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-sm text-gray-600">CAM </span>
            <span className="text-xs text-gray-400">(asigurare munca, 2.25%)</span>
          </div>
          <span className="text-sm font-medium text-red-500">+{formatRON(result.cam * mult)}</span>
        </div>
        <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4">
          <span className="font-bold text-gray-800">Cost total</span>
          <span className="font-bold text-gray-900 text-lg">
            {formatRON(result.costAngajator * mult)}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * Calculele sunt orientative pentru 2025. Deducerea personala nu este inclusa.
        </p>
      </div>
    </div>
  );
}
