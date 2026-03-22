"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContractInchiriereData, ProcesVerbalData } from "@/lib/types";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import ContractInchiriere from "@/components/pdf-templates/ContractInchiriere";
import ProcesVerbalPredare from "@/components/pdf-templates/ProcesVerbalPredare";
import { CheckCircle, AlertCircle, FileText } from "lucide-react";

type Status = "loading" | "success" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<ContractInchiriereData | null>(null);

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    const raw = localStorage.getItem("contractInchiriereData");
    if (!raw) { setStatus("error"); return; }
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(({ paid }) => {
        if (!paid) { setStatus("error"); return; }
        try {
          setData(JSON.parse(raw) as ContractInchiriereData);
          setStatus("success");
          localStorage.removeItem("contractInchiriereData");
        } catch {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Se verifica plata...</p>
        </div>
      </main>
    );
  }

  if (status === "error" || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Ceva nu a mers</h1>
          <p className="text-gray-500 text-sm mb-6">Nu am putut gasi datele documentului.</p>
          <a href="/documente/contract-inchiriere" className="text-blue-600 font-medium hover:underline text-sm">
            ← Incearca din nou
          </a>
        </div>
      </main>
    );
  }

  const procesVerbalData: ProcesVerbalData = {
    locatorNume: data.locatorNume,
    locatarNume: data.locatarNume,
    proprietateAdresa: data.proprietateAdresa,
    dataContract: data.data,
    stareGenerala: "",
    data: data.data,
    locul: data.locul,
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Card principal */}
        <div className="bg-white rounded-2xl border border-green-200 p-8 mb-4">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plata confirmata!</h1>
          <p className="text-gray-500 mb-6">Contractul tau este gata. Descarca PDF-ul de mai jos.</p>
          <PDFDownloadButton
            document={<ContractInchiriere data={data} />}
            fileName={`contract-inchiriere-${data.data.replace(/\./g, "-")}.pdf`}
            label="Descarca Contract PDF"
          />
        </div>

        {/* Card proces verbal companion */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-5 mb-6 text-left">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🎁</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 text-sm">Cadou din partea noastră!</p>
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-lg">
                  Gratuit
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Ai și un <span className="font-semibold">Proces Verbal de Predare-Primire</span>, precompletat cu datele din contract. Descarcă-l și completează-l cu starea locuinței și indicii contoarelor la predare.
              </p>
            </div>
          </div>
          <PDFDownloadButton
            document={<ProcesVerbalPredare data={procesVerbalData} />}
            fileName={`proces-verbal-predare-${data.data.replace(/\./g, "-")}.pdf`}
            label="Descarcă Proces Verbal →"
          />
        </div>

        {/* Sumar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Sumar</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Locator</span>
              <span className="font-medium">{data.locatorNume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Locatar</span>
              <span className="font-medium">{data.locatarNume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Proprietate</span>
              <span className="font-medium text-right max-w-[60%]">{data.proprietateAdresa}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Chirie</span>
              <span className="font-medium">{data.chiria} {data.moneda}/luna</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Durata</span>
              <span className="font-medium">{data.durataLuni} luni</span>
            </div>
          </div>
        </div>

        <a href="/documente" className="inline-block mt-6 text-gray-400 text-sm hover:text-gray-600">
          ← Inapoi la documente
        </a>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
