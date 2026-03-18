"use client";

import { useState } from "react";
import { ContractInchiriereData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ContractInchiriereData = {
  locatorNume: "",
  locatorCNP: "",
  locatorCI: "",
  locatorAdresa: "",
  locatarNume: "",
  locatarCNP: "",
  locatarCI: "",
  locatarAdresa: "",
  proprietateAdresa: "",
  proprietateTip: "apartament",
  proprietateSuprafata: "",
  chiria: "",
  moneda: "RON",
  modalitataPlata: "transfer bancar",
  garantie: "",
  dataIncepere: "",
  durataLuni: "12",
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required, type = "text",
}: {
  label: string;
  name: keyof ContractInchiriereData;
  value: string;
  onChange: (name: keyof ContractInchiriereData, value: string) => void;
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

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string;
  name: keyof ContractInchiriereData;
  value: string;
  onChange: (name: keyof ContractInchiriereData, value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
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

export default function ContractInchiriereForm() {
  const [formData, setFormData] = useState<ContractInchiriereData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name: keyof ContractInchiriereData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    sessionStorage.setItem("contractInchiriereData", JSON.stringify(formData));
    window.location.href = "/documente/contract-inchiriere/success?session_id=test";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Locator */}
      <Section title="Locator (Proprietar)">
        <Field label="Nume si prenume" name="locatorNume" value={formData.locatorNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        <Field label="CNP" name="locatorCNP" value={formData.locatorCNP} onChange={handleChange} placeholder="1234567890123" required />
        <Field label="Serie si nr. CI (optional)" name="locatorCI" value={formData.locatorCI} onChange={handleChange} placeholder="ex: AB 123456" />
        <div className="sm:col-span-2">
          <Field label="Adresa domiciliu" name="locatorAdresa" value={formData.locatorAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
      </Section>

      {/* Locatar */}
      <Section title="Locatar (Chirias)">
        <Field label="Nume si prenume" name="locatarNume" value={formData.locatarNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
        <Field label="CNP" name="locatarCNP" value={formData.locatarCNP} onChange={handleChange} placeholder="2345678901234" required />
        <Field label="Serie si nr. CI (optional)" name="locatarCI" value={formData.locatarCI} onChange={handleChange} placeholder="ex: CJ 654321" />
        <div className="sm:col-span-2">
          <Field label="Adresa domiciliu" name="locatarAdresa" value={formData.locatarAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, Bucuresti, Ilfov" required />
        </div>
      </Section>

      {/* Proprietate */}
      <Section title="Proprietatea Inchiriata">
        <div className="sm:col-span-2">
          <Field label="Adresa proprietatii" name="proprietateAdresa" value={formData.proprietateAdresa} onChange={handleChange} placeholder="Str. Victoriei nr. 10, ap. 5, Cluj-Napoca, Cluj" required />
        </div>
        <SelectField
          label="Tip proprietate"
          name="proprietateTip"
          value={formData.proprietateTip}
          onChange={handleChange}
          options={[
            { value: "apartament", label: "Apartament" },
            { value: "garsoniera", label: "Garsoniera" },
            { value: "casa", label: "Casa" },
            { value: "spatiu comercial", label: "Spatiu comercial" },
            { value: "birou", label: "Birou" },
          ]}
          required
        />
        <Field label="Suprafata (mp, optional)" name="proprietateSuprafata" value={formData.proprietateSuprafata} onChange={handleChange} placeholder="ex: 65" />
      </Section>

      {/* Financiar */}
      <Section title="Chirie si Conditii Financiare">
        <Field label="Chirie lunara" name="chiria" value={formData.chiria} onChange={handleChange} placeholder="ex: 2500" required type="number" />
        <SelectField
          label="Moneda"
          name="moneda"
          value={formData.moneda}
          onChange={handleChange}
          options={[{ value: "RON", label: "RON" }, { value: "EUR", label: "EUR" }]}
        />
        <SelectField
          label="Modalitate plata"
          name="modalitataPlata"
          value={formData.modalitataPlata}
          onChange={handleChange}
          options={[
            { value: "transfer bancar", label: "Transfer bancar" },
            { value: "numerar", label: "Numerar" },
          ]}
        />
        <Field label="Garantie (nr. chirii, optional)" name="garantie" value={formData.garantie} onChange={handleChange} placeholder="ex: 2" />
      </Section>

      {/* Durata */}
      <Section title="Durata si Detalii Contract">
        <Field label="Data incepere" name="dataIncepere" value={formData.dataIncepere} onChange={handleChange} placeholder="ex: 01.04.2026" required />
        <SelectField
          label="Durata (luni)"
          name="durataLuni"
          value={formData.durataLuni}
          onChange={handleChange}
          options={[
            { value: "6", label: "6 luni" },
            { value: "12", label: "12 luni (1 an)" },
            { value: "24", label: "24 luni (2 ani)" },
            { value: "36", label: "36 luni (3 ani)" },
          ]}
        />
        <Field label="Data contractului" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <Field label="Locul incheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
      </Section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Contract de Inchiriere</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">25 lei</p>
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
