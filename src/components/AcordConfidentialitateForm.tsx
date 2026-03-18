"use client";

import { useState } from "react";
import { AcordConfidentialitateData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: AcordConfidentialitateData = {
  parte1Nume: "",
  parte1Calitate: "Persoana fizica",
  parte1Adresa: "",
  parte2Nume: "",
  parte2Calitate: "Persoana fizica",
  parte2Adresa: "",
  obiectConfidentialitate: "",
  durataAni: "2",
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required,
}: {
  label: string;
  name: keyof AcordConfidentialitateData;
  value: string;
  onChange: (name: keyof AcordConfidentialitateData, value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
      />
    </div>
  );
}

function CalitateSelect({
  label, name, value, onChange,
}: {
  label: string;
  name: keyof AcordConfidentialitateData;
  value: string;
  onChange: (name: keyof AcordConfidentialitateData, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
      >
        <option value="Persoana fizica">Persoana fizica</option>
        <option value="Persoana juridica">Persoana juridica</option>
      </select>
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

export default function AcordConfidentialitateForm() {
  const [formData, setFormData] = useState<AcordConfidentialitateData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: keyof AcordConfidentialitateData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    sessionStorage.setItem("acordNDAData", JSON.stringify(formData));
    window.location.href = "/documente/acord-confidentialitate/success?session_id=test";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Partea 1 */}
      <Section title="Partea 1">
        <Field label="Nume / Denumire firma" name="parte1Nume" value={formData.parte1Nume} onChange={handleChange} placeholder="ex: Popescu Ion / SC Exemplu SRL" required />
        <CalitateSelect label="Calitate" name="parte1Calitate" value={formData.parte1Calitate} onChange={handleChange} />
        <div className="sm:col-span-2">
          <Field label="Adresa / Sediu social" name="parte1Adresa" value={formData.parte1Adresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
      </Section>

      {/* Partea 2 */}
      <Section title="Partea 2">
        <Field label="Nume / Denumire firma" name="parte2Nume" value={formData.parte2Nume} onChange={handleChange} placeholder="ex: Ionescu Maria / SC Alt SRL" required />
        <CalitateSelect label="Calitate" name="parte2Calitate" value={formData.parte2Calitate} onChange={handleChange} />
        <div className="sm:col-span-2">
          <Field label="Adresa / Sediu social" name="parte2Adresa" value={formData.parte2Adresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, Bucuresti, Ilfov" required />
        </div>
      </Section>

      {/* Detalii */}
      <Section title="Informatii Confidentiale si Durata">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrierea informatiilor confidentiale <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.obiectConfidentialitate}
            onChange={(e) => handleChange("obiectConfidentialitate", e.target.value)}
            placeholder="ex: Informatii tehnice, financiare, comerciale, planuri de afaceri, date despre clienti, coduri sursa si orice alte informatii marcate ca confidentiale de catre partile divulgatoare."
            required
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durata acordului <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.durataAni}
            onChange={(e) => handleChange("durataAni", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          >
            <option value="1">1 an</option>
            <option value="2">2 ani</option>
            <option value="3">3 ani</option>
            <option value="5">5 ani</option>
            <option value="10">10 ani</option>
          </select>
        </div>
        <Field label="Data acordului" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <div className="sm:col-span-2">
          <Field label="Locul incheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
        </div>
      </Section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Acord de Confidentialitate (NDA)</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">20 lei</p>
            <p className="text-xs text-gray-400">plata unica</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-base"
        >
          {loading ? "Se proceseaza..." : "Continua spre plata →"}
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Plata securizata prin Stripe · PDF disponibil instant dupa plata
        </p>
      </div>
    </form>
  );
}
