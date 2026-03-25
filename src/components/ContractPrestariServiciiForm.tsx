"use client";

import { useState } from "react";
import { ContractPrestariServiciiData } from "@/lib/types";
import { validateCNP, validateCI, validatePret, validateDate } from "@/lib/validation";

const today = new Date().toLocaleDateString("ro-RO");

const defaultData: ContractPrestariServiciiData = {
  prestatorTip: "pf",
  prestatorNume: "",
  prestatorCNP: "",
  prestatorCI: "",
  prestatorCUI: "",
  prestatorRegCom: "",
  prestatorReprezentant: "",
  prestatorAdresa: "",
  prestatorIBAN: "",
  beneficiarTip: "pf",
  beneficiarNume: "",
  beneficiarCNP: "",
  beneficiarCI: "",
  beneficiarCUI: "",
  beneficiarRegCom: "",
  beneficiarReprezentant: "",
  beneficiarAdresa: "",
  descriereServicii: "",
  termenFinalizare: "",
  locPrestare: "",
  valoare: "",
  moneda: "RON",
  modalitataPlata: "integral la finalizare",
  avansPercent: "30",
  termenPlata: "15",
  penalitateIntarziere: "",
  includeConfidentialitate: false,
  includeDrepturiPI: false,
  drepturiPIBeneficiar: true,
  data: today,
  locul: "",
};

function Field({
  label, name, value, onChange, placeholder, required, type = "text", error, onBlur,
}: {
  label: string; name: keyof ContractPrestariServiciiData; value: string;
  onChange: (name: keyof ContractPrestariServiciiData, value: string) => void;
  placeholder?: string; required?: boolean; type?: string; error?: string; onBlur?: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type} value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur} placeholder={placeholder} required={required}
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 dark:border-slate-600 focus:border-blue-400 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function TextAreaField({
  label, name, value, onChange, placeholder, required, error,
}: {
  label: string; name: keyof ContractPrestariServiciiData; value: string;
  onChange: (name: keyof ContractPrestariServiciiData, value: string) => void;
  placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        value={value} rows={4} required={required} placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors resize-none ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 dark:border-slate-600 focus:border-blue-400 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function DateField({
  label, name, value, onChange, required, error,
}: {
  label: string; name: keyof ContractPrestariServiciiData; value: string;
  onChange: (name: keyof ContractPrestariServiciiData, value: string) => void;
  required?: boolean; error?: string;
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
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 bg-white dark:bg-slate-800 transition-colors ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-gray-200 dark:border-slate-600 focus:border-blue-400 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: keyof ContractPrestariServiciiData; value: string;
  onChange: (name: keyof ContractPrestariServiciiData, value: string) => void;
  options: { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white dark:bg-slate-800">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
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

function TipSelector({
  label, tipKey, value, onChange,
}: {
  label: string; tipKey: "prestatorTip" | "beneficiarTip"; value: "pf" | "pj";
  onChange: (key: "prestatorTip" | "beneficiarTip", val: "pf" | "pj") => void;
}) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{label}</label>
      <div className="flex gap-4">
        {(["pf", "pj"] as const).map((tip) => (
          <label key={tip} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" name={tipKey} value={tip} checked={value === tip}
              onChange={() => onChange(tipKey, tip)}
              className="accent-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300">
              {tip === "pf" ? "Persoană fizică" : "Persoană juridică (SRL, PFA etc.)"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ContractPrestariServiciiForm() {
  const [formData, setFormData] = useState<ContractPrestariServiciiData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof ContractPrestariServiciiData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipChange = (key: "prestatorTip" | "beneficiarTip", val: "pf" | "pj") => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleBlur = (name: string, value: string) => {
    let fieldError: string | null = null;
    if (name.endsWith("CNP")) fieldError = validateCNP(value);
    else if (name.endsWith("CI")) fieldError = validateCI(value);
    setErrors((prev) => ({ ...prev, [name]: fieldError || "" }));
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.prestatorTip === "pf") {
      const e = validateCNP(formData.prestatorCNP);
      if (e) newErrors.prestatorCNP = e;
      if (formData.prestatorCI) {
        const e2 = validateCI(formData.prestatorCI);
        if (e2) newErrors.prestatorCI = e2;
      }
    } else {
      if (!formData.prestatorCUI.trim()) newErrors.prestatorCUI = "CUI-ul este obligatoriu";
      if (!formData.prestatorReprezentant.trim()) newErrors.prestatorReprezentant = "Reprezentantul legal este obligatoriu";
    }

    if (formData.beneficiarTip === "pf") {
      const e = validateCNP(formData.beneficiarCNP);
      if (e) newErrors.beneficiarCNP = e;
      if (formData.beneficiarCI) {
        const e2 = validateCI(formData.beneficiarCI);
        if (e2) newErrors.beneficiarCI = e2;
      }
    } else {
      if (!formData.beneficiarCUI.trim()) newErrors.beneficiarCUI = "CUI-ul este obligatoriu";
      if (!formData.beneficiarReprezentant.trim()) newErrors.beneficiarReprezentant = "Reprezentantul legal este obligatoriu";
    }

    const valErr = validatePret(formData.valoare);
    if (valErr) newErrors.valoare = valErr;

    const termenErr = validateDate(formData.termenFinalizare);
    if (termenErr) newErrors.termenFinalizare = termenErr;

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!validateAll()) { setLoading(false); return; }
    localStorage.setItem("contractPrestariServiciiData", JSON.stringify(formData));
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "contract-prestari-servicii" }),
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
      {/* Prestator */}
      <Section title="Prestator (Furnizor de Servicii)">
        <TipSelector label="Tip prestator" tipKey="prestatorTip" value={formData.prestatorTip} onChange={handleTipChange} />
        <Field label="Nume / Denumire" name="prestatorNume" value={formData.prestatorNume} onChange={handleChange}
          placeholder={formData.prestatorTip === "pj" ? "ex: SC Exemplu SRL" : "ex: Ionescu Alexandru"} required />
        {formData.prestatorTip === "pf" ? (
          <>
            <Field label="CNP" name="prestatorCNP" value={formData.prestatorCNP} onChange={handleChange}
              placeholder="1234567890123" required error={errors.prestatorCNP}
              onBlur={() => handleBlur("prestatorCNP", formData.prestatorCNP)} />
            <Field label="Serie și nr. CI (opțional)" name="prestatorCI" value={formData.prestatorCI} onChange={handleChange}
              placeholder="ex: CJ 123456" error={errors.prestatorCI}
              onBlur={() => handleBlur("prestatorCI", formData.prestatorCI)} />
          </>
        ) : (
          <>
            <Field label="CUI" name="prestatorCUI" value={formData.prestatorCUI} onChange={handleChange}
              placeholder="ex: RO12345678" required error={errors.prestatorCUI} />
            <Field label="Nr. Reg. Com. (opțional)" name="prestatorRegCom" value={formData.prestatorRegCom} onChange={handleChange}
              placeholder="ex: J12/123/2020" />
            <div className="sm:col-span-2">
              <Field label="Reprezentant legal" name="prestatorReprezentant" value={formData.prestatorReprezentant} onChange={handleChange}
                placeholder="ex: Popescu Ion, Administrator" required error={errors.prestatorReprezentant} />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <Field label="Adresă / Sediu social" name="prestatorAdresa" value={formData.prestatorAdresa} onChange={handleChange}
            placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
        <div className="sm:col-span-2">
          <Field label="IBAN (opțional, recomandat)" name="prestatorIBAN" value={formData.prestatorIBAN} onChange={handleChange}
            placeholder="ex: RO49 AAAA 1B31 0075 9384 0000" />
        </div>
      </Section>

      {/* Beneficiar */}
      <Section title="Beneficiar (Client)">
        <TipSelector label="Tip beneficiar" tipKey="beneficiarTip" value={formData.beneficiarTip} onChange={handleTipChange} />
        <Field label="Nume / Denumire" name="beneficiarNume" value={formData.beneficiarNume} onChange={handleChange}
          placeholder={formData.beneficiarTip === "pj" ? "ex: SC Client SRL" : "ex: Popescu Maria"} required />
        {formData.beneficiarTip === "pf" ? (
          <>
            <Field label="CNP" name="beneficiarCNP" value={formData.beneficiarCNP} onChange={handleChange}
              placeholder="2345678901234" required error={errors.beneficiarCNP}
              onBlur={() => handleBlur("beneficiarCNP", formData.beneficiarCNP)} />
            <Field label="Serie și nr. CI (opțional)" name="beneficiarCI" value={formData.beneficiarCI} onChange={handleChange}
              placeholder="ex: AB 654321" error={errors.beneficiarCI}
              onBlur={() => handleBlur("beneficiarCI", formData.beneficiarCI)} />
          </>
        ) : (
          <>
            <Field label="CUI" name="beneficiarCUI" value={formData.beneficiarCUI} onChange={handleChange}
              placeholder="ex: RO87654321" required error={errors.beneficiarCUI} />
            <Field label="Nr. Reg. Com. (opțional)" name="beneficiarRegCom" value={formData.beneficiarRegCom} onChange={handleChange}
              placeholder="ex: J40/456/2018" />
            <div className="sm:col-span-2">
              <Field label="Reprezentant legal" name="beneficiarReprezentant" value={formData.beneficiarReprezentant} onChange={handleChange}
                placeholder="ex: Ionescu Maria, Administrator" required error={errors.beneficiarReprezentant} />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <Field label="Adresă / Sediu social" name="beneficiarAdresa" value={formData.beneficiarAdresa} onChange={handleChange}
            placeholder="Str. Exemplu nr. 2, București, Sector 1" required />
        </div>
      </Section>

      {/* Servicii */}
      <Section title="Servicii Prestate">
        <div className="sm:col-span-2">
          <TextAreaField label="Descrierea serviciilor" name="descriereServicii" value={formData.descriereServicii}
            onChange={handleChange} required error={errors.descriereServicii}
            placeholder="ex: Servicii de dezvoltare software: implementare aplicație web conform specificațiilor tehnice, incluzând design UI/UX, backend API și testare QA." />
        </div>
        <DateField label="Termen de finalizare" name="termenFinalizare" value={formData.termenFinalizare}
          onChange={handleChange} required error={errors.termenFinalizare} />
        <Field label="Loc de prestare" name="locPrestare" value={formData.locPrestare} onChange={handleChange}
          placeholder="ex: Online / La sediul beneficiarului" required />
      </Section>

      {/* Preț și Plată */}
      <Section title="Preț și Modalitate de Plată">
        <Field label="Valoare totală" name="valoare" value={formData.valoare} onChange={handleChange}
          placeholder="ex: 5000" required type="number" error={errors.valoare} />
        <SelectField label="Monedă" name="moneda" value={formData.moneda} onChange={handleChange}
          options={[{ value: "RON", label: "RON" }, { value: "EUR", label: "EUR" }]} />
        <div className="sm:col-span-2">
          <SelectField label="Modalitate de plată" name="modalitataPlata" value={formData.modalitataPlata} onChange={handleChange}
            options={[
              { value: "integral la finalizare", label: "Integral la finalizarea serviciilor" },
              { value: "avans + rest la finalizare", label: "Avans + rest la finalizare" },
              { value: "rate lunare", label: "Rate lunare egale" },
              { value: "lunar", label: "Lunar (la sfârşitul fiecărei luni)" },
            ]} />
        </div>
        {formData.modalitataPlata === "avans + rest la finalizare" && (
          <SelectField label="Procent avans" name="avansPercent" value={formData.avansPercent} onChange={handleChange}
            options={[
              { value: "20", label: "20%" }, { value: "30", label: "30%" },
              { value: "40", label: "40%" }, { value: "50", label: "50%" },
            ]} />
        )}
        <SelectField label="Termen de plată (zile)" name="termenPlata" value={formData.termenPlata} onChange={handleChange}
          options={[
            { value: "7", label: "7 zile" }, { value: "15", label: "15 zile" }, { value: "30", label: "30 zile" },
          ]} />
        <Field label="Penalitate întârziere plată (% pe zi, opțional)" name="penalitateIntarziere"
          value={formData.penalitateIntarziere} onChange={handleChange} placeholder="ex: 0.1" />
      </Section>

      {/* Clauze opționale */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-4">Clauze Opționale</h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.includeConfidentialitate}
              onChange={(e) => setFormData((prev) => ({ ...prev, includeConfidentialitate: e.target.checked }))}
              className="mt-0.5 rounded border-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Clauză de confidențialitate</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Ambele părți se obligă să păstreze confidențialitatea informațiilor schimbate (valabilă 2 ani după încetarea contractului)</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.includeDrepturiPI}
              onChange={(e) => setFormData((prev) => ({ ...prev, includeDrepturiPI: e.target.checked }))}
              className="mt-0.5 rounded border-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Clauză drepturi de proprietate intelectuală</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Specifică cui aparțin drepturile de autor asupra livrabilelor (ex: design, cod sursă)</p>
            </div>
          </label>
          {formData.includeDrepturiPI && (
            <div className="ml-7 space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Drepturile patrimoniale de autor aparțin:</p>
              {[
                { value: true, label: "Beneficiarului (transfer de drepturi la plata integrală)" },
                { value: false, label: "Prestatorului (beneficiarul primește licență de utilizare)" },
              ].map(({ value, label }) => (
                <label key={String(value)} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="drepturiPI" checked={formData.drepturiPIBeneficiar === value}
                    onChange={() => setFormData((prev) => ({ ...prev, drepturiPIBeneficiar: value }))}
                    className="accent-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-slate-400">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detalii contract */}
      <Section title="Detalii Contract">
        <DateField label="Data contractului" name="data" value={formData.data} onChange={handleChange} required />
        <Field label="Locul încheierii" name="locul" value={formData.locul} onChange={handleChange}
          placeholder="ex: Cluj-Napoca" required />
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Contract de Prestări Servicii</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">PDF profesional, gata de semnat</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">25 lei</p>
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
