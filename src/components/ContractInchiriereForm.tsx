"use client";

import { useState } from "react";
import { ContractInchiriereData } from "@/lib/types";
import { validateCNP, validateCI, validatePret, validateDate } from "@/lib/validation";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ContractInchiriereData = {
  locatorNume: "", locatorCNP: "", locatorCI: "", locatorAdresa: "", locatorIBAN: "",
  locatarNume: "", locatarCNP: "", locatarCI: "", locatarAdresa: "",
  proprietateAdresa: "", proprietateTip: "apartament", proprietateSuprafata: "",
  chiria: "", moneda: "RON", modalitataPlata: "transfer bancar",
  garantie: "", dataIncepere: "", durataLuni: "12",
  indexareAnuala: false, procentIndexare: "",
  data: today, locul: "",
};

const testData: ContractInchiriereData = {
  locatorNume: "Popescu Ion", locatorCNP: "1850315120003", locatorCI: "AB 123456",
  locatorAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  locatorIBAN: "RO49 AAAA 1B31 0075 9384 0000",
  locatarNume: "Ionescu Maria", locatarCNP: "2920520400005", locatarCI: "CJ 654321",
  locatarAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  proprietateAdresa: "Str. Dorobanților nr. 25, ap. 4, Cluj-Napoca, Cluj",
  proprietateTip: "apartament", proprietateSuprafata: "65",
  chiria: "2500", moneda: "RON", modalitataPlata: "transfer bancar",
  garantie: "2", dataIncepere: "01.04.2026", durataLuni: "12",
  indexareAnuala: false, procentIndexare: "",
  data: today, locul: "Cluj-Napoca",
};

function Field({
  label, name, value, onChange, placeholder, required, type = "text", error, onBlur,
}: {
  label: string; name: keyof ContractInchiriereData; value: string;
  onChange: (name: keyof ContractInchiriereData, value: string) => void;
  placeholder?: string; required?: boolean; type?: string; error?: string; onBlur?: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type} value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur} placeholder={placeholder} required={required}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white transition-colors ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 focus:border-blue-400 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: keyof ContractInchiriereData; value: string;
  onChange: (name: keyof ContractInchiriereData, value: string) => void;
  options: { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof ContractInchiriereData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string, value: string) => {
    let fieldError: string | null = null;
    if (name.includes("CNP")) fieldError = validateCNP(value);
    else if (name.includes("CI")) fieldError = validateCI(value);
    setErrors((prev) => ({ ...prev, [name]: fieldError || "" }));
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    const locatorCNPError = validateCNP(formData.locatorCNP);
    if (locatorCNPError) newErrors.locatorCNP = locatorCNPError;
    const locatarCNPError = validateCNP(formData.locatarCNP);
    if (locatarCNPError) newErrors.locatarCNP = locatarCNPError;
    const locatorCIError = validateCI(formData.locatorCI);
    if (locatorCIError) newErrors.locatorCI = locatorCIError;
    const locatarCIError = validateCI(formData.locatarCI);
    if (locatarCIError) newErrors.locatarCI = locatarCIError;
    const chiriaError = validatePret(formData.chiria);
    if (chiriaError) newErrors.chiria = chiriaError;
    const dataIncepereError = validateDate(formData.dataIncepere);
    if (dataIncepereError) newErrors.dataIncepere = dataIncepereError;
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!validateAll()) { setLoading(false); return; }
    sessionStorage.setItem("contractInchiriereData", JSON.stringify(formData));
    window.location.href = "/documente/contract-inchiriere/success?session_id=test";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-orange-50 border border-dashed border-orange-200 rounded-xl p-3 flex items-center justify-between">
        <p className="text-xs text-orange-600 font-medium">Mod testare</p>
        <button type="button" onClick={() => { setFormData(testData); setErrors({}); }}
          className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-3 py-1.5 rounded-lg transition-colors">
          Completează automat
        </button>
      </div>

      {/* Locator */}
      <Section title="Locator (Proprietar)">
        <Field label="Nume și prenume" name="locatorNume" value={formData.locatorNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        <Field label="CNP" name="locatorCNP" value={formData.locatorCNP} onChange={handleChange} placeholder="1234567890123" required error={errors.locatorCNP} onBlur={() => handleBlur("locatorCNP", formData.locatorCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="locatorCI" value={formData.locatorCI} onChange={handleChange} placeholder="ex: AB 123456" error={errors.locatorCI} onBlur={() => handleBlur("locatorCI", formData.locatorCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="locatorAdresa" value={formData.locatorAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
        <div className="sm:col-span-2">
          <Field label="IBAN locator (opțional, recomandat pentru transfer bancar)" name="locatorIBAN" value={formData.locatorIBAN} onChange={handleChange} placeholder="ex: RO49 AAAA 1B31 0075 9384 0000" />
        </div>
      </Section>

      {/* Locatar */}
      <Section title="Locatar (Chiriaș)">
        <Field label="Nume și prenume" name="locatarNume" value={formData.locatarNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
        <Field label="CNP" name="locatarCNP" value={formData.locatarCNP} onChange={handleChange} placeholder="2345678901234" required error={errors.locatarCNP} onBlur={() => handleBlur("locatarCNP", formData.locatarCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="locatarCI" value={formData.locatarCI} onChange={handleChange} placeholder="ex: CJ 654321" error={errors.locatarCI} onBlur={() => handleBlur("locatarCI", formData.locatarCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="locatarAdresa" value={formData.locatarAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, București, Ilfov" required />
        </div>
      </Section>

      {/* Proprietate */}
      <Section title="Proprietatea Închiriată">
        <div className="sm:col-span-2">
          <Field label="Adresa proprietății" name="proprietateAdresa" value={formData.proprietateAdresa} onChange={handleChange} placeholder="Str. Victoriei nr. 10, ap. 5, Cluj-Napoca, Cluj" required />
        </div>
        <SelectField label="Tip proprietate" name="proprietateTip" value={formData.proprietateTip} onChange={handleChange} options={[
          { value: "apartament", label: "Apartament" },
          { value: "garsoniera", label: "Garsonieră" },
          { value: "casa", label: "Casă" },
          { value: "spatiu comercial", label: "Spațiu comercial" },
          { value: "birou", label: "Birou" },
        ]} required />
        <Field label="Suprafață (mp, opțional)" name="proprietateSuprafata" value={formData.proprietateSuprafata} onChange={handleChange} placeholder="ex: 65" />
      </Section>

      {/* Financiar */}
      <Section title="Chirie și Condiții Financiare">
        <Field label="Chirie lunară" name="chiria" value={formData.chiria} onChange={handleChange} placeholder="ex: 2500" required type="number" error={errors.chiria} />
        <SelectField label="Moneda" name="moneda" value={formData.moneda} onChange={handleChange} options={[
          { value: "RON", label: "RON" }, { value: "EUR", label: "EUR" },
        ]} />
        <SelectField label="Modalitate plată" name="modalitataPlata" value={formData.modalitataPlata} onChange={handleChange} options={[
          { value: "transfer bancar", label: "Transfer bancar" },
          { value: "numerar", label: "Numerar" },
        ]} />
        <Field label="Garanție (nr. chirii, opțional)" name="garantie" value={formData.garantie} onChange={handleChange} placeholder="ex: 2" />

        {/* Indexare anuală */}
        <div className="sm:col-span-2 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox" checked={formData.indexareAnuala}
              onChange={(e) => setFormData((prev) => ({ ...prev, indexareAnuala: e.target.checked }))}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">Indexare anuală a chiriei</p>
              <p className="text-xs text-gray-400 mt-0.5">Chiria crește anual cu un procent fix</p>
            </div>
          </label>
          {formData.indexareAnuala && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Procent indexare (%)</label>
              <input
                type="number" value={formData.procentIndexare}
                onChange={(e) => handleChange("procentIndexare", e.target.value)}
                placeholder="ex: 5" min="0" max="100"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
              />
            </div>
          )}
        </div>
      </Section>

      {/* Durată */}
      <Section title="Durată și Detalii Contract">
        <Field label="Data începerii" name="dataIncepere" value={formData.dataIncepere} onChange={handleChange} placeholder="ex: 01.04.2026" required error={errors.dataIncepere} />
        <SelectField label="Durata (luni)" name="durataLuni" value={formData.durataLuni} onChange={handleChange} options={[
          { value: "6", label: "6 luni" }, { value: "12", label: "12 luni (1 an)" },
          { value: "24", label: "24 luni (2 ani)" }, { value: "36", label: "36 luni (3 ani)" },
        ]} />
        <Field label="Data contractului" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <Field label="Locul încheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
      </Section>

      {/* Disclaimer ANAF */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Atenție:</span> Contractele de închiriere trebuie înregistrate
          la ANAF în termen de 30 de zile de la semnare.
        </p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Contract de Închiriere</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">25 lei</p>
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
      </div>
    </form>
  );
}
