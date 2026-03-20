"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AcordConfidentialitateData } from "@/lib/types";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import AcordConfidentialitate from "@/components/pdf-templates/AcordConfidentialitate";
import { CheckCircle, AlertCircle } from "lucide-react";

type Status = "loading" | "success" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<AcordConfidentialitateData | null>(null);

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    const raw = sessionStorage.getItem("acordNDAData");
    if (!raw) { setStatus("error"); return; }
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(({ paid }) => {
        if (!paid) { setStatus("error"); return; }
        try {
          setData(JSON.parse(raw) as AcordConfidentialitateData);
          setStatus("success");
          sessionStorage.removeItem("acordNDAData");
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
          <a href="/documente/acord-confidentialitate" className="text-blue-600 font-medium hover:underline text-sm">← Incearca din nou</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-2xl border border-green-200 p-8 mb-6">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plata confirmata!</h1>
          <p className="text-gray-500 mb-6">Acordul tau este gata. Descarca PDF-ul de mai jos.</p>
          <PDFDownloadButton
            document={<AcordConfidentialitate data={data} />}
            fileName={`acord-confidentialitate-${data.data.replace(/\//g, "-")}.pdf`}
            label="Descarca Acord NDA PDF"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Sumar</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Partea 1</span>
              <span className="font-medium">{data.parte1Nume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Partea 2</span>
              <span className="font-medium">{data.parte2Nume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Durata</span>
              <span className="font-medium">{data.durataAni} ani</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Data</span>
              <span className="font-medium">{data.data}</span>
            </div>
          </div>
        </div>

        <a href="/documente" className="inline-block mt-6 text-gray-400 text-sm hover:text-gray-600">← Inapoi la documente</a>
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
