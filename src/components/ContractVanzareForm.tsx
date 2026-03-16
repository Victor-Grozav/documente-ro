"use client";

import { useState } from "react";
import { ContractVanzareData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ContractVanzareData = {
  vanzatorNume: "",
  vanzatorCNP: "",
  vanzatorAdresa: "",
  cumparatorNume: "",
  cumparatorCNP: "",
  cumparatorAdresa: "",
  bunDescriere: "",
  bunSerie: "",
  pret: "",
  moneda: "RON",
  data: today,
  locul: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: keyof ContractVanzareData;
  value: string;
  onChange: (name: keyof ContractVanzareData, value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function ContractVanzareForm() {
  const [formData, setFormData] = useState<ContractVanzareData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: keyof ContractVanzareData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // TEST MODE: sarim peste plata, mergem direct la download
    sessionStorage.setItem("contractData", JSON.stringify(formData));
    window.location.href = "/documente/contract-vanzare-cumparare/success?session_id=test";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Vanzator */}
      <Section title="Vanzator">
        <Field
          label="Nume si prenume"
          name="vanzatorNume"
          value={formData.vanzatorNume}
          onChange={handleChange}
          placeholder="ex: Popescu Ion"
          required
        />
        <Field
          label="CNP"
          name="vanzatorCNP"
          value={formData.vanzatorCNP}
          onChange={handleChange}
          placeholder="1234567890123"
          required
        />
        <div className="sm:col-span-2">
          <Field
            label="Adresa domiciliu"
            name="vanzatorAdresa"
            value={formData.vanzatorAdresa}
            onChange={handleChange}
            placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj"
            required
          />
        </div>
      </Section>

      {/* Cumparator */}
      <Section title="Cumparator">
        <Field
          label="Nume si prenume"
          name="cumparatorNume"
          value={formData.cumparatorNume}
          onChange={handleChange}
          placeholder="ex: Ionescu Maria"
          required
        />
        <Field
          label="CNP"
          name="cumparatorCNP"
          value={formData.cumparatorCNP}
          onChange={handleChange}
          placeholder="2345678901234"
          required
        />
        <div className="sm:col-span-2">
          <Field
            label="Adresa domiciliu"
            name="cumparatorAdresa"
            value={formData.cumparatorAdresa}
            onChange={handleChange}
            placeholder="Str. Exemplu nr. 2, Bucuresti, Ilfov"
            required
          />
        </div>
      </Section>

      {/* Bunul vandut */}
      <Section title="Bunul Vandut">
        <div className="sm:col-span-2">
          <Field
            label="Descriere bun"
            name="bunDescriere"
            value={formData.bunDescriere}
            onChange={handleChange}
            placeholder="ex: Autoturism marca Dacia Logan, an fabricatie 2018, culoare alba"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Serie / Numar identificare (optional)"
            name="bunSerie"
            value={formData.bunSerie}
            onChange={handleChange}
            placeholder="ex: VIN: ROJFA1GE7J0123456 sau Serie: ABC123"
          />
        </div>
      </Section>

      {/* Pret si detalii */}
      <Section title="Pret si Detalii Contract">
        <Field
          label="Pret"
          name="pret"
          value={formData.pret}
          onChange={handleChange}
          placeholder="5000"
          required
          type="number"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moneda <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.moneda}
            onChange={(e) => handleChange("moneda", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          >
            <option value="RON">RON</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <Field
          label="Data contractului"
          name="data"
          value={formData.data}
          onChange={handleChange}
          placeholder="16.03.2026"
          required
        />
        <Field
          label="Locul incheierii"
          name="locul"
          value={formData.locul}
          onChange={handleChange}
          placeholder="ex: Cluj-Napoca"
          required
        />
      </Section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Contract de Vanzare-Cumparare</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">$1</p>
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
