"use client";

import { useState } from "react";

// OUG 158/2005 — parametri 2025
const SALARIU_MINIM_BRUT = 4050; // RON, valabil 2026
const PLAFON_BAZA = 12 * SALARIU_MINIM_BRUT; // 48.600 RON/lună
const ZILE_LUNA = 30; // zile calendaristice standard pentru baza de calcul

type TipCM =
  | "obisnuita"       // 75% — angajator zile 1-5, CNAS zile 6+
  | "copil"           // 85% — angajator zile 1-5, CNAS zile 6+
  | "accident"        // 100% — CNAS de la ziua 1
  | "speciale";       // 100% — CNAS de la ziua 1 (TBC, cancer, SIDA, transplant, urgențe)

const TIP_LABEL: Record<TipCM, string> = {
  obisnuita: "Boală obișnuită",
  copil: "Îngrijire copil bolnav",
  accident: "Accident de muncă / boală profesională",
  speciale: "Boli speciale (TBC, cancer, SIDA, transplant, urgențe)",
};

const TIP_PROCENT: Record<TipCM, number> = {
  obisnuita: 0.75,
  copil: 0.85,
  accident: 1.0,
  speciale: 1.0,
};

// Zile 1-5 plătite de CNAS (nu angajator) pentru accident/boli speciale
const CNAS_DE_LA_ZI_1: TipCM[] = ["accident", "speciale"];

interface Rezultat {
  bazaZilnica: number;
  indemnizatieZilnicaBruta: number;
  procent: number;
  zileCNAS: number;
  zileAngajator: number;
  brutAngajator: number;
  brutCNAS: number;
  brutTotal: number;
  netAngajator: number;  // după CAS+CASS+impozit (ca salariu)
  netCNAS: number;       // după CASS 10% (scutit impozit venit și CAS)
  netTotal: number;
  plafonat: boolean;
}

function calculeaza(
  salariuMediu: number,
  zileCM: number,
  tip: TipCM
): Rezultat {
  const salariuPlafonat = Math.min(salariuMediu, PLAFON_BAZA);
  const plafonat = salariuMediu > PLAFON_BAZA;
  const bazaZilnica = salariuPlafonat / ZILE_LUNA;
  const procent = TIP_PROCENT[tip];
  const indemnizatieZilnicaBruta = bazaZilnica * procent;

  const cnasDelaZi1 = CNAS_DE_LA_ZI_1.includes(tip);
  const zileAngajator = cnasDelaZi1 ? 0 : Math.min(zileCM, 5);
  const zileCNAS = cnasDelaZi1 ? zileCM : Math.max(0, zileCM - 5);

  const brutAngajator = Math.round(indemnizatieZilnicaBruta * zileAngajator);
  const brutCNAS = Math.round(indemnizatieZilnicaBruta * zileCNAS);
  const brutTotal = brutAngajator + brutCNAS;

  // Angajator: deduceri ca salariu (CAS 25%, CASS 10%, impozit venit 10%)
  const casAng = Math.round(brutAngajator * 0.25);
  const cassAng = Math.round(brutAngajator * 0.10);
  const impAng = Math.round((brutAngajator - casAng - cassAng) * 0.10);
  const netAngajator = brutAngajator - casAng - cassAng - impAng;

  // CNAS: doar CASS 10% (scutit CAS și impozit venit per art. 76 Cod Fiscal)
  const cassCNAS = Math.round(brutCNAS * 0.10);
  const netCNAS = brutCNAS - cassCNAS;

  const netTotal = netAngajator + netCNAS;

  return {
    bazaZilnica,
    indemnizatieZilnicaBruta,
    procent,
    zileCNAS,
    zileAngajator,
    brutAngajator,
    brutCNAS,
    brutTotal,
    netAngajator,
    netCNAS,
    netTotal,
    plafonat,
  };
}

function fmt(n: number) {
  return (
    new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n) + " RON"
  );
}

function fmtZile(n: number) {
  return n === 1 ? "1 zi" : `${n} zile`;
}

export default function CalculatorConcediuMedical() {
  const [salariu, setSalariu] = useState(5000);
  const [salariuInput, setSalariuInput] = useState("5000");
  const [zile, setZile] = useState(10);
  const [zileInput, setZileInput] = useState("10");
  const [tip, setTip] = useState<TipCM>("obisnuita");

  const r = calculeaza(salariu, zile, tip);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* Salariu */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Salariu brut mediu lunar (ultimele 6 luni)
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
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 border-b-2 border-blue-500 pb-1 bg-transparent outline-none"
            placeholder="0"
          />
          <span className="text-xl font-semibold text-gray-400 shrink-0">RON</span>
        </div>
        <input
          type="range"
          min={1000}
          max={50000}
          step={100}
          value={Math.min(salariu, 50000)}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setSalariu(v);
            setSalariuInput(String(v));
          }}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1.000 RON</span>
          <span className="text-gray-500 font-medium hidden sm:inline">
            Salariu minim: 4.050 RON · Plafon: 48.600 RON
          </span>
          <span>50.000 RON</span>
        </div>
        {r.plafonat && (
          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-3">
            Salariul depășește plafonul de calcul de 48.600 RON. Indemnizația se calculează la plafonul maxim.
          </p>
        )}
      </div>

      {/* Zile CM */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Număr de zile calendaristice de concediu medical
        </label>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            value={zileInput}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setZileInput(raw);
              const n = parseInt(raw, 10);
              if (!isNaN(n) && n >= 1 && n <= 183) setZile(n);
            }}
            className="min-w-0 flex-1 text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-1 bg-transparent outline-none"
            placeholder="1"
          />
          <span className="text-xl font-semibold text-gray-400 shrink-0">zile</span>
        </div>
        <input
          type="range"
          min={1}
          max={90}
          step={1}
          value={Math.min(zile, 90)}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setZile(v);
            setZileInput(String(v));
          }}
          className="w-full accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 zi</span>
          <span>90 zile</span>
        </div>
      </div>

      {/* Tip CM */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-600 mb-3">Tipul concediului medical</p>
        <div className="space-y-2">
          {(Object.keys(TIP_LABEL) as TipCM[]).map((t) => (
            <label
              key={t}
              className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                tip === t
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="tipCM"
                value={t}
                checked={tip === t}
                onChange={() => setTip(t)}
                className="mt-0.5 accent-blue-600"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{TIP_LABEL[t]}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {Math.round(TIP_PROCENT[t] * 100)}% din baza de calcul
                  {CNAS_DE_LA_ZI_1.includes(t)
                    ? " · CNAS plătește de la ziua 1"
                    : " · Angajator zile 1–5, CNAS zile 6+"}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Rezultat principal */}
      <div className="bg-green-600 rounded-2xl p-6 text-white text-center shadow-md">
        <p className="text-green-200 text-sm font-medium mb-1">
          Total net estimat pentru {fmtZile(zile)}
        </p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight">
          {fmt(r.netTotal)}
        </p>
        <p className="text-green-200 text-sm mt-2">
          {fmt(r.brutTotal)} brut ·{" "}
          {Math.round((r.netTotal / (r.brutTotal || 1)) * 100)}% din brut
        </p>
      </div>

      {/* Breakdown detaliat */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Detaliu calcul
        </h3>

        {/* Baza */}
        <div className="space-y-1 pb-3 border-b border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Salariu de calcul (plafonat)</span>
            <span className="font-medium">{fmt(Math.min(salariu, PLAFON_BAZA))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Baza zilnică de calcul</span>
            <span className="font-medium">
              {new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(r.bazaZilnica)} RON/zi
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Indemnizație zilnică ({Math.round(r.procent * 100)}%)
            </span>
            <span className="font-medium text-green-700">
              {new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(r.indemnizatieZilnicaBruta)} RON/zi
            </span>
          </div>
        </div>

        {/* Angajator */}
        {r.zileAngajator > 0 && (
          <div className="rounded-xl bg-orange-50 border border-orange-100 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Plătit de angajator
                </p>
                <p className="text-xs text-gray-500">{fmtZile(r.zileAngajator)} (zile 1–5)</p>
              </div>
              <span className="text-sm font-bold text-orange-700">{fmt(r.brutAngajator)} brut</span>
            </div>
            <p className="text-xs text-gray-500">
              Supus CAS 25% + CASS 10% + impozit venit 10% (ca salariu obișnuit)
            </p>
            <div className="flex justify-between text-sm pt-1 border-t border-orange-100">
              <span className="font-medium text-gray-700">Net estimat</span>
              <span className="font-bold text-orange-700">{fmt(r.netAngajator)}</span>
            </div>
          </div>
        )}

        {/* CNAS */}
        {r.zileCNAS > 0 && (
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">Plătit de CNAS</p>
                <p className="text-xs text-gray-500">
                  {fmtZile(r.zileCNAS)}{" "}
                  {CNAS_DE_LA_ZI_1.includes(tip) ? "(de la ziua 1)" : "(de la ziua 6)"}
                </p>
              </div>
              <span className="text-sm font-bold text-blue-700">{fmt(r.brutCNAS)} brut</span>
            </div>
            <p className="text-xs text-gray-500">
              CASS 10% reținut · scutit de CAS și impozit venit (art. 76 Cod Fiscal)
            </p>
            <div className="flex justify-between text-sm pt-1 border-t border-blue-100">
              <span className="font-medium text-gray-700">Net estimat</span>
              <span className="font-bold text-blue-700">{fmt(r.netCNAS)}</span>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center py-3 bg-green-50 rounded-xl px-4">
          <span className="font-bold text-gray-800">Total net</span>
          <span className="font-bold text-green-700 text-lg">{fmt(r.netTotal)}</span>
        </div>

        <p className="text-xs text-gray-400 pt-1">
          * Calcul orientativ 2026 per OUG 158/2005. Baza = media ultimelor 6 luni / 30 zile.
          Plafon maxim: 12 × salariul minim = 48.600 RON/lună. Deducerea personală nu este inclusă.
        </p>
      </div>

      {/* Explicații */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 text-sm text-gray-600">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Cum funcționează concediul medical în România?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-orange-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Zile 1–5 → Angajator</p>
            <p className="text-xs text-gray-500">
              Primele 5 zile de CM sunt suportate din fondurile proprii ale angajatorului.
              Se impozitează ca salariul obișnuit.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Ziua 6+ → CNAS</p>
            <p className="text-xs text-gray-500">
              Din ziua 6, indemnizația este plătită din Fondul Național de Asigurări de
              Sănătate. Se reține doar CASS 10%.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Excepție: CNAS de la ziua 1</p>
            <p className="text-xs text-gray-500">
              Accidente de muncă, boli profesionale, TBC, cancer, SIDA, transplant,
              urgențe medico-chirurgicale și carantină.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 mb-1">Condiție stagiu</p>
            <p className="text-xs text-gray-500">
              Minim 6 luni de stagiu de cotizare în ultimele 12 luni pentru a beneficia
              de indemnizație (excepție: urgențe și boli profesionale).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
