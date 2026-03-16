"use client";

import dynamic from "next/dynamic";
import { ContractVanzareData } from "@/lib/types";

const PDFDownloadButtonInner = dynamic(
  () => import("@/components/PDFDownloadButtonInner"),
  { ssr: false, loading: () => (
    <button disabled className="inline-flex items-center gap-2 bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-lg cursor-not-allowed">
      Se pregateste PDF-ul...
    </button>
  )}
);

interface Props {
  data: ContractVanzareData;
}

export default function PDFDownloadButton({ data }: Props) {
  return <PDFDownloadButtonInner data={data} />;
}
