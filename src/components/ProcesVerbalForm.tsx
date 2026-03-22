"use client";

import { useState } from "react";
import { ProcesVerbalData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ProcesVerbalData = {
  locatorNume: "",
  locatarNume: "",
  proprietateAdresa: "",
  dataContract: "",
  stareGenerala: "",
  data: today,
  locul: "",
};

const testData: ProcesVerbalData = {
  locatorNume: "Popescu Ion",
  locatarNume: "Ionescu Maria",
  proprietateAdresa: "Str. Dorobanților nr. 25, ap. 4, Cluj-Napoca, Cluj",
  dataContract: "01.04.2026",
  stareGenerala: "Bună",
  data: today,
  locul: "Cluj-Napoca",
};

function Field({
  label, name, value, onChange, placeholder, required,
}: {
  label: string; name: keyof ProcesVerbalData; value: string;
  onChange: (name: keyof ProcesVerbalData, value: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text" value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 bg-white"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function ProcesVerbalForm() {
  const [formData, setFormData] = useState<ProcesVerbalData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: keyof ProcesVerbalData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "proces-verbal-predare" }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Eroare la inițializarea plății");
      localStorage.setItem("procesVerbalData", JSON.stringify(formData));
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare neașteptată");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-orange-50 border border-dashed border-orange-200 rounded-xl p-3 flex items-center justify-between">
        <p className="text-xs text-orange-600 font-medium">Mod testare</p>
        <button type="button" onClick={() => setFormData(testData)}
          className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-3 py-1.5 rounded-lg transition-colors">
          Completează automat
        </button>
      </div>

      <Section title="Părțile">
        <Field label="Locator (proprietar)" name="locatorNume" value={formData.locatorNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        <Field label="Locatar (chiriaș)" name="locatarNume" value={formData.locatarNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
      </Section>

      <Section title="Proprietatea">
        <div className="sm:col-span-2">
          <Field label="Adresa proprietății" name="proprietateAdresa" value={formData.proprietateAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, ap. 2, Cluj-Napoca, Cluj" required />
        </div>
        <Field label="Data contractului de închiriere" name="dataContract" value={formData.dataContract} onChange={handleChange} placeholder="ex: 01.04.2026" required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stare generală <span className="text-gray-400 font-normal">(opțional)</span>
          </label>
          <select
            value={formData.stareGenerala}
            onChange={(e) => handleChange("stareGenerala", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          >
            <option value="">— Selectează —</option>
            <option value="Foarte bună">Foarte bună</option>
            <option value="Bună">Bună</option>
            <option value="Satisfăcătoare">Satisfăcătoare</option>
            <option value="Necesită reparații">Necesită reparații</option>
          </select>
        </div>
      </Section>

      <Section title="Detalii Document">
        <Field label="Data predării" name="data" value={formData.data} onChange={handleChange} placeholder="ex: 01.04.2026" required />
        <Field label="Locul predării" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Proces Verbal de Predare-Primire</p>
            <p className="text-sm text-gray-500">PDF cu spații pentru contoare și bunuri</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">10 lei</p>
            <p className="text-xs text-gray-400">plată unică</p>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-base">
          {loading ? "Se procesează..." : "Continuă spre plată →"}
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Plată securizată prin Stripe · PDF disponibil instant după plată
        </p>
        <p className="text-xs text-gray-400 text-center mt-2">
          Prin continuare confirmi livrarea imediată și renunți la dreptul de retragere de 14 zile (OG 34/2014 art. 16).
        </p>
      </div>
    </form>
  );
}
