"use client";

import { useState, useEffect } from "react";
import { CerereConceduData } from "@/lib/types";
import { useReportFormData } from "./SplitPageLayout";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: CerereConceduData = {
  angajatorNume: "",
  angajatNume: "",
  angajatFunctia: "",
  departament: "",
  tipConcediu: "odihnă",
  dataInceput: "",
  dataSfarsit: "",
  nrZile: "",
  observatii: "",
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required,
}: {
  label: string; name: keyof CerereConceduData; value: string;
  onChange: (name: keyof CerereConceduData, value: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text" value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500"
      />
    </div>
  );
}

function DateField({
  label, name, value, onChange, required,
}: {
  label: string; name: keyof CerereConceduData; value: string;
  onChange: (name: keyof CerereConceduData, value: string) => void;
  required?: boolean;
}) {
  const toIso = (ro: string) => {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(ro)) return "";
    const [d, m, y] = ro.split(".");
    return `${y}-${m}-${d}`;
  };
  const toRo = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="date" value={toIso(value)}
        onChange={(e) => onChange(name, toRo(e.target.value))}
        required={required}
        className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 bg-white dark:bg-slate-800"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
      <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function countWorkingDays(start: string, end: string): number {
  const [sd, sm, sy] = start.split(".");
  const [ed, em, ey] = end.split(".");
  const startDate = new Date(`${sy}-${sm}-${sd}`);
  const endDate = new Date(`${ey}-${em}-${ed}`);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) return 0;
  let count = 0;
  const cur = new Date(startDate);
  while (cur <= endDate) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export default function CerereConceduForm() {
  const [formData, setFormData] = useState<CerereConceduData>(defaultData);
  const reportData = useReportFormData();
  useEffect(() => { reportData(formData); }, [formData, reportData]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoCalculat, setAutoCalculat] = useState(false);

  const handleChange = (name: keyof CerereConceduData, value: string) => {
    if (name === "nrZile") setAutoCalculat(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { dataInceput, dataSfarsit } = formData;
    if (!dataInceput || !dataSfarsit) return;
    const zile = countWorkingDays(dataInceput, dataSfarsit);
    if (zile > 0) {
      setFormData((prev) => ({ ...prev, nrZile: String(zile) }));
      setAutoCalculat(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.dataInceput, formData.dataSfarsit]);

  const validate = () => {
    if (!formData.angajatorNume.trim()) return "Numele angajatorului este obligatoriu.";
    if (!formData.angajatNume.trim()) return "Numele angajatului este obligatoriu.";
    if (!formData.angajatFunctia.trim()) return "Funcția este obligatorie.";
    if (!formData.dataInceput) return "Data de început a concediului este obligatorie.";
    if (!formData.dataSfarsit) return "Data de sfârșit a concediului este obligatorie.";
    if (!formData.nrZile.trim() || isNaN(Number(formData.nrZile)) || Number(formData.nrZile) < 1)
      return "Numărul de zile trebuie să fie un număr pozitiv.";
    if (!formData.data) return "Data cererii este obligatorie.";
    if (!formData.locul.trim()) return "Locul este obligatoriu.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    localStorage.setItem("cerereConceduData", JSON.stringify(formData));
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "cerere-concediu" }),
      });
      const { url, error: apiError } = await res.json();
      if (apiError || !url) { setError("Eroare la procesarea plății. Încearcă din nou."); setLoading(false); return; }
      window.location.href = url;
    } catch {
      setError("Eroare la procesarea plății. Încearcă din nou.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Section title="Date angajator">
        <div className="sm:col-span-2">
          <Field label="Denumirea angajatorului (firma)" name="angajatorNume" value={formData.angajatorNume} onChange={handleChange} placeholder="ex: SC Exemplu SRL" required />
        </div>
      </Section>

      <Section title="Date angajat">
        <div className="sm:col-span-2">
          <Field label="Numele complet al angajatului" name="angajatNume" value={formData.angajatNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        </div>
        <Field label="Funcția / Postul" name="angajatFunctia" value={formData.angajatFunctia} onChange={handleChange} placeholder="ex: Programator" required />
        <Field label="Departament" name="departament" value={formData.departament} onChange={handleChange} placeholder="ex: IT, Vânzări" />
      </Section>

      <Section title="Detalii concediu">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Tipul concediului <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.tipConcediu}
            onChange={(e) => handleChange("tipConcediu", e.target.value as CerereConceduData["tipConcediu"])}
            className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white dark:bg-slate-800"
          >
            <option value="odihnă">Concediu de odihnă</option>
            <option value="fără plată">Concediu fără plată</option>
            <option value="studii">Concediu de studii</option>
          </select>
        </div>
        <DateField label="Data de început" name="dataInceput" value={formData.dataInceput} onChange={handleChange} required />
        <DateField label="Data de sfârșit" name="dataSfarsit" value={formData.dataSfarsit} onChange={handleChange} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Număr de zile <span className="text-red-400">*</span>
          </label>
          <input
            type="number" min="1" value={formData.nrZile}
            onChange={(e) => handleChange("nrZile", e.target.value)}
            placeholder="ex: 10"
            className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
          {autoCalculat && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 leading-snug">
              Calculat automat (zile L–V). Scade sărbătorile legale din această perioadă dacă este cazul.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Observații <span className="text-gray-400 dark:text-slate-500 font-normal">(opțional)</span>
          </label>
          <textarea
            value={formData.observatii}
            onChange={(e) => handleChange("observatii", e.target.value)}
            placeholder="Alte informații relevante..."
            rows={2}
            className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none"
          />
        </div>
      </Section>

      <Section title="Detalii document">
        <DateField label="Data cererii" name="data" value={formData.data} onChange={handleChange} required />
        <Field label="Locul" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: București" required />
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Cerere de Concediu de Odihnă</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">PDF gata de semnat și depus</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">10 lei</p>
            <p className="text-xs text-gray-400 dark:text-slate-500">plată unică</p>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-base">
          {loading ? "Se procesează..." : "Continuă spre plată →"}
        </button>
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-3">
          Plată securizată prin Stripe · PDF disponibil instant după plată
        </p>
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-2">
          Prin continuare confirmi livrarea imediată și renunți la dreptul de retragere de 14 zile (OG 34/2014 art. 16).
        </p>
      </div>
    </form>
  );
}
