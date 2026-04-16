"use client";

import { useState, useCallback, useEffect } from "react";

// Legea 72/2013: BNR + 8pp pentru tranzacții comerciale (B2B)
// Legea 72/2013: BNR + 4pp pentru alte creanțe
const DOBANDA_BNR_FALLBACK = 6.5;
const MARJA_COMERCIALA = 8;
const MARJA_CIVILA = 4;

type TipContract = "comercial" | "civil";
type BnrSource = "bnr" | "fallback" | "loading";

interface Result {
  suma: number;
  zileIntarziere: number;
  dobandaAplicata: number;
  dobandaZilnica: number;
  dobandaTotala: number;
  totalDePlata: number;
  detaliu: string;
}

function calculeazaDobanda(
  suma: number,
  dataScadenta: string,
  dataPlata: string,
  tipContract: TipContract,
  dobandaPersonalizata: boolean,
  dobandaCustom: number,
  dobandaBNR: number
): Result {
  const d1 = new Date(dataScadenta);
  const d2 = new Date(dataPlata);
  const zileIntarziere = Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

  const marjaAplicata = tipContract === "comercial" ? MARJA_COMERCIALA : MARJA_CIVILA;
  const dobandaAplicata = dobandaPersonalizata
    ? dobandaCustom
    : dobandaBNR + marjaAplicata;

  const dobandaZilnica = (suma * dobandaAplicata) / 100 / 365;
  const dobandaTotala = Math.round(dobandaZilnica * zileIntarziere * 100) / 100;
  const totalDePlata = suma + dobandaTotala;

  const detaliu = dobandaPersonalizata
    ? `Dobândă personalizată: ${dobandaCustom}%/an`
    : `BNR ${dobandaBNR}% + ${marjaAplicata}pp (Legea 72/2013) = ${dobandaAplicata}%/an`;

  return {
    suma,
    zileIntarziere,
    dobandaAplicata,
    dobandaZilnica: Math.round(dobandaZilnica * 100) / 100,
    dobandaTotala,
    totalDePlata,
    detaliu,
  };
}

function formatRON(value: number, decimale = 0): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: decimale,
    maximumFractionDigits: decimale,
  }).format(value) + " RON";
}

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getDatePlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

export default function CalculatorDobandaPenalizatoare() {
  const [suma, setSuma] = useState<number>(10000);
  const [sumaInput, setSumaInput] = useState<string>("10000");
  const [dataScadenta, setDataScadenta] = useState<string>(getDatePlusDays(30));
  const [dataPlata, setDataPlata] = useState<string>(getTodayStr());
  const [tipContract, setTipContract] = useState<TipContract>("comercial");
  const [dobandaPersonalizata, setDobandaPersonalizata] = useState<boolean>(false);
  const [dobandaCustom, setDobandaCustom] = useState<number>(10);
  const [dobandaBNR, setDobandaBNR] = useState<number>(DOBANDA_BNR_FALLBACK);
  const [bnrSource, setBnrSource] = useState<BnrSource>("loading");

  useEffect(() => {
    fetch("/api/dobanda-bnr")
      .then((r) => r.json())
      .then((data) => {
        setDobandaBNR(data.rate);
        setBnrSource(data.source as BnrSource);
      })
      .catch(() => {
        setDobandaBNR(DOBANDA_BNR_FALLBACK);
        setBnrSource("fallback");
      });
  }, []);

  const result = calculeazaDobanda(
    suma, dataScadenta, dataPlata, tipContract, dobandaPersonalizata, dobandaCustom, dobandaBNR
  );

  const handleSuma = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setSumaInput(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0) setSuma(num);
    else if (raw === "") setSuma(0);
  }, []);

  const isValid = dataPlata >= dataScadenta;

  return (
    <div className="w-full max-w-2xl mx-auto lg:max-w-4xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

      {/* ── LEFT — input ── */}
      <div>
      {/* Input sumă */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
            Date creanță
          </h3>
          {bnrSource === "loading" ? (
            <span className="text-xs text-gray-400 dark:text-slate-500 animate-pulse">
              Se încarcă rata BNR...
            </span>
          ) : bnrSource === "bnr" ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              BNR live · {dobandaBNR}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              Rată manuală · {dobandaBNR}%
            </span>
          )}
        </div>

        <label htmlFor="suma-creanta" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
          Suma datorată
        </label>
        <div className="flex items-center gap-3 mb-5">
          <input
            id="suma-creanta"
            type="text"
            inputMode="numeric"
            value={sumaInput}
            onChange={handleSuma}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 pb-1 bg-transparent outline-none focus:border-blue-600"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 dark:text-slate-500 shrink-0">RON</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="data-scadenta" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
              Data scadenței (când trebuia plătit)
            </label>
            <input
              id="data-scadenta"
              type="date"
              value={dataScadenta}
              onChange={(e) => setDataScadenta(e.target.value)}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="data-plata" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">
              Data plății efective (sau azi)
            </label>
            <input
              id="data-plata"
              type="date"
              value={dataPlata}
              onChange={(e) => setDataPlata(e.target.value)}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tip contract */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-2">Tipul contractului</p>
          <div className="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
            <button
              onClick={() => setTipContract("comercial")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tipContract === "comercial"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Comercial (B2B)
            </button>
            <button
              onClick={() => setTipContract("civil")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tipContract === "civil"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Civil (B2C/privat)
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
            {tipContract === "comercial"
              ? `Legea 72/2013: BNR ${dobandaBNR}% + 8pp = ${dobandaBNR + MARJA_COMERCIALA}%/an`
              : `Dobânda legală: BNR ${dobandaBNR}% + 4pp = ${dobandaBNR + MARJA_CIVILA}%/an`}
          </p>
        </div>

        {/* Dobândă personalizată (contractuală) */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={dobandaPersonalizata}
              onChange={(e) => setDobandaPersonalizata(e.target.checked)}
              className="w-4 h-4 accent-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Contractul prevede o dobândă penalizatoare specifică
            </span>
          </label>
          {dobandaPersonalizata && (
            <div className="ml-7 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={50}
                step={0.5}
                value={dobandaCustom}
                onChange={(e) => setDobandaCustom(parseFloat(e.target.value))}
                className="flex-1 accent-blue-500"
              />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-20 text-right">
                {dobandaCustom}%/an
              </span>
            </div>
          )}
        </div>
      </div>

      </div>{/* end left */}

      {/* ── RIGHT — results ── */}
      <div className="mt-4 lg:mt-0">
      {/* Result principal */}
      {!isValid ? (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-5 mb-4 text-center">
          <p className="text-red-600 dark:text-red-400 font-medium">
            ⚠️ Data plății trebuie să fie după data scadenței.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-red-600 rounded-2xl p-6 mb-4 text-white text-center shadow-md">
            <p className="text-red-200 text-sm font-medium mb-1">Dobândă penalizatoare datorată</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">
              {formatRON(result.dobandaTotala, 2)}
            </p>
            <p className="text-red-200 text-sm mt-2">
              {result.zileIntarziere} zile întârziere · {result.dobandaAplicata}%/an · {formatRON(result.dobandaZilnica, 2)}/zi
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
              Detaliu calcul
            </h3>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
              <span className="text-sm text-gray-700 dark:text-slate-300">Suma principală</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatRON(result.suma)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
              <span className="text-sm text-gray-700 dark:text-slate-300">Zile de întârziere</span>
              <span className="font-semibold text-gray-900 dark:text-white">{result.zileIntarziere} zile</span>
            </div>
            <div className="flex justify-between items-start py-1.5 border-b border-gray-50 dark:border-slate-800">
              <div>
                <span className="text-sm text-gray-700 dark:text-slate-300">Rata dobânzii</span>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{result.detaliu}</p>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white ml-4">{result.dobandaAplicata}%/an</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
              <span className="text-sm text-gray-700 dark:text-slate-300">Dobândă zilnică</span>
              <span className="text-sm font-semibold text-red-500">{formatRON(result.dobandaZilnica, 2)}/zi</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-slate-800">
              <span className="text-sm text-gray-700 dark:text-slate-300">Dobândă totală ({result.zileIntarziere} zile)</span>
              <span className="font-semibold text-red-500">{formatRON(result.dobandaTotala, 2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-red-50 dark:bg-red-950 rounded-xl px-4">
              <span className="font-bold text-gray-800 dark:text-white">Total de recuperat</span>
              <span className="font-bold text-red-600 dark:text-red-400 text-lg">{formatRON(result.totalDePlata, 2)}</span>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Formula de calcul
            </h3>
            <code className="text-blue-600 dark:text-blue-400 font-mono text-xs bg-blue-50 dark:bg-blue-950 px-3 py-2 rounded block leading-relaxed">
              Dobândă/zi = Sumă × Rată% / 100 / 365{"\n"}
              Dobândă totală = Dobândă/zi × Nr. zile{"\n"}
              Total = Sumă + Dobândă totală
            </code>
          </div>
        </>
      )}

      </div>{/* end right */}
      </div>{/* end grid */}

      {/* ── FULL WIDTH — info ── */}
      <div className="mt-4 lg:mt-8">
      {/* Info box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-3 text-sm text-gray-600 dark:text-slate-400">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">
          Ce este dobânda penalizatoare?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Legea 72/2013</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Reglementează dobânda legală penalizatoare pentru întârzieri la plată în tranzacțiile comerciale.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Rata BNR</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Dobânda de referință BNR se modifică de ~8 ori/an. Rata afișată mai sus este preluată automat de pe <strong>bnr.ro</strong>.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Contractual vs. legal</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Dacă contractul prevede o rată specifică, aceea prevalează. Altfel, se aplică rata legală.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
            <p className="font-semibold text-gray-800 dark:text-slate-100 mb-1">Notificare prealabilă</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Recomandăm trimiterea unei notificări de plată înainte de a invoca dobânda penalizatoare.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 pt-2 border-t border-gray-100 dark:border-slate-700">
          * Rata BNR folosită în calcul: <strong>{dobandaBNR}%/an</strong>{bnrSource === "fallback" ? " (valoare manuală — verificați bnr.ro)" : " (preluată automat de pe bnr.ro)"}. Calcul orientativ — consultați un avocat pentru acțiuni în instanță.
        </p>
      </div>
      </div>{/* end full width */}
    </div>
  );
}
