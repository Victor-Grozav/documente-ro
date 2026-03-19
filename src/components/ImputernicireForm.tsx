"use client";

import { useState } from "react";
import { ImputernicireData } from "@/lib/types";
import { validateCNP, validateCI, validateFutureDate } from "@/lib/validation";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ImputernicireData = {
  mandantNume: "", mandantCNP: "", mandantCI: "", mandantAdresa: "",
  mandatarNume: "", mandatarCNP: "", mandatarCI: "", mandatarAdresa: "",
  mandatarContact: "", obiect: "", poateDelegaTert: false,
  dataExpirare: "", data: today, locul: "",
};

const testData: ImputernicireData = {
  mandantNume: "Popescu Ion", mandantCNP: "1850315120003", mandantCI: "AB 123456",
  mandantAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  mandatarNume: "Ionescu Maria", mandatarCNP: "2920520400005", mandatarCI: "CJ 654321",
  mandatarAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  mandatarContact: "0722 123 456 / ionescu.maria@email.ro",
  obiect: "Să-l reprezinte pe Mandant în fața ANAF pentru depunerea declarației de venit pe anul 2025 și semnarea oricăror documente necesare în numele Mandantului în acest scop.",
  poateDelegaTert: false,
  dataExpirare: "31.12.2026", data: today, locul: "Cluj-Napoca",
};

function Field({
  label, name, value, onChange, placeholder, required, type = "text", error, onBlur,
}: {
  label: string; name: keyof ImputernicireData; value: string;
  onChange: (name: keyof ImputernicireData, value: string) => void;
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function ImputernicireForm() {
  const [formData, setFormData] = useState<ImputernicireData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof ImputernicireData, value: string) => {
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
    const mandantCNPError = validateCNP(formData.mandantCNP);
    if (mandantCNPError) newErrors.mandantCNP = mandantCNPError;
    const mandatarCNPError = validateCNP(formData.mandatarCNP);
    if (mandatarCNPError) newErrors.mandatarCNP = mandatarCNPError;
    const mandantCIError = validateCI(formData.mandantCI);
    if (mandantCIError) newErrors.mandantCI = mandantCIError;
    const mandatarCIError = validateCI(formData.mandatarCI);
    if (mandatarCIError) newErrors.mandatarCI = mandatarCIError;
    const dataExpirareError = validateFutureDate(formData.dataExpirare);
    if (dataExpirareError) newErrors.dataExpirare = dataExpirareError;
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!validateAll()) { setLoading(false); return; }
    sessionStorage.setItem("imputernicireData", JSON.stringify(formData));
    window.location.href = "/documente/imputernicire/success?session_id=test";
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

      {/* Mandant */}
      <Section title="Mandant (cel care împuternicește)">
        <Field label="Nume și prenume" name="mandantNume" value={formData.mandantNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        <Field label="CNP" name="mandantCNP" value={formData.mandantCNP} onChange={handleChange} placeholder="1234567890123" required error={errors.mandantCNP} onBlur={() => handleBlur("mandantCNP", formData.mandantCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="mandantCI" value={formData.mandantCI} onChange={handleChange} placeholder="ex: AB 123456" error={errors.mandantCI} onBlur={() => handleBlur("mandantCI", formData.mandantCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="mandantAdresa" value={formData.mandantAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
      </Section>

      {/* Mandatar */}
      <Section title="Mandatar (împuternicitul)">
        <Field label="Nume și prenume" name="mandatarNume" value={formData.mandatarNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
        <Field label="CNP" name="mandatarCNP" value={formData.mandatarCNP} onChange={handleChange} placeholder="2345678901234" required error={errors.mandatarCNP} onBlur={() => handleBlur("mandatarCNP", formData.mandatarCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="mandatarCI" value={formData.mandatarCI} onChange={handleChange} placeholder="ex: CJ 654321" error={errors.mandatarCI} onBlur={() => handleBlur("mandatarCI", formData.mandatarCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="mandatarAdresa" value={formData.mandatarAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, București, Ilfov" required />
        </div>
        <div className="sm:col-span-2">
          <Field label="Telefon / email mandatar (opțional)" name="mandatarContact" value={formData.mandatarContact} onChange={handleChange} placeholder="ex: 0722 123 456 / email@exemplu.ro" />
        </div>
      </Section>

      {/* Obiect și detalii */}
      <Section title="Obiect și Detalii">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Obiectul împuternicirii <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.obiect}
            onChange={(e) => handleChange("obiect", e.target.value)}
            placeholder="ex: Să mă reprezinte în fața ANAF pentru depunerea declarației de venit pe anul 2025, să semneze orice documente necesare în acest scop."
            required rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white resize-none"
          />
        </div>

        {/* Checkbox delegare */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.poateDelegaTert}
              onChange={(e) => setFormData((prev) => ({ ...prev, poateDelegaTert: e.target.checked }))}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">Drept de substituire</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Mandatarul poate delega unui terț (art. 2023 Cod Civil)
              </p>
            </div>
          </label>
        </div>

        <Field label="Valabilă până la" name="dataExpirare" value={formData.dataExpirare} onChange={handleChange} placeholder="ex: 31.12.2026" required error={errors.dataExpirare} />
        <Field label="Data împuternicirii" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <div className="sm:col-span-2">
          <Field label="Locul încheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
        </div>
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Împuternicire / Procură</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">15 lei</p>
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
