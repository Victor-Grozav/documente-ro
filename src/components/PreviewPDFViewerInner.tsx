"use client";

import { PDFViewer } from "@react-pdf/renderer";
import ContractVanzareCumparare from "@/components/pdf-templates/ContractVanzareCumparare";
import Imputernicire from "@/components/pdf-templates/Imputernicire";
import AcordConfidentialitate from "@/components/pdf-templates/AcordConfidentialitate";
import ContractInchiriere from "@/components/pdf-templates/ContractInchiriere";
import ProcesVerbalPredare from "@/components/pdf-templates/ProcesVerbalPredare";
import {
  ContractVanzareData, ImputernicireData,
  AcordConfidentialitateData, ContractInchiriereData, ProcesVerbalData,
} from "@/lib/types";

const SAMPLE_VANZARE: ContractVanzareData = {
  vanzatorNume: "Popescu Ion", vanzatorCNP: "1850315120003",
  vanzatorCI: "AB 123456", vanzatorAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  cumparatorNume: "Ionescu Maria", cumparatorCNP: "2920520400005",
  cumparatorCI: "CJ 654321", cumparatorAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  tipBun: "vehicul",
  bunDescriere: "Dacia Logan, an fabricație 2018, culoare albă",
  bunSerie: "ROJFA1GE7J0123456",
  vehiculNrInmatriculare: "CJ 01 ABC",
  vehiculSerieCIV: "S1234567890",
  vehiculKm: "98500", vehiculItpPanaLa: "15.09.2026",
  vehiculDocumente: "Certificat de înmatriculare, Carte identitate vehicul (CIV), Chei (2 seturi)",
  pret: "15000", moneda: "RON", modalitataPlata: "transfer bancar",
  locPredare: "Cluj-Napoca, Str. Libertății nr. 10",
  data: "18.03.2026", locul: "Cluj-Napoca",
};

const SAMPLE_IMPUTERNICIRE: ImputernicireData = {
  mandantNume: "Popescu Ion", mandantCNP: "1850315120003",
  mandantCI: "AB 123456", mandantAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  mandatarNume: "Popescu Elena", mandatarCNP: "2780808120008",
  mandatarCI: "CJ 111222", mandatarAdresa: "Str. Moților nr. 3, Cluj-Napoca, Cluj",
  mandatarContact: "0722 123 456",
  obiect: "Să-l reprezinte pe Mandant în fața oricărei instituții publice sau private în vederea depunerii și ridicării de documente, semnării de acte administrative și oricăror alte operațiuni necesare în numele Mandantului, pe teritoriul României.",
  poateDelegaTert: false,
  dataExpirare: "31.12.2026", data: "18.03.2026", locul: "Cluj-Napoca",
};

const SAMPLE_ACORD: AcordConfidentialitateData = {
  parte1Nume: "SC Exemplu Tech SRL", parte1Calitate: "Persoană juridică",
  parte1Adresa: "Str. Inovației nr. 1, Cluj-Napoca, Cluj",
  parte2Nume: "Ionescu Mihai", parte2Calitate: "Persoană fizică",
  parte2Adresa: "Str. Victoriei nr. 20, București, Sector 2",
  obiectConfidentialitate: "Informații tehnice, coduri sursă, algoritmi, date financiare, planuri de afaceri, liste de clienți și orice alte informații marcate drept confidențiale de către oricare dintre părți pe durata colaborării.",
  durataAni: "3", tipNDA: "bilateral", penalitate: "",
  data: "18.03.2026", locul: "Cluj-Napoca",
};

const SAMPLE_PROCES_VERBAL: ProcesVerbalData = {
  locatorNume: "Popescu Ion",
  locatarNume: "Ionescu Maria",
  proprietateAdresa: "Str. Dorobanților nr. 25, ap. 4, Cluj-Napoca, Cluj",
  dataContract: "01.04.2026",
  stareGenerala: "Bună",
  data: "01.04.2026",
  locul: "Cluj-Napoca",
};

const SAMPLE_INCHIRIERE: ContractInchiriereData = {
  locatorNume: "Popescu Ion", locatorCNP: "1850315120003",
  locatorCI: "AB 123456", locatorAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  locatorIBAN: "RO49 AAAA 1B31 0075 9384 0000",
  locatarNume: "Ionescu Maria", locatarCNP: "2920520400005",
  locatarCI: "CJ 654321", locatarAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  proprietateAdresa: "Str. Dorobanților nr. 25, ap. 4, Cluj-Napoca, Cluj",
  proprietateTip: "apartament", proprietateSuprafata: "65",
  chiria: "2500", moneda: "RON", modalitataPlata: "transfer bancar",
  garantie: "2", dataIncepere: "01.04.2026", durataLuni: "12",
  indexareAnuala: false, procentIndexare: "",
  data: "18.03.2026", locul: "Cluj-Napoca",
};

export type PreviewDocumentType =
  | "contract-vanzare-cumparare"
  | "imputernicire"
  | "acord-confidentialitate"
  | "contract-inchiriere"
  | "proces-verbal-predare";

interface Props {
  documentType: PreviewDocumentType;
}

export default function PreviewPDFViewerInner({ documentType }: Props) {
  const docMap = {
    "contract-vanzare-cumparare": <ContractVanzareCumparare data={SAMPLE_VANZARE} />,
    "imputernicire": <Imputernicire data={SAMPLE_IMPUTERNICIRE} />,
    "acord-confidentialitate": <AcordConfidentialitate data={SAMPLE_ACORD} />,
    "contract-inchiriere": <ContractInchiriere data={SAMPLE_INCHIRIERE} />,
    "proces-verbal-predare": <ProcesVerbalPredare data={SAMPLE_PROCES_VERBAL} />,
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
      {docMap[documentType]}
    </PDFViewer>
  );
}
