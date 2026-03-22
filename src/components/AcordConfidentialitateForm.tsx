"use client";

import { useState } from "react";
import { AcordConfidentialitateData } from "@/lib/types";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: AcordConfidentialitateData = {
  parte1Nume: "", parte1Calitate: "Persoană fizică", parte1Adresa: "",
  parte2Nume: "", parte2Calitate: "Persoană fizică", parte2Adresa: "",
  obiectConfidentialitate: "", durataAni: "2",
  tipNDA: "bilateral", penalitate: "",
  data: today, locul: "",
};

const testData: AcordConfidentialitateData = {
  parte1Nume: "SC Exemplu Tech SRL", parte1Calitate: "Persoană juridică",
  parte1Adresa: "Str. Inovației nr. 1, Cluj-Napoca, Cluj",
  parte1CUI: "RO12345678", parte1ReprezentantLegal: "Popescu Ion, Administrator",
  parte2Nume: "Ionescu Mihai", parte2Calitate: "Persoană fizică",
  parte2Adresa: "Str. Victoriei nr. 20, București, Sector 2",
  parte2CNP: "1850315120003", parte2CI: "RX 123456",
  obiectConfidentialitate: "Informații tehnice, coduri sursă, date financiare și planuri de afaceri.",
  durataAni: "2", tipNDA: "bilateral", penalitate: "5000",
  data: today, locul: "Cluj-Napoca",
};

function Field({
  label, name, value, onChange, placeholder, required, error,
}: {
  label: string; name: keyof AcordConfidentialitateData; value: string;
  onChange: (name: keyof AcordConfidentialitateData, value: string) => void;
  placeholder?: string; required?: boolean; error?: string;
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
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white transition-colors ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 focus:border-blue-400 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function CalitateSelect({ label, name, value, onChange }: {
  label: string; name: keyof AcordConfidentialitateData; value: string;
  onChange: (name: keyof AcordConfidentialitateData, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white">
        <option value="Persoană fizică">Persoană fizică</option>
        <option value="Persoană juridică">Persoană juridică</option>
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof AcordConfidentialitateData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.obiectConfidentialitate || formData.obiectConfidentialitate.trim().length < 10) {
      newErrors.obiectConfidentialitate = "Descrierea trebuie să conțină cel puțin 10 caractere";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!validateAll()) { setLoading(false); return; }
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "acord-confidentialitate" }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Eroare la inițializarea plății");
      localStorage.setItem("acordNDAData", JSON.stringify(formData));
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
        <button type="button" onClick={() => { setFormData(testData); setErrors({}); }}
          className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-3 py-1.5 rounded-lg transition-colors">
          Completează automat
        </button>
      </div>

      {/* Tip NDA */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Tipul acordului</h3>
        <div className="grid grid-cols-2 gap-3">
          {(["bilateral", "unilateral"] as const).map((tip) => (
            <label key={tip} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              formData.tipNDA === tip ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}>
              <input type="radio" name="tipNDA" value={tip} checked={formData.tipNDA === tip}
                onChange={() => handleChange("tipNDA", tip)} className="mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 capitalize">{tip}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {tip === "bilateral"
                    ? "Ambele părți au obligații de confidențialitate"
                    : "Doar Partea 2 are obligații față de Partea 1"}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Partea 1 */}
      <Section title="Partea 1">
        <Field label="Nume / Denumire firmă" name="parte1Nume" value={formData.parte1Nume} onChange={handleChange} placeholder="ex: Popescu Ion / SC Exemplu SRL" required />
        <CalitateSelect label="Calitate" name="parte1Calitate" value={formData.parte1Calitate} onChange={handleChange} />
        <div className="sm:col-span-2">
          <Field label="Adresă / Sediu social" name="parte1Adresa" value={formData.parte1Adresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
        {formData.parte1Calitate === "Persoană juridică" ? (
          <>
            <Field label="CUI / CIF" name="parte1CUI" value={formData.parte1CUI ?? ""} onChange={handleChange} placeholder="ex: RO12345678" required />
            <div className="sm:col-span-2">
              <Field label="Reprezentant legal (nume + funcție)" name="parte1ReprezentantLegal" value={formData.parte1ReprezentantLegal ?? ""} onChange={handleChange} placeholder="ex: Popescu Ion, Administrator" required />
            </div>
          </>
        ) : (
          <>
            <Field label="CNP" name="parte1CNP" value={formData.parte1CNP ?? ""} onChange={handleChange} placeholder="ex: 1850315120003" required />
            <Field label="Serie și nr. CI" name="parte1CI" value={formData.parte1CI ?? ""} onChange={handleChange} placeholder="ex: AB 123456" />
          </>
        )}
      </Section>

      {/* Partea 2 */}
      <Section title="Partea 2">
        <Field label="Nume / Denumire firmă" name="parte2Nume" value={formData.parte2Nume} onChange={handleChange} placeholder="ex: Ionescu Maria / SC Alt SRL" required />
        <CalitateSelect label="Calitate" name="parte2Calitate" value={formData.parte2Calitate} onChange={handleChange} />
        <div className="sm:col-span-2">
          <Field label="Adresă / Sediu social" name="parte2Adresa" value={formData.parte2Adresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, București, Ilfov" required />
        </div>
        {formData.parte2Calitate === "Persoană juridică" ? (
          <>
            <Field label="CUI / CIF" name="parte2CUI" value={formData.parte2CUI ?? ""} onChange={handleChange} placeholder="ex: RO87654321" required />
            <div className="sm:col-span-2">
              <Field label="Reprezentant legal (nume + funcție)" name="parte2ReprezentantLegal" value={formData.parte2ReprezentantLegal ?? ""} onChange={handleChange} placeholder="ex: Ionescu Maria, Director General" required />
            </div>
          </>
        ) : (
          <>
            <Field label="CNP" name="parte2CNP" value={formData.parte2CNP ?? ""} onChange={handleChange} placeholder="ex: 2920520400005" required />
            <Field label="Serie și nr. CI" name="parte2CI" value={formData.parte2CI ?? ""} onChange={handleChange} placeholder="ex: CJ 654321" />
          </>
        )}
      </Section>

      {/* Informații și durată */}
      <Section title="Informații Confidențiale și Durată">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrierea informațiilor confidențiale <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.obiectConfidentialitate}
            onChange={(e) => handleChange("obiectConfidentialitate", e.target.value)}
            placeholder="ex: Informații tehnice, financiare, comerciale, planuri de afaceri, date despre clienți, coduri sursă și orice alte informații marcate ca confidențiale."
            required rows={4}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white resize-none transition-colors ${
              errors.obiectConfidentialitate
                ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            }`}
          />
          {errors.obiectConfidentialitate && (
            <p className="text-xs text-red-500 mt-1">{errors.obiectConfidentialitate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durata acordului <span className="text-red-400">*</span>
          </label>
          <select value={formData.durataAni} onChange={(e) => handleChange("durataAni", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white">
            <option value="1">1 an</option>
            <option value="2">2 ani</option>
            <option value="3">3 ani</option>
            <option value="5">5 ani</option>
            <option value="10">10 ani</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clauză penală (RON, opțional)
          </label>
          <input
            type="number" value={formData.penalitate}
            onChange={(e) => handleChange("penalitate", e.target.value)}
            placeholder="ex: 5000"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          />
          <p className="text-xs text-gray-400 mt-1">
            Penalitate fixă în caz de încălcare a acordului
          </p>
        </div>
        <Field label="Data acordului" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <div className="sm:col-span-2">
          <Field label="Locul încheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
        </div>
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Acord de Confidențialitate (NDA)</p>
            <p className="text-sm text-gray-500">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">20 lei</p>
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
