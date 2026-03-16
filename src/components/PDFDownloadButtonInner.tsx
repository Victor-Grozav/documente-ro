"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ContractVanzareCumparare from "@/components/pdf-templates/ContractVanzareCumparare";
import { ContractVanzareData } from "@/lib/types";

interface Props {
  data: ContractVanzareData;
}

export default function PDFDownloadButtonInner({ data }: Props) {
  return (
    <PDFDownloadLink
      document={<ContractVanzareCumparare data={data} />}
      fileName={`contract-vanzare-${data.data.replace(/\//g, "-")}.pdf`}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-md"
    >
      {({ loading }) =>
        loading ? "Se genereaza PDF..." : "Descarca Contract PDF"
      }
    </PDFDownloadLink>
  );
}
