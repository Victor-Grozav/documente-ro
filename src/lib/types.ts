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
  parte2Nume: string;
  parte2Calitate: string;
  parte2Adresa: string;
  obiectConfidentialitate: string;
  durataAni: string;
  tipNDA: "bilateral" | "unilateral";
  penalitate: string; // sumă RON, opțional
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

export interface ProcesVerbalData {
  locatorNume: string;
  locatarNume: string;
  proprietateAdresa: string;
  dataContract: string;
  stareGenerala: string;
  data: string;
  locul: string;
}
