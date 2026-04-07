"use client";

import { useState, useEffect } from "react";
import { CerereDemisieData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: CerereDemisieData = {
  angajatNume: "",
  angajatFunctia: "",
  angajatorNume: "",
  preavizZile: "20",
  dataUltimaZi: "",
  motivDemisie: "",
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required,
}: {
  label: string; name: keyof CerereDemisieData; value: string;
  onChange: (name: keyof CerereDemisieData, value: string) => void;
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
  label: string; name: keyof CerereDemisieData; value: string;
  onChange: (name: keyof CerereDemisieData, value: string) => void;
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

function addWorkingDays(startRo: string, days: number): string {
  const [d, m, y] = startRo.split(".");
  const date = new Date(`${y}-${m}-${d}`);
  if (isNaN(date.getTime()) || days <= 0) return "";
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = date.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

export default function CerereDemisieForm() {
  const [formData, setFormData] = useState<CerereDemisieData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoCalculat, setAutoCalculat] = useState(false);

  const handleChange = (name: keyof CerereDemisieData, value: string) => {
    if (name === "dataUltimaZi") setAutoCalculat(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { data, preavizZile } = formData;
    if (!data || !preavizZile) return;
    const zile = Number(preavizZile);
    if (isNaN(zile) || zile <= 0) return;
    const rezultat = addWorkingDays(data, zile);
    if (rezultat) {
      setFormData((prev) => ({ ...prev, dataUltimaZi: rezultat }));
      setAutoCalculat(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.data, formData.preavizZile]);

  const validate = () => {
    if (!formData.angajatNume.trim()) return "Numele angajatului este obligatoriu.";
    if (!formData.angajatFunctia.trim()) return "Funcția este obligatorie.";
    if (!formData.angajatorNume.trim()) return "Numele angajatorului este obligatoriu.";
    if (!formData.preavizZile.trim() || isNaN(Number(formData.preavizZile)) || Number(formData.preavizZile) < 0)
      return "Perioada de preaviz trebuie să fie un număr valid.";
    if (!formData.dataUltimaZi) return "Data ultimei zile de muncă este obligatorie.";
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
    localStorage.setItem("cerereDemisieData", JSON.stringify(formData));
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "cerere-demisie" }),
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
      <Section title="Date angajat">
        <div className="sm:col-span-2">
          <Field label="Numele complet al angajatului" name="angajatNume" value={formData.angajatNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        </div>
        <Field label="Funcția / Postul" name="angajatFunctia" value={formData.angajatFunctia} onChange={handleChange} placeholder="ex: Programator" required />
        <Field label="Numele angajatorului (firma)" name="angajatorNume" value={formData.angajatorNume} onChange={handleChange} placeholder="ex: SC Exemplu SRL" required />
      </Section>

      <Section title="Detalii demisie">
        <Field
          label="Perioada de preaviz (zile)"
          name="preavizZile"
          value={formData.preavizZile}
          onChange={handleChange}
          placeholder="ex: 20"
          required
        />
        <div>
          <DateField label="Data ultimei zile de muncă" name="dataUltimaZi" value={formData.dataUltimaZi} onChange={handleChange} required />
          {autoCalculat && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 leading-snug">
              Calculat automat: data cererii + {formData.preavizZile} zile lucrătoare (L–V). Verifică dacă perioada include sărbători legale.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            Motivul demisiei <span className="text-gray-400 dark:text-slate-500 font-normal">(opțional)</span>
          </label>
          <textarea
            value={formData.motivDemisie}
            onChange={(e) => handleChange("motivDemisie", e.target.value)}
            placeholder="Motive personale / profesionale / altele..."
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
            <p className="font-semibold text-gray-900 dark:text-white">Cerere de Demisie</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">PDF conform Codului Muncii</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">15 lei</p>
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
