export interface ContractVanzareData {
  // Vanzator
  vanzatorNume: string;
  vanzatorCNP: string;
  vanzatorAdresa: string;
  // Cumparator
  cumparatorNume: string;
  cumparatorCNP: string;
  cumparatorAdresa: string;
  // Bunul vandut
  bunDescriere: string;
  bunSerie: string;
  // Pret
  pret: string;
  moneda: "RON" | "EUR" | "USD";
  // Contract
  data: string;
  locul: string;
}
