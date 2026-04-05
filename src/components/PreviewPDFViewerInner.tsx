"use client";

import { PDFViewer } from "@react-pdf/renderer";
import ContractVanzareCumparare from "@/components/pdf-templates/ContractVanzareCumparare";
import Imputernicire from "@/components/pdf-templates/Imputernicire";
import AcordConfidentialitate from "@/components/pdf-templates/AcordConfidentialitate";
import ContractInchiriere from "@/components/pdf-templates/ContractInchiriere";
import ProcesVerbalPredare from "@/components/pdf-templates/ProcesVerbalPredare";
import ContractPrestariServicii from "@/components/pdf-templates/ContractPrestariServicii";
import CerereConcediu from "@/components/pdf-templates/CerereConcediu";
import CerereDemisie from "@/components/pdf-templates/CerereDemisie";
import AdeverintaSalariat from "@/components/pdf-templates/AdeverintaSalariat";
import {
  ContractVanzareData, ImputernicireData,
  AcordConfidentialitateData, ContractInchiriereData, ProcesVerbalData,
  ContractPrestariServiciiData, CerereConceduData, CerereDemisieData, AdeverintaSalariatData,
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
  parte1CUI: "RO12345678", parte1ReprezentantLegal: "Popescu Ion, Administrator",
  parte2Nume: "Ionescu Mihai", parte2Calitate: "Persoană fizică",
  parte2Adresa: "Str. Victoriei nr. 20, București, Sector 2",
  parte2CNP: "1850315120003", parte2CI: "RX 123456",
  obiectConfidentialitate: "Informații tehnice, coduri sursă, algoritmi, date financiare, planuri de afaceri, liste de clienți și orice alte informații marcate drept confidențiale de către oricare dintre părți pe durata colaborării.",
  durataAni: "3", tipNDA: "bilateral", penalitate: "",
  data: "18.03.2026", locul: "Cluj-Napoca",
};

const SAMPLE_PRESTARI: ContractPrestariServiciiData = {
  prestatorTip: "pf",
  prestatorNume: "Ionescu Alexandru",
  prestatorCNP: "1850315120003",
  prestatorCI: "CJ 123456",
  prestatorCUI: "",
  prestatorRegCom: "",
  prestatorReprezentant: "",
  prestatorAdresa: "Str. Libertății nr. 10, Cluj-Napoca, Cluj",
  prestatorIBAN: "RO49 AAAA 1B31 0075 9384 0000",
  beneficiarTip: "pj",
  beneficiarNume: "SC Digital Solutions SRL",
  beneficiarCNP: "",
  beneficiarCI: "",
  beneficiarCUI: "RO12345678",
  beneficiarRegCom: "J12/123/2020",
  beneficiarReprezentant: "Popescu Maria, Administrator",
  beneficiarAdresa: "Str. Victoriei nr. 5, București, Sector 1",
  descriereServicii: "Servicii de dezvoltare software: implementare aplicație web conform specificațiilor tehnice anexate, incluzând design UI/UX, backend API RESTful, integrare baze de date și testare QA.",
  termenFinalizare: "30.06.2026",
  locPrestare: "Online (la distanță)",
  valoare: "8000",
  moneda: "RON",
  modalitataPlata: "avans + rest la finalizare",
  avansPercent: "30",
  termenPlata: "15",
  penalitateIntarziere: "0.1",
  includeConfidentialitate: true,
  includeDrepturiPI: true,
  drepturiPIBeneficiar: true,
  data: "18.03.2026",
  locul: "Cluj-Napoca",
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

const SAMPLE_CERERE_CONCEDIU: CerereConceduData = {
  angajatorNume: "SC Exemplu SRL",
  angajatNume: "Popescu Ion",
  angajatFunctia: "Programator",
  departament: "IT",
  tipConcediu: "odihnă",
  dataInceput: "14.07.2026",
  dataSfarsit: "25.07.2026",
  nrZile: "10",
  observatii: "",
  data: "05.04.2026",
  locul: "Cluj-Napoca",
};

const SAMPLE_CERERE_DEMISIE: CerereDemisieData = {
  angajatNume: "Ionescu Maria",
  angajatFunctia: "Contabil",
  angajatorNume: "SC Exemplu SRL",
  preavizZile: "20",
  dataUltimaZi: "30.04.2026",
  motivDemisie: "Motive personale.",
  data: "05.04.2026",
  locul: "București",
};

const SAMPLE_ADEVERINTA: AdeverintaSalariatData = {
  angajatorNume: "SC Exemplu Tech SRL",
  angajatorCUI: "RO12345678",
  angajatorAdresa: "Str. Inovației nr. 1, Cluj-Napoca, Cluj",
  angajatorReprezentant: "Popescu Ion, Director General",
  angajatNume: "Ionescu Maria",
  angajatCNP: "2920520400005",
  angajatFunctia: "Contabil",
  departament: "Financiar",
  dataAngajarii: "01.03.2023",
  includeSalariu: true,
  salariu: "4500",
  scopAdeverinta: "bancă",
  numarAdeverinta: "42/2026",
  data: "05.04.2026",
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
  | "proces-verbal-predare"
  | "contract-prestari-servicii"
  | "cerere-concediu"
  | "cerere-demisie"
  | "adeverinta-salariat";

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
    "contract-prestari-servicii": <ContractPrestariServicii data={SAMPLE_PRESTARI} />,
    "cerere-concediu": <CerereConcediu data={SAMPLE_CERERE_CONCEDIU} />,
    "cerere-demisie": <CerereDemisie data={SAMPLE_CERERE_DEMISIE} />,
    "adeverinta-salariat": <AdeverintaSalariat data={SAMPLE_ADEVERINTA} />,
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
      {docMap[documentType]}
    </PDFViewer>
  );
}
