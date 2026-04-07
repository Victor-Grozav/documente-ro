"use client";

import { createContext, useCallback, useContext, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { PreviewDocumentType } from "./PreviewPDFViewerInner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = Record<string, any>;

const PreviewPDFViewerInner = dynamic(() => import("./PreviewPDFViewerInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Se încarcă preview...</p>
      </div>
    </div>
  ),
});

const ReportDataContext = createContext<(data: AnyData) => void>(() => {});

export function useReportFormData() {
  return useContext(ReportDataContext);
}

interface Props {
  documentType: PreviewDocumentType;
  children: React.ReactNode;
}

export default function SplitPageLayout({ documentType, children }: Props) {
  const [liveData, setLiveData] = useState<AnyData | null>(null);
  const [isPending, setIsPending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const reportData = useCallback((data: AnyData) => {
    setIsPending(true);
    clearTimeout(timerRef.current);
    clearTimeout(hideRef.current);
    timerRef.current = setTimeout(() => {
      setLiveData(data);
      // usePDF regenerează intern — 800ms suficient să preia noul blob URL
      hideRef.current = setTimeout(() => setIsPending(false), 800);
    }, 700);
  }, []);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearTimeout(hideRef.current);
  }, []);

  return (
    <ReportDataContext.Provider value={reportData}>
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[55%_45%] lg:gap-8 lg:items-start">
        {/* Left — form column */}
        <div className="max-w-2xl mx-auto w-full lg:max-w-none lg:mx-0">{children}</div>

        {/* Right — sticky preview panel (desktop only) */}
        <div className="hidden lg:flex lg:flex-col sticky top-4 h-[calc(100vh-2rem)]">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wide">
              Preview document
            </p>
            {liveData ? (
              <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            ) : (
              <span className="text-xs text-gray-400 dark:text-slate-500">Model demonstrativ</span>
            )}
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm relative">
            <PreviewPDFViewerInner documentType={documentType} liveData={liveData} />
            {/* Loading overlay — acoperă flash-ul negru al PDFViewer la re-render */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl transition-opacity duration-300"
              style={{ opacity: isPending ? 1 : 0, pointerEvents: isPending ? "auto" : "none" }}
            >
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-gray-400 dark:text-slate-500">Se actualizează...</p>
              </div>
            </div>
            {/* Watermark overlay — prevents usable screenshots, no pointer events */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(-35deg)" }}>
                <span className="text-[64px] font-black text-gray-300/60 dark:text-slate-600/60 whitespace-nowrap select-none uppercase tracking-[0.3em]">
                  PREVIZUALIZARE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportDataContext.Provider>
  );
}
