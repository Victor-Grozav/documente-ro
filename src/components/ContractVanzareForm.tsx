"use client";

import { useState } from "react";
import { ContractVanzareData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ContractVanzareData = {
  vanzatorNume: "",
  vanzatorCNP: "",
  vanzatorCI: "",
  vanzatorAdresa: "",
  cumparatorNume: "",
  cumparatorCNP: "",
  cumparatorCI: "",
  cumparatorAdresa: "",
  bunDescriere: "",
  bunSerie: "",
  pret: "",
  moneda: "RON",
  modalitataPlata: "numerar",
  locPredare: "",
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
      {/* Vânzător */}
      <Section title="Vânzător">
        <Field
          label="Nume și prenume"
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
        <Field
          label="Serie și nr. CI (opțional)"
          name="vanzatorCI"
          value={formData.vanzatorCI}
          onChange={handleChange}
          placeholder="ex: AB 123456"
        />
        <div className="sm:col-span-2">
          <Field
            label="Adresă domiciliu"
            name="vanzatorAdresa"
            value={formData.vanzatorAdresa}
            onChange={handleChange}
            placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj"
            required
          />
        </div>
      </Section>

      {/* Cumpărător */}
      <Section title="Cumpărător">
        <Field
          label="Nume și prenume"
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
        <Field
          label="Serie și nr. CI (opțional)"
          name="cumparatorCI"
          value={formData.cumparatorCI}
          onChange={handleChange}
          placeholder="ex: CJ 654321"
        />
        <div className="sm:col-span-2">
          <Field
            label="Adresă domiciliu"
            name="cumparatorAdresa"
            value={formData.cumparatorAdresa}
            onChange={handleChange}
            placeholder="Str. Exemplu nr. 2, București, Ilfov"
            required
          />
        </div>
      </Section>

      {/* Bunul vândut */}
      <Section title="Bunul Vândut">
        <div className="sm:col-span-2">
          <Field
            label="Descriere bun"
            name="bunDescriere"
            value={formData.bunDescriere}
            onChange={handleChange}
            placeholder="ex: Autoturism marca Dacia Logan, an fabricație 2018, culoare albă"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Serie / Număr identificare (opțional)"
            name="bunSerie"
            value={formData.bunSerie}
            onChange={handleChange}
            placeholder="ex: VIN: ROJFA1GE7J0123456 sau Serie: ABC123"
          />
        </div>
      </Section>

      {/* Preț și detalii */}
      <Section title="Preț și Detalii Contract">
        <Field
          label="Preț"
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modalitate plată <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.modalitataPlata}
            onChange={(e) => handleChange("modalitataPlata", e.target.value as ContractVanzareData["modalitataPlata"])}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          >
            <option value="numerar">Numerar</option>
            <option value="transfer bancar">Transfer bancar</option>
            <option value="alta modalitate">Altă modalitate</option>
          </select>
        </div>
        <Field
          label="Locul predării bunului"
          name="locPredare"
          value={formData.locPredare}
          onChange={handleChange}
          placeholder="ex: Cluj-Napoca, str. Exemplu nr. 1"
          required
        />
        <Field
          label="Data contractului"
          name="data"
          value={formData.data}
          onChange={handleChange}
          placeholder="16.03.2026"
          required
        />
        <Field
          label="Locul încheierii"
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
            <p className="font-semibold text-gray-900">Contract de Vânzare-Cumpărare</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">10 lei</p>
            <p className="text-xs text-gray-400">plată unică</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-base"
        >
          {loading ? "Se procesează..." : "Continuă spre plată →"}
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Plată securizată prin Stripe · PDF disponibil instant după plată
        </p>
      </div>
    </form>
  );
}
