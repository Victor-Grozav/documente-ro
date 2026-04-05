"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Clock, Eye, X, Handshake, UserCheck, Lock, Home, ClipboardList, Briefcase, CalendarDays, LogOut, FileText } from "lucide-react";
import type { PreviewDocumentType } from "@/components/PreviewPDFViewerInner";
import type { LucideIcon } from "lucide-react";

const PreviewPDFViewerInner = dynamic(
  () => import("@/components/PreviewPDFViewerInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Se generează previzualizarea...</p>
      </div>
    ),
  }
);

const TITLURI: Record<PreviewDocumentType, string> = {
  "contract-vanzare-cumparare": "Contract de Vânzare-Cumpărare",
  "imputernicire": "Împuternicire / Procură",
  "acord-confidentialitate": "Acord de Confidențialitate (NDA)",
  "contract-inchiriere": "Contract de Închiriere",
  "proces-verbal-predare": "Proces-Verbal de Predare-Primire",
  "contract-prestari-servicii": "Contract de Prestări Servicii",
  "cerere-concediu": "Cerere de Concediu de Odihnă",
  "cerere-demisie": "Cerere de Demisie",
  "adeverinta-salariat": "Adeverință de Salariat",
};

interface DocConfig {
  slug: PreviewDocumentType;
  titlu: string;
  descriere: string;
  pret: string;
  gratuitCu?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
  priceBg: string;
  priceColor: string;
  ctaColor: string;
  disponibil: boolean;
  badge?: string;
}

interface Categorie {
  label: string;
  items: DocConfig[];
}

const CATEGORII: Categorie[] = [
  {
    label: "Vânzare & Cumpărare",
    items: [
      {
        slug: "contract-vanzare-cumparare",
        titlu: "Contract de Vânzare-Cumpărare",
        descriere: "Pentru vânzarea oricărui bun mobil: mașini, electronice, bunuri personale.",
        pret: "25 lei",
        icon: Handshake,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        hoverBorder: "hover:border-green-300",
        priceBg: "bg-green-50",
        priceColor: "text-green-700",
        ctaColor: "text-green-600",
        disponibil: true,
        badge: "Cel mai folosit",
      },
    ],
  },
  {
    label: "Proprietăți",
    items: [
      {
        slug: "contract-inchiriere",
        titlu: "Contract de Închiriere",
        descriere: "Contract de închiriere pentru spații locative sau comerciale.",
        pret: "25 lei",
        icon: Home,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        hoverBorder: "hover:border-orange-300",
        priceBg: "bg-orange-50",
        priceColor: "text-orange-700",
        ctaColor: "text-orange-600",
        disponibil: true,
      },
      {
        slug: "proces-verbal-predare",
        titlu: "Proces-Verbal de Predare-Primire",
        descriere: "Document la predarea locuinței — stare proprietate, contoare, chei.",
        pret: "10 lei",
        gratuitCu: "contract-inchiriere",
        icon: ClipboardList,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-500",
        hoverBorder: "hover:border-slate-300",
        priceBg: "bg-slate-50",
        priceColor: "text-slate-600",
        ctaColor: "text-slate-600",
        disponibil: true,
      },
    ],
  },
  {
    label: "Servicii & Freelancing",
    items: [
      {
        slug: "contract-prestari-servicii",
        titlu: "Contract de Prestări Servicii",
        descriere: "Pentru freelanceri, PFA și firme. Suportă PF și PJ, clauze opționale de confidențialitate și drepturi PI.",
        pret: "25 lei",
        icon: Briefcase,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        hoverBorder: "hover:border-blue-300",
        priceBg: "bg-blue-50",
        priceColor: "text-blue-700",
        ctaColor: "text-blue-600",
        disponibil: true,
        badge: "Nou",
      },
    ],
  },
  {
    label: "HR & Angajați",
    items: [
      {
        slug: "cerere-concediu",
        titlu: "Cerere de Concediu de Odihnă",
        descriere: "Model completat automat cu perioadă, număr de zile și rubrică de aprobare angajator.",
        pret: "10 lei",
        icon: CalendarDays,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
        hoverBorder: "hover:border-teal-300",
        priceBg: "bg-teal-50",
        priceColor: "text-teal-700",
        ctaColor: "text-teal-600",
        disponibil: true,
        badge: "Nou",
      },
      {
        slug: "cerere-demisie",
        titlu: "Cerere de Demisie",
        descriere: "Notificare demisie conform Codului Muncii, cu perioadă de preaviz și confirmare primire.",
        pret: "15 lei",
        icon: LogOut,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        hoverBorder: "hover:border-amber-300",
        priceBg: "bg-amber-50",
        priceColor: "text-amber-700",
        ctaColor: "text-amber-600",
        disponibil: true,
        badge: "Nou",
      },
      {
        slug: "adeverinta-salariat",
        titlu: "Adeverință de Salariat",
        descriere: "Pentru bancă, viză sau chirie. Include funcția, data angajării și opțional salariul.",
        pret: "10 lei",
        icon: FileText,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
        hoverBorder: "hover:border-cyan-300",
        priceBg: "bg-cyan-50",
        priceColor: "text-cyan-700",
        ctaColor: "text-cyan-600",
        disponibil: true,
        badge: "Nou",
      },
    ],
  },
  {
    label: "Business & Protecție",
    items: [
      {
        slug: "acord-confidentialitate",
        titlu: "Acord de Confidențialitate (NDA)",
        descriere: "Protejarea informațiilor confidențiale între două părți.",
        pret: "20 lei",
        icon: Lock,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
        hoverBorder: "hover:border-rose-300",
        priceBg: "bg-rose-50",
        priceColor: "text-rose-700",
        ctaColor: "text-rose-600",
        disponibil: true,
      },
      {
        slug: "imputernicire",
        titlu: "Împuternicire / Procură",
        descriere: "Delegarea dreptului de a acționa în numele tău pentru o perioadă determinată.",
        pret: "15 lei",
        icon: UserCheck,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
        hoverBorder: "hover:border-violet-300",
        priceBg: "bg-violet-50",
        priceColor: "text-violet-700",
        ctaColor: "text-violet-600",
        disponibil: true,
      },
    ],
  },
];

export default function DocumentListClient() {
  const [preview, setPreview] = useState<PreviewDocumentType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preview) return;
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setPreview(null); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [preview]);

  return (
    <>
      <div className="space-y-6">
        {CATEGORII.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-1">
              {cat.label}
            </p>
            <div className="space-y-3">
              {cat.items.map((doc) =>
                doc.disponibil ? (
                  <div
                    key={doc.slug}
                    className={`group/card bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 ${doc.hoverBorder} hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center`}
                  >
                    <Link
                      href={`/documente/${doc.slug}`}
                      className="flex items-start gap-4 p-5 flex-1 min-w-0"
                    >
                      <div className={`w-10 h-10 ${doc.iconBg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                        <doc.icon className={`w-5 h-5 ${doc.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900 dark:text-white">{doc.titlu}</p>
                          {doc.badge && (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${doc.priceBg} ${doc.priceColor}`}>
                              {doc.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{doc.descriere}</p>
                        {doc.gratuitCu && (
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                            Gratuit cu Contract de Închiriere
                          </p>
                        )}
                      </div>
                    </Link>

                    <div className="flex items-center gap-2 px-5 pb-4 sm:pb-0 sm:pr-4 shrink-0">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${doc.priceBg} ${doc.priceColor}`}>
                        {doc.gratuitCu ? "10 lei / gratuit" : doc.pret}
                      </span>
                      <button
                        onClick={() => setPreview(doc.slug)}
                        className="p-2 text-gray-300 dark:text-slate-600 hover:text-gray-500 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label={`Previzualizează ${doc.titlu}`}
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <Link
                        href={`/documente/${doc.slug}`}
                        className={`flex items-center gap-1 text-sm font-medium ${doc.ctaColor} whitespace-nowrap`}
                      >
                        Generează PDF
                        <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    key={doc.slug}
                    className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-5 opacity-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                        <doc.icon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-slate-300">{doc.titlu}</p>
                        <p className="text-sm text-gray-400 dark:text-slate-500 mt-0.5">{doc.descriere}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <Clock className="w-4 h-4 text-gray-300 dark:text-slate-600" />
                      <span className="text-sm text-gray-400 dark:text-slate-500">În curând</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl flex flex-col shadow-2xl"
            style={{ height: "88vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
              <div>
                <p className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wide font-medium mb-0.5">Model document</p>
                <h2 id="modal-title" className="font-bold text-gray-900 dark:text-white text-sm">{TITLURI[preview]}</h2>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden rounded-b-none">
              <PreviewPDFViewerInner documentType={preview} />
            </div>

            <div className="px-5 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <p className="text-xs text-gray-400 dark:text-slate-500">Document generat cu date de exemplu</p>
              <Link
                href={`/documente/${preview}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                onClick={() => setPreview(null)}
              >
                Generează documentul →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
