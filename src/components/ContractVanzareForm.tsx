"use client";

import { useState } from "react";
import { ContractVanzareData } from "@/lib/types";
import { validateCNP, validateCI, validatePret } from "@/lib/validation";

const today = new Date().toLocaleDateString("ro-RO");

const TIP_BUN_OPTIONS = [
  { value: "vehicul", label: "Autoturism / motocicletă / vehicul" },
  { value: "electronice", label: "Electronice și electrocasnice" },
  { value: "mobila", label: "Mobilă și obiecte de uz casnic" },
  { value: "utilaje", label: "Utilaje și echipamente" },
  { value: "animale", label: "Animale" },
  { value: "alte", label: "Alte bunuri mobile" },
];

const defaultData: ContractVanzareData = {
  vanzatorNume: "", vanzatorCNP: "", vanzatorCI: "", vanzatorAdresa: "",
  cumparatorNume: "", cumparatorCNP: "", cumparatorCI: "", cumparatorAdresa: "",
  tipBun: "vehicul", bunDescriere: "", bunSerie: "",
  vehiculNrInmatriculare: "", vehiculSerieCIV: "",
  vehiculKm: "", vehiculItpPanaLa: "", vehiculDocumente: "",
  pret: "", moneda: "RON", modalitataPlata: "numerar",
  locPredare: "", data: today, locul: "",
};

const testData: ContractVanzareData = {
  vanzatorNume: "Popescu Ion", vanzatorCNP: "1850315120003", vanzatorCI: "AB 123456",
  vanzatorAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  cumparatorNume: "Ionescu Maria", cumparatorCNP: "2920520400005", cumparatorCI: "CJ 654321",
  cumparatorAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  tipBun: "vehicul",
  bunDescriere: "Dacia Logan, an fabricație 2018, culoare albă",
  bunSerie: "ROJFA1GE7J0123456",
  vehiculNrInmatriculare: "CJ 01 ABC",
  vehiculSerieCIV: "S1234567890",
  vehiculKm: "98500",
  vehiculItpPanaLa: "15.09.2026",
  vehiculDocumente: "Certificat de înmatriculare, Carte identitate vehicul (CIV), Chei (2 seturi)",
  pret: "15000", moneda: "RON", modalitataPlata: "transfer bancar",
  locPredare: "Cluj-Napoca, Str. Libertății nr. 10", data: today, locul: "Cluj-Napoca",
};

function Field({
  label, name, value, onChange, placeholder, required, type = "text", error, onBlur,
}: {
  label: string; name: keyof ContractVanzareData; value: string;
  onChange: (name: keyof ContractVanzareData, value: string) => void;
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

export default function ContractVanzareForm() {
  const [formData, setFormData] = useState<ContractVanzareData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof ContractVanzareData, value: string) => {
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
    const vanzatorCNPError = validateCNP(formData.vanzatorCNP);
    if (vanzatorCNPError) newErrors.vanzatorCNP = vanzatorCNPError;
    const cumparatorCNPError = validateCNP(formData.cumparatorCNP);
    if (cumparatorCNPError) newErrors.cumparatorCNP = cumparatorCNPError;
    const vanzatorCIError = validateCI(formData.vanzatorCI);
    if (vanzatorCIError) newErrors.vanzatorCI = vanzatorCIError;
    const cumparatorCIError = validateCI(formData.cumparatorCI);
    if (cumparatorCIError) newErrors.cumparatorCI = cumparatorCIError;
    const pretError = validatePret(formData.pret);
    if (pretError) newErrors.pret = pretError;
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!validateAll()) { setLoading(false); return; }
    sessionStorage.setItem("contractData", JSON.stringify(formData));
    window.location.href = "/documente/contract-vanzare-cumparare/success?session_id=test";
  };

  const isVehicul = formData.tipBun === "vehicul";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-orange-50 border border-dashed border-orange-200 rounded-xl p-3 flex items-center justify-between">
        <p className="text-xs text-orange-600 font-medium">Mod testare</p>
        <button type="button" onClick={() => { setFormData(testData); setErrors({}); }}
          className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-3 py-1.5 rounded-lg transition-colors">
          Completează automat
        </button>
      </div>

      {/* Vânzător */}
      <Section title="Vânzător">
        <Field label="Nume și prenume" name="vanzatorNume" value={formData.vanzatorNume} onChange={handleChange} placeholder="ex: Popescu Ion" required />
        <Field label="CNP" name="vanzatorCNP" value={formData.vanzatorCNP} onChange={handleChange} placeholder="1234567890123" required error={errors.vanzatorCNP} onBlur={() => handleBlur("vanzatorCNP", formData.vanzatorCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="vanzatorCI" value={formData.vanzatorCI} onChange={handleChange} placeholder="ex: AB 123456" error={errors.vanzatorCI} onBlur={() => handleBlur("vanzatorCI", formData.vanzatorCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="vanzatorAdresa" value={formData.vanzatorAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 1, Cluj-Napoca, Cluj" required />
        </div>
      </Section>

      {/* Cumpărător */}
      <Section title="Cumpărător">
        <Field label="Nume și prenume" name="cumparatorNume" value={formData.cumparatorNume} onChange={handleChange} placeholder="ex: Ionescu Maria" required />
        <Field label="CNP" name="cumparatorCNP" value={formData.cumparatorCNP} onChange={handleChange} placeholder="2345678901234" required error={errors.cumparatorCNP} onBlur={() => handleBlur("cumparatorCNP", formData.cumparatorCNP)} />
        <Field label="Serie și nr. CI (opțional)" name="cumparatorCI" value={formData.cumparatorCI} onChange={handleChange} placeholder="ex: CJ 654321" error={errors.cumparatorCI} onBlur={() => handleBlur("cumparatorCI", formData.cumparatorCI)} />
        <div className="sm:col-span-2">
          <Field label="Adresă domiciliu" name="cumparatorAdresa" value={formData.cumparatorAdresa} onChange={handleChange} placeholder="Str. Exemplu nr. 2, București, Ilfov" required />
        </div>
      </Section>

      {/* Bunul vândut */}
      <Section title="Bunul Vândut">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipul bunului vândut <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.tipBun}
            onChange={(e) => handleChange("tipBun", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white"
          >
            {TIP_BUN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Field label="Descriere / detalii suplimentare" name="bunDescriere" value={formData.bunDescriere} onChange={handleChange} placeholder="ex: an fabricație 2018, culoare albă, stare bună" required />
        </div>
        <div className="sm:col-span-2">
          <Field label="Serie / Număr identificare (opțional)" name="bunSerie" value={formData.bunSerie} onChange={handleChange} placeholder="ex: VIN: ROJFA1GE7J0123456" />
        </div>

        {/* Câmpuri specifice vehicul */}
        {isVehicul && (
          <>
            <Field label="Nr. înmatriculare" name="vehiculNrInmatriculare" value={formData.vehiculNrInmatriculare} onChange={handleChange} placeholder="ex: CJ 01 ABC" />
            <Field label="Serie CIV" name="vehiculSerieCIV" value={formData.vehiculSerieCIV} onChange={handleChange} placeholder="ex: S1234567890" />
            <Field label="Kilometraj la bord" name="vehiculKm" value={formData.vehiculKm} onChange={handleChange} placeholder="ex: 98500" type="number" />
            <Field label="ITP valabil până la" name="vehiculItpPanaLa" value={formData.vehiculItpPanaLa} onChange={handleChange} placeholder="ex: 15.09.2026" />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documente predate
              </label>
              <div className="space-y-2">
                {[
                  "Certificat de înmatriculare",
                  "Carte identitate vehicul (CIV)",
                  "Chei (1 set)",
                  "Chei (2 seturi)",
                ].map((doc) => {
                  const checked = formData.vehiculDocumente.includes(doc);
                  return (
                    <label key={doc} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const current = formData.vehiculDocumente
                            ? formData.vehiculDocumente.split(", ").filter(Boolean)
                            : [];
                          const next = checked
                            ? current.filter((d) => d !== doc)
                            : [...current, doc];
                          handleChange("vehiculDocumente", next.join(", "));
                        }}
                        className="rounded border-gray-300"
                      />
                      {doc}
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Section>

      {/* Preț și detalii */}
      <Section title="Preț și Detalii Contract">
        <Field label="Preț" name="pret" value={formData.pret} onChange={handleChange} placeholder="5000" required type="number" error={errors.pret} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Moneda <span className="text-red-400">*</span></label>
          <select value={formData.moneda} onChange={(e) => handleChange("moneda", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white">
            <option value="RON">RON</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modalitate plată <span className="text-red-400">*</span></label>
          <select value={formData.modalitataPlata} onChange={(e) => handleChange("modalitataPlata", e.target.value as ContractVanzareData["modalitataPlata"])}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white">
            <option value="numerar">Numerar</option>
            <option value="transfer bancar">Transfer bancar</option>
            <option value="alta modalitate">Altă modalitate</option>
          </select>
        </div>
        <Field label="Locul predării bunului" name="locPredare" value={formData.locPredare} onChange={handleChange} placeholder="ex: Cluj-Napoca, str. Exemplu nr. 1" required />
        <Field label="Data contractului" name="data" value={formData.data} onChange={handleChange} placeholder="16.03.2026" required />
        <Field label="Locul încheierii" name="locul" value={formData.locul} onChange={handleChange} placeholder="ex: Cluj-Napoca" required />
      </Section>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-900">Contract de Vânzare-Cumpărare</p>
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
