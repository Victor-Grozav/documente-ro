"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProcesVerbalData } from "@/lib/types";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import ProcesVerbalPredare from "@/components/pdf-templates/ProcesVerbalPredare";
import { CheckCircle, AlertCircle } from "lucide-react";

type Status = "loading" | "success" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<ProcesVerbalData | null>(null);

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    const raw = localStorage.getItem("procesVerbalData");
    if (!raw) { setStatus("error"); return; }
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(({ paid }) => {
        if (!paid) { setStatus("error"); return; }
        try {
          setData(JSON.parse(raw) as ProcesVerbalData);
          setStatus("success");
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
          <p className="text-gray-500 dark:text-slate-400">Se verifică plata...</p>
        </div>
      </main>
    );
  }

  if (status === "error" || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-800 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ceva nu a mers</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-6">Nu am putut găsi datele documentului.</p>
          <a href="/documente/proces-verbal-predare" className="text-blue-600 font-medium hover:underline text-sm">
            ← Încearcă din nou
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-green-200 dark:border-green-700 p-8 mb-4">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Plată confirmată!</h1>
          <p className="text-gray-500 dark:text-slate-400 mb-6">
            Procesul verbal este gata. Completează contoarele și starea bunurilor direct pe document.
          </p>
          <PDFDownloadButton
            document={<ProcesVerbalPredare data={data} />}
            fileName={`proces-verbal-predare-${data.data.replace(/\./g, "-")}.pdf`}
            label="Descarcă Proces Verbal PDF"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left">
          <h2 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-3">Sumar</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Locator</span>
              <span className="font-medium dark:text-white">{data.locatorNume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Locatar</span>
              <span className="font-medium dark:text-white">{data.locatarNume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Proprietate</span>
              <span className="font-medium dark:text-white text-right max-w-[60%]">{data.proprietateAdresa}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Data predării</span>
              <span className="font-medium dark:text-white">{data.data}</span>
            </div>
          </div>
        </div>

        <a href="/documente" className="inline-block mt-6 text-gray-400 dark:text-slate-500 text-sm hover:text-gray-600 dark:hover:text-slate-300">
          ← Înapoi la documente
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
