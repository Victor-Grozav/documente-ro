"use client";

import { useState } from "react";
import { AdeverintaSalariatData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: AdeverintaSalariatData = {
  angajatorNume: "",
  angajatorCUI: "",
  angajatorAdresa: "",
  angajatorReprezentant: "",
  angajatNume: "",
  angajatCNP: "",
  angajatFunctia: "",
  departament: "",
  dataAngajarii: "",
  includeSalariu: false,
  salariu: "",
  scopAdeverinta: "bancă",
  numarAdeverinta: "",
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required,
}: {
  label: string; name: keyof AdeverintaSalariatData; value: string;
  onChange: (name: keyof AdeverintaSalariatData, value: string) => void;
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
  label: string; name: keyof AdeverintaSalariatData; value: string;
  onChange: (name: keyof AdeverintaSalariatData, value: string) => void;
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

const SCOPURI = [
  "bancă",
  "credit / împrumut",
  "viză / ambasadă",
  "chirie",
  "dosar personal",
  "altul",
];

export default function AdeverintaSalariatForm() {
  const [formData, setFormData] = useState<AdeverintaSalariatData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: keyof AdeverintaSalariatData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBoolChange = (name: keyof AdeverintaSalariatData, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.angajatorNume.trim()) return "Numele angajatorului este obligatoriu.";
    if (!formData.angajatorReprezentant.trim()) return "Reprezentantul angajatorului este obligatoriu.";
    if (!formData.angajatNume.trim()) return "Numele angajatului este obligatoriu.";
    if (!formData.angajatFunctia.trim()) return "Funcția angajatului este obligatorie.";
    if (!formData.dataAngajarii) return "Data angajării este obligatorie.";
    if (formData.includeSalariu && (!formData.salariu.trim() || isNaN(Number(formData.salariu))))
      return "Introduceți un salariu valid.";
    if (!formData.data) return "Data adeverinței este obligatorie.";
    if (!formData.locul.trim()) return "Locul este obligatoriu.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    localStorage.setItem("adeverintaSalariatData", JSON.stringify(formData));
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "adeverinta-salariat" }),
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
      <Section title="Date angajator (emitent)">
        <div className="sm:col-span-2">
          <Field label="Denumirea societății / firmei" name="angajatorNume" value={formData.angajatorNume} onChange={handleChange} placeholder="ex: SC Exemplu SRL" required />
        </div>
        <Field label="CUI / CIF" name="angajatorCUI" value={formData.angajatorCUI} onChange={handleChange} placeholder="ex: RO12345678" />
        <Field label="Adresa sediului" name="angajatorAdresa" value={formData.angajatorAdresa} onChange={handleChange} placeholder="ex: Str. Victoriei nr. 1, Cluj-Napoca" />
        <div className="sm:col-span-2">
          <Field label="Reprezentant / Administrator" name="angajatorReprezentant" value={formData.angajatorReprezentant} onChange={handleChange} placeholder="ex: Popescu Ion, Director General" required />
        </div>
      </Section>

      <Section title="Date angajat">
        <div className="sm:col-span-2">
          <Field label="Numele complet al angajatului" name="angajatNume" value={formData.angajatNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
        </div>
        <Field label="CNP" name="angajatCNP" value={formData.angajatCNP} onChange={handleChange} placeholder="ex: 2920520400005" />
        <Field label="Funcția / Postul" name="angajatFunctia" value={formData.angajatFunctia} onChange={handleChange} placeholder="ex: Contabil" required />
        <Field label="Departament" name="departament" value={formData.departament} onChange={handleChange} placeholder="ex: Financiar" />
        <DateField label="Data angajării" name="dataAngajarii" value={formData.dataAngajarii} onChange={handleChange} required />
      </Section>

      <Section title="Salariu și scop">
        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.includeSalariu}
              onChange={(e) => handleBoolChange("includeSalariu", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300">Include salariul în adeverință</span>
          </label>
        </div>
        {formData.includeSalariu && (
          <Field label="Salariul net (RON)" name="salariu" value={formData.salariu} onChange={handleChange} placeholder="ex: 4500" />
        )}
        <div className={formData.includeSalariu ? "" : "sm:col-span-2"}>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Scopul adeverinței <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.scopAdeverinta}
            onChange={(e) => handleChange("scopAdeverinta", e.target.value)}
            className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white dark:bg-slate-800"
          >
            {SCOPURI.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <Field label="Număr adeverință" name="numarAdeverinta" value={formData.numarAdeverinta} onChange={handleChange} placeholder="ex: 123/2026 (opțional)" />
      </Section>

      <Section title="Detalii document">
        <DateField label="Data emiterii" name="data" value={formData.data} onChange={handleChange} required />
        <Field label="Locul" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Adeverință de Salariat</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">PDF cu ștampilă și semnătură</p>
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
