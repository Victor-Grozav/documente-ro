"use client";

import { useState } from "react";

// Codul Fiscal art. 470 — impozit minim pe mijloace de transport 2025
// Rata se aplică per 200 cm³ (sau fracție) la ÎNTREAGA capacitate cilindrică
// Consiliile locale pot majora cu până la 50% față de minimul Codul Fiscal

type TipVehicul = "autoturism" | "motocicleta";
type Propulsie = "termica" | "hibrid" | "electric";

interface Banda {
  maxCC: number;
  rataMinima: number; // RON per unitate de 200 cm³
  label: string;
}

const BENZI_AUTOTURISM: Banda[] = [
  { maxCC: 1600, rataMinima: 8, label: "până la 1.600 cm³" },
  { maxCC: 2000, rataMinima: 18, label: "1.601–2.000 cm³" },
  { maxCC: 2600, rataMinima: 72, label: "2.001–2.600 cm³" },
  { maxCC: 3000, rataMinima: 144, label: "2.601–3.000 cm³" },
  { maxCC: Infinity, rataMinima: 290, label: "peste 3.000 cm³" },
];

const BENZI_MOTOCICLETA: Banda[] = [
  { maxCC: 200, rataMinima: 5, label: "până la 200 cm³" },
  { maxCC: 1200, rataMinima: 6, label: "201–1.200 cm³" },
  { maxCC: Infinity, rataMinima: 7, label: "peste 1.200 cm³" },
];

interface Judet {
  cod: string;
  name: string;
  multiplier: number;
  nota?: string;
}

// Sursa: hotărâri ale consiliilor locale publicate pe site-urile DITL județene (2026)
// Toate județele aplică cota minimă din Codul Fiscal, cu excepția celor marcate explicit.
// București: confirmat cota maximă (50% peste minim) prin HCGMB anuale.
const JUDETE: Judet[] = [
  { cod: "B",  name: "București",          multiplier: 1.5, nota: "Aplică cota maximă legală (+50%)" },
  { cod: "AB", name: "Alba",               multiplier: 1.0 },
  { cod: "AR", name: "Arad",               multiplier: 1.0 },
  { cod: "AG", name: "Argeș",              multiplier: 1.0 },
  { cod: "BC", name: "Bacău",              multiplier: 1.0 },
  { cod: "BH", name: "Bihor",              multiplier: 1.0 },
  { cod: "BN", name: "Bistrița-Năsăud",    multiplier: 1.0 },
  { cod: "BT", name: "Botoșani",           multiplier: 1.0 },
  { cod: "BV", name: "Brașov",             multiplier: 1.0 },
  { cod: "BR", name: "Brăila",             multiplier: 1.0 },
  { cod: "BZ", name: "Buzău",              multiplier: 1.0 },
  { cod: "CS", name: "Caraș-Severin",      multiplier: 1.0 },
  { cod: "CL", name: "Călărași",           multiplier: 1.0 },
  { cod: "CJ", name: "Cluj",               multiplier: 1.0 },
  { cod: "CT", name: "Constanța",          multiplier: 1.0 },
  { cod: "CV", name: "Covasna",            multiplier: 1.0 },
  { cod: "DB", name: "Dâmbovița",          multiplier: 1.0 },
  { cod: "DJ", name: "Dolj",               multiplier: 1.0 },
  { cod: "GL", name: "Galați",             multiplier: 1.0 },
  { cod: "GR", name: "Giurgiu",            multiplier: 1.0 },
  { cod: "GJ", name: "Gorj",               multiplier: 1.0 },
  { cod: "HR", name: "Harghita",           multiplier: 1.0 },
  { cod: "HD", name: "Hunedoara",          multiplier: 1.0 },
  { cod: "IL", name: "Ialomița",           multiplier: 1.0 },
  { cod: "IS", name: "Iași",               multiplier: 1.0 },
  { cod: "IF", name: "Ilfov",              multiplier: 1.0 },
  { cod: "MM", name: "Maramureș",          multiplier: 1.0 },
  { cod: "MH", name: "Mehedinți",          multiplier: 1.0 },
  { cod: "MS", name: "Mureș",              multiplier: 1.0 },
  { cod: "NT", name: "Neamț",              multiplier: 1.0 },
  { cod: "OT", name: "Olt",                multiplier: 1.0 },
  { cod: "PH", name: "Prahova",            multiplier: 1.0 },
  { cod: "SM", name: "Satu Mare",          multiplier: 1.0 },
  { cod: "SJ", name: "Sălaj",              multiplier: 1.0 },
  { cod: "SB", name: "Sibiu",              multiplier: 1.0 },
  { cod: "SV", name: "Suceava",            multiplier: 1.0 },
  { cod: "TR", name: "Teleorman",          multiplier: 1.0 },
  { cod: "TM", name: "Timiș",              multiplier: 1.0 },
  { cod: "TL", name: "Tulcea",             multiplier: 1.0 },
  { cod: "VL", name: "Vâlcea",             multiplier: 1.0 },
  { cod: "VS", name: "Vaslui",             multiplier: 1.0 },
  { cod: "VN", name: "Vrancea",            multiplier: 1.0 },
];

interface Rezultat {
  impozitAnual: number;
  impozitBazaMinima: number;
  impozitCuMultiplicator: number;
  banda: Banda;
  unitati: number;
  scutit: boolean;
  hibrid: boolean;
}

function getBanda(cc: number, benzi: Banda[]): Banda {
  return benzi.find((b) => cc <= b.maxCC)!;
}

function calculeaza(
  cc: number,
  tipVehicul: TipVehicul,
  propulsie: Propulsie,
  judet: Judet
): Rezultat {
  const benzi = tipVehicul === "autoturism" ? BENZI_AUTOTURISM : BENZI_MOTOCICLETA;
  const banda = getBanda(cc, benzi);
  const unitati = Math.ceil(cc / 200);
  const impozitBazaMinima = unitati * banda.rataMinima;
  const impozitCuMultiplicator = Math.round(impozitBazaMinima * judet.multiplier);

  if (propulsie === "electric") {
    return { impozitAnual: 0, impozitBazaMinima: 0, impozitCuMultiplicator: 0, banda, unitati, scutit: true, hibrid: false };
  }

  const impozitAnual =
    propulsie === "hibrid"
      ? Math.round(impozitCuMultiplicator * 0.5)
      : impozitCuMultiplicator;

  return { impozitAnual, impozitBazaMinima, impozitCuMultiplicator, banda, unitati, scutit: false, hibrid: propulsie === "hibrid" };
}

function fmt(n: number) {
  return new Intl.NumberFormat("ro-RO").format(n) + " RON";
}

export default function CalculatorImpozitAuto() {
  const [cc, setCc] = useState(1600);
  const [ccInput, setCcInput] = useState("1600");
  const [tipVehicul, setTipVehicul] = useState<TipVehicul>("autoturism");
  const [propulsie, setPropulsie] = useState<Propulsie>("termica");
  const [judetCod, setJudetCod] = useState("B");

  const judet = JUDETE.find((j) => j.cod === judetCod)!;
  const r = calculeaza(cc, tipVehicul, propulsie, judet);

  const banziCurente = tipVehicul === "autoturism" ? BENZI_AUTOTURISM : BENZI_MOTOCICLETA;
  const maxCC = tipVehicul === "autoturism" ? 6000 : 2000;
  const stepCC = tipVehicul === "autoturism" ? 50 : 25;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* Județ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-600 mb-3">
          Județ / Oraș
        </label>
        <select
          value={judetCod}
          onChange={(e) => setJudetCod(e.target.value)}
          className="w-full text-base font-semibold text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 bg-white"
        >
          {JUDETE.map((j) => (
            <option key={j.cod} value={j.cod}>
              {j.name} {j.nota ? `— ${j.nota}` : ""}
            </option>
          ))}
        </select>
        {judet.multiplier > 1.0 && (
          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-3">
            {judet.name} aplică o cotă de impozitare cu {Math.round((judet.multiplier - 1) * 100)}% peste minimul stabilit de Codul Fiscal.
          </p>
        )}
        {judet.multiplier === 1.0 && (
          <p className="text-xs text-gray-400 mt-2">
            Se aplică cota minimă din Codul Fiscal. Verificați la DITL-ul județului pentru rate exacte.
          </p>
        )}
      </div>

      {/* Tip vehicul */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-600 mb-3">Tip vehicul</p>
        <div className="grid grid-cols-2 gap-3">
          {(["autoturism", "motocicleta"] as TipVehicul[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTipVehicul(t);
                const newMax = t === "autoturism" ? 6000 : 2000;
                const newCc = Math.min(cc, newMax);
                setCc(newCc);
                setCcInput(String(newCc));
              }}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors ${
                tipVehicul === t
                  ? "border-purple-500 bg-purple-50 text-purple-800"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {t === "autoturism" ? "🚗 Autoturism" : "🏍️ Motocicletă"}
            </button>
          ))}
        </div>
      </div>

      {/* Propulsie */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-600 mb-3">Tip propulsie</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { val: "termica" as Propulsie, label: "Termică", sub: "Benzină / Diesel / GPL" },
            { val: "hibrid" as Propulsie, label: "Hibrid", sub: "50% reducere impozit" },
            { val: "electric" as Propulsie, label: "Electrică", sub: "Scutit de impozit" },
          ]).map(({ val, label, sub }) => (
            <button
              key={val}
              onClick={() => setPropulsie(val)}
              className={`py-3 px-3 rounded-xl border-2 text-left transition-colors ${
                propulsie === val
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className={`text-sm font-semibold ${propulsie === val ? "text-purple-800" : "text-gray-800"}`}>
                {label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Capacitate cilindrică */}
      {propulsie !== "electric" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Capacitate cilindrică
          </label>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              inputMode="numeric"
              value={ccInput}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                setCcInput(raw);
                const n = parseInt(raw, 10);
                if (!isNaN(n) && n >= 1 && n <= maxCC) setCc(n);
              }}
              className="min-w-0 flex-1 text-3xl font-bold text-gray-900 border-b-2 border-purple-500 pb-1 bg-transparent outline-none"
              placeholder="0"
            />
            <span className="text-xl font-semibold text-gray-400 shrink-0">cm³</span>
          </div>
          <input
            type="range"
            min={tipVehicul === "autoturism" ? 600 : 50}
            max={maxCC}
            step={stepCC}
            value={cc}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              setCc(v);
              setCcInput(String(v));
            }}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{tipVehicul === "autoturism" ? "600" : "50"} cm³</span>
            <span>{maxCC.toLocaleString("ro-RO")} cm³</span>
          </div>

          {/* Bandă activă */}
          <div className="mt-4 grid grid-cols-5 gap-1">
            {banziCurente.filter(b => b.maxCC !== Infinity).concat(banziCurente.filter(b => b.maxCC === Infinity)).map((banda, i) => {
              const activa = banda.maxCC === Infinity
                ? cc > (banziCurente[banziCurente.length - 2]?.maxCC ?? 0)
                : cc <= banda.maxCC && (i === 0 || cc > banziCurente[i - 1].maxCC);
              return (
                <div
                  key={i}
                  className={`rounded-lg p-2 text-center transition-colors ${
                    activa ? "bg-purple-100 border-2 border-purple-400" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <p className={`text-xs font-bold ${activa ? "text-purple-700" : "text-gray-500"}`}>
                    {banda.rataMinima} RON
                  </p>
                  <p className={`text-xs mt-0.5 ${activa ? "text-purple-600" : "text-gray-400"} hidden sm:block`}>
                    {banda.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            RON per 200 cm³ · banda activă evidențiată
          </p>
        </div>
      )}

      {/* Rezultat principal */}
      <div className={`rounded-2xl p-6 text-white text-center shadow-md ${
        r.scutit ? "bg-green-600" : r.hibrid ? "bg-blue-600" : "bg-purple-700"
      }`}>
        {r.scutit ? (
          <>
            <p className="text-green-200 text-sm font-medium mb-1">Vehicul electric — scutit de impozit</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">0 RON</p>
            <p className="text-green-200 text-sm mt-2">per an · Codul Fiscal art. 470 alin. (4)</p>
          </>
        ) : (
          <>
            <p className={`${r.hibrid ? "text-blue-200" : "text-purple-300"} text-sm font-medium mb-1`}>
              Impozit anual estimat · {judet.name}
              {r.hibrid ? " · 50% reducere hibrid" : ""}
            </p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">{fmt(r.impozitAnual)}</p>
            <p className={`${r.hibrid ? "text-blue-200" : "text-purple-300"} text-sm mt-2`}>
              ≈ {fmt(Math.round(r.impozitAnual / 12))} / lună
            </p>
          </>
        )}
      </div>

      {/* Detaliu calcul */}
      {!r.scutit && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Detaliu calcul
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Capacitate cilindrică</span>
              <span className="font-medium">{cc.toLocaleString("ro-RO")} cm³</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Unități de 200 cm³ (⌈{cc}/200⌉)</span>
              <span className="font-medium">{r.unitati} unități</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bandă de impozitare ({r.banda.label})</span>
              <span className="font-medium">{r.banda.rataMinima} RON / 200 cm³</span>
            </div>

            <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
              <span className="text-gray-600">Impozit minim Codul Fiscal</span>
              <span className="font-medium">{fmt(r.impozitBazaMinima)}</span>
            </div>

            {judet.multiplier > 1.0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Majorare {judet.name} (×{judet.multiplier})
                </span>
                <span className="font-medium text-amber-600">
                  +{fmt(r.impozitCuMultiplicator - r.impozitBazaMinima)}
                </span>
              </div>
            )}

            {r.hibrid && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reducere hibrid (−50%)</span>
                <span className="font-medium text-blue-600">
                  −{fmt(Math.round(r.impozitCuMultiplicator * 0.5))}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 bg-purple-50 rounded-xl px-4 mt-2">
              <span className="font-bold text-gray-800">Total de plată / an</span>
              <span className="font-bold text-purple-700 text-lg">{fmt(r.impozitAnual)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 pt-1">
            * Calcul orientativ 2025 per Codul Fiscal art. 470. Formula: ⌈cm³ ÷ 200⌉ × rată/200cm³ × coeficient local.
            Impozitul se plătește în două rate egale: 31 martie și 30 septembrie.
            Reducerea pentru hibrid se aplică vehiculelor cu motor termic + electric, conform hotărârilor locale.
          </p>
        </div>
      )}

      {/* Tabel benzi */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Toate benzile de impozitare — {tipVehicul === "autoturism" ? "Autoturisme" : "Motociclete"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-gray-500 font-medium py-2 pr-4">Capacitate</th>
                <th className="text-right text-gray-500 font-medium py-2 pr-4">RON / 200 cm³</th>
                <th className="text-right text-gray-500 font-medium py-2 pr-4">Exemplu 1.500 cm³</th>
                <th className="text-right text-gray-500 font-medium py-2">Exemplu 2.000 cm³</th>
              </tr>
            </thead>
            <tbody>
              {BENZI_AUTOTURISM.map((b, i) => {
                const exCC1 = Math.min(1500, b.maxCC === Infinity ? 1500 : b.maxCC);
                const bandaEx1 = getBanda(1500, BENZI_AUTOTURISM);
                const bandaEx2 = getBanda(2000, BENZI_AUTOTURISM);
                const activa = r.banda.maxCC === b.maxCC;
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 ${activa && !r.scutit ? "bg-purple-50" : ""}`}
                  >
                    <td className={`py-2 pr-4 ${activa && !r.scutit ? "font-semibold text-purple-800" : "text-gray-700"}`}>
                      {b.label}
                    </td>
                    <td className={`py-2 pr-4 text-right ${activa && !r.scutit ? "font-bold text-purple-700" : "text-gray-700"}`}>
                      {b.rataMinima}
                    </td>
                    <td className={`py-2 pr-4 text-right text-gray-500 ${bandaEx1.maxCC === b.maxCC ? "font-semibold text-purple-700" : ""}`}>
                      {bandaEx1.maxCC === b.maxCC ? fmt(Math.ceil(1500 / 200) * b.rataMinima) : "—"}
                    </td>
                    <td className={`py-2 text-right text-gray-500 ${bandaEx2.maxCC === b.maxCC ? "font-semibold text-purple-700" : ""}`}>
                      {bandaEx2.maxCC === b.maxCC ? fmt(Math.ceil(2000 / 200) * b.rataMinima) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Rate minime Codul Fiscal 2025. Exemplele sunt pentru județul cu cotă minimă.
          București: ×1,5 față de valorile de mai sus.
        </p>
      </div>

    </div>
  );
}
