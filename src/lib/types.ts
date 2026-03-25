export interface ImputernicireData {
  mandantNume: string;
  mandantCNP: string;
  mandantCI: string;
  mandantAdresa: string;
  mandatarNume: string;
  mandatarCNP: string;
  mandatarCI: string;
  mandatarAdresa: string;
  mandatarContact: string; // tel/email opțional
  obiect: string;
  poateDelegaTert: boolean;
  dataExpirare: string;
  data: string;
  locul: string;
}

export interface AcordConfidentialitateData {
  parte1Nume: string;
  parte1Calitate: string;
  parte1Adresa: string;
  parte1CUI?: string;               // dacă PJ
  parte1ReprezentantLegal?: string; // dacă PJ
  parte1CNP?: string;               // dacă PF
  parte1CI?: string;                // dacă PF
  parte2Nume: string;
  parte2Calitate: string;
  parte2Adresa: string;
  parte2CUI?: string;
  parte2ReprezentantLegal?: string;
  parte2CNP?: string;
  parte2CI?: string;
  obiectConfidentialitate: string;
  durataAni: string;
  tipNDA: "bilateral" | "unilateral";
  penalitate: string;
  data: string;
  locul: string;
}

export interface ContractInchiriereData {
  locatorNume: string;
  locatorCNP: string;
  locatorCI: string;
  locatorAdresa: string;
  locatorIBAN: string; // opțional
  locatarNume: string;
  locatarCNP: string;
  locatarCI: string;
  locatarAdresa: string;
  proprietateAdresa: string;
  proprietateTip: string;
  proprietateSuprafata: string;
  chiria: string;
  moneda: "RON" | "EUR";
  modalitataPlata: "numerar" | "transfer bancar";
  garantie: string;
  dataIncepere: string;
  durataLuni: string;
  indexareAnuala: boolean;
  procentIndexare: string;
  data: string;
  locul: string;
}

export interface ContractVanzareData {
  vanzatorNume: string;
  vanzatorCNP: string;
  vanzatorCI: string;
  vanzatorAdresa: string;
  cumparatorNume: string;
  cumparatorCNP: string;
  cumparatorCI: string;
  cumparatorAdresa: string;
  tipBun: string;
  bunDescriere: string;
  bunSerie: string;
  // Câmpuri specifice vehicul
  vehiculNrInmatriculare: string;
  vehiculSerieCIV: string;
  vehiculKm: string;
  vehiculItpPanaLa: string;
  vehiculDocumente: string; // ex: "Certificat înmatriculare, CIV, Chei (2 seturi)"
  pret: string;
  moneda: "RON" | "EUR" | "USD";
  modalitataPlata: "numerar" | "transfer bancar" | "alta modalitate";
  locPredare: string;
  data: string;
  locul: string;
}

export interface ContractPrestariServiciiData {
  prestatorTip: "pf" | "pj";
  prestatorNume: string;
  prestatorCNP: string;
  prestatorCI: string;
  prestatorCUI: string;
  prestatorRegCom: string;
  prestatorReprezentant: string;
  prestatorAdresa: string;
  prestatorIBAN: string;
  beneficiarTip: "pf" | "pj";
  beneficiarNume: string;
  beneficiarCNP: string;
  beneficiarCI: string;
  beneficiarCUI: string;
  beneficiarRegCom: string;
  beneficiarReprezentant: string;
  beneficiarAdresa: string;
  descriereServicii: string;
  termenFinalizare: string;
  locPrestare: string;
  valoare: string;
  moneda: "RON" | "EUR";
  modalitataPlata: "integral la finalizare" | "avans + rest la finalizare" | "rate lunare" | "lunar";
  avansPercent: string;
  termenPlata: string;
  penalitateIntarziere: string;
  includeConfidentialitate: boolean;
  includeDrepturiPI: boolean;
  drepturiPIBeneficiar: boolean;
  data: string;
  locul: string;
}

export interface ProcesVerbalData {
  locatorNume: string;
  locatarNume: string;
  proprietateAdresa: string;
  dataContract: string;
  stareGenerala: string;
  data: string;
  locul: string;
}
