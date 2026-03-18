const CNP_KEY = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];

export function validateCNP(cnp: string): string | null {
  if (!cnp) return "CNP-ul este obligatoriu";
  if (!/^\d{13}$/.test(cnp)) return "Trebuie să conțină exact 13 cifre";

  const digits = cnp.split("").map(Number);

  if (digits[0] === 0 || digits[0] === 9) {
    return "Prima cifră trebuie să fie între 1 și 8";
  }

  const month = parseInt(cnp.slice(3, 5));
  if (month < 1 || month > 12) return "Luna de naștere este incorectă";

  const day = parseInt(cnp.slice(5, 7));
  if (day < 1 || day > 31) return "Ziua de naștere este incorectă";

  const countyCode = parseInt(cnp.slice(7, 9));
  if (countyCode < 1 || (countyCode > 46 && countyCode < 51) || countyCode > 52) {
    return "Codul județului este incorect";
  }

  const sum = digits.slice(0, 12).reduce((acc, d, i) => acc + d * CNP_KEY[i], 0);
  const remainder = sum % 11;
  const expectedChecksum = remainder === 10 ? 1 : remainder;

  if (digits[12] !== expectedChecksum) {
    return "Cifra de control nu corespunde — CNP incorect";
  }

  return null;
}

export function validateCI(ci: string): string | null {
  if (!ci) return null; // opțional
  if (!/^[A-Z]{2} \d{6}$/.test(ci)) {
    return "Formatul corect: AB 123456 (2 litere majuscule, spațiu, 6 cifre)";
  }
  return null;
}

export function validateDate(date: string): string | null {
  if (!date) return "Data este obligatorie";
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) return "Formatul corect: ZZ.LL.AAAA";
  const [day, month, year] = date.split(".").map(Number);
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() + 1 !== month || d.getDate() !== day) {
    return "Data introdusă nu este validă";
  }
  return null;
}

export function validateFutureDate(date: string): string | null {
  const base = validateDate(date);
  if (base) return base;
  const [day, month, year] = date.split(".").map(Number);
  const d = new Date(year, month - 1, day);
  if (d <= new Date()) return "Data de expirare trebuie să fie în viitor";
  return null;
}

export function validatePret(pret: string): string | null {
  if (!pret) return "Prețul este obligatoriu";
  const n = parseFloat(pret);
  if (isNaN(n) || n <= 0) return "Prețul trebuie să fie un număr pozitiv";
  return null;
}
