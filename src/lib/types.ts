export interface ImputernicireData {
  mandantNume: string;
  mandantCNP: string;
  mandantCI: string;
  mandantAdresa: string;
  mandatarNume: string;
  mandatarCNP: string;
  mandatarCI: string;
  mandatarAdresa: string;
  obiect: string;
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
  data: string;
  locul: string;
}

export interface ContractInchiriereData {
  locatorNume: string;
  locatorCNP: string;
  locatorCI: string;
  locatorAdresa: string;
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
  data: string;
  locul: string;
}

export interface ContractVanzareData {
  // Vanzator
  vanzatorNume: string;
  vanzatorCNP: string;
  vanzatorCI: string;
  vanzatorAdresa: string;
  // Cumparator
  cumparatorNume: string;
  cumparatorCNP: string;
  cumparatorCI: string;
  cumparatorAdresa: string;
  // Bunul vandut
  bunDescriere: string;
  bunSerie: string;
  // Pret
  pret: string;
  moneda: "RON" | "EUR" | "USD";
  modalitataPlata: "numerar" | "transfer bancar" | "alta modalitate";
  // Predare
  locPredare: string;
  // Contract
  data: string;
  locul: string;
}
