import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures } from "@/lib/pdfFonts";
import { ContractInchiriereData } from "@/lib/types";

const f = fixLigatures;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 4,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 140, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  paragraph: { fontSize: 10, marginBottom: 8, textAlign: "justify" },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  signatureBox: { width: "45%", alignItems: "center" },
  signatureLabel: { fontSize: 10, fontFamily: "Roboto", fontWeight: "bold", marginBottom: 4, textTransform: "uppercase" },
  signatureName: { fontSize: 10, marginBottom: 30 },
  signatureLine: { borderTopWidth: 1, borderTopColor: "#333", width: "100%", marginTop: 40 },
  signatureHint: { fontSize: 8, color: "#888", marginTop: 4 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 60,
    right: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 8, color: "#aaa" },
});

interface Props {
  data: ContractInchiriereData;
}

const MODALITATE_INCHIRIERE_DISPLAY: Record<string, string> = {
  "numerar": "în numerar",
  "transfer bancar": "prin transfer bancar",
};

export default function ContractInchiriere({ data: rawData }: Props) {
  const data = fixData(rawData);
  const modalitateDisplay = MODALITATE_INCHIRIERE_DISPLAY[data.modalitataPlata] ?? `prin ${data.modalitataPlata}`;
  const dataIncetare = (() => {
    const luni = parseInt(data.durataLuni) || 0;
    const [zi, luna, an] = data.dataIncepere.split(".").map(Number);
    if (!zi || !luna || !an) return "—";
    const d = new Date(an, luna - 1 + luni, zi);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  })();

  return (
    <Document title="Contract de Închiriere" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contract de Închiriere</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Părți */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile Contractante</Text>

          <Text style={[styles.paragraph, styles.bold]}>Locatorul (proprietarul):</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.locatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.locatorCNP}</Text>
          </View>
          {data.locatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.locatorCI}</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.locatorAdresa}</Text>
          </View>

          <Text style={[styles.paragraph, styles.bold]}>Locatarul (chiriașul):</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.locatarNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.locatarCNP}</Text>
          </View>
          {data.locatarCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.locatarCI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.locatarAdresa}</Text>
          </View>
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul Contractului</Text>
          <Text style={styles.paragraph}>
            Locatorul dă în locațiune Locatarului următoarea proprietate:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tip proprietate:</Text>
            <Text style={styles.value}>{data.proprietateTip}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresă:</Text>
            <Text style={styles.value}>{data.proprietateAdresa}</Text>
          </View>
          {data.proprietateSuprafata && (
            <View style={styles.row}>
              <Text style={styles.label}>Suprafață:</Text>
              <Text style={styles.value}>{data.proprietateSuprafata} mp</Text>
            </View>
          )}
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            Locatorul declară că este proprietarul de drept al imobilului, că
            acesta nu este grevat de sarcini și că are dreptul deplin de a-l da
            în locațiune. Predarea efectivă a proprietății se va face la data
            începerii contractului, pe baza unui proces-verbal de predare-primire
            semnat de ambele părți.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Durata Închirierii</Text>
          <Text style={styles.paragraph}>
            Prezentul contract se încheie pe o durată de{" "}
            <Text style={styles.bold}>{data.durataLuni} luni</Text>,
            începând cu{" "}
            <Text style={styles.bold}>{data.dataIncepere}</Text>{" "}
            și până la{" "}
            <Text style={styles.bold}>{dataIncetare}</Text>.
          </Text>
        </View>

        {/* Chiria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Chiria și Modalitatea de Plată</Text>
          <Text style={styles.paragraph}>
            Chiria lunară convenită este de{" "}
            <Text style={styles.bold}>
              {data.chiria} {data.moneda}
            </Text>
            {f(" și se achită ")}<Text style={styles.bold}>{modalitateDisplay}</Text>
            {f(", până la data de 5 a fiecărei luni pentru luna în curs.")}
          </Text>
          {data.garantie && (
            <Text style={styles.paragraph}>
              La semnarea prezentului contract, Locatarul achită o garanție
              echivalentă cu{" "}
              <Text style={styles.bold}>
                {data.garantie} {data.garantie === "1" ? "chirie lunară" : "chirii lunare"}
              </Text>
              , sumă ce va fi restituită la încetarea contractului, dacă nu
              există prejudicii sau restanțe.
            </Text>
          )}
          {data.locatorIBAN && (
            <Text style={styles.paragraph}>
              Plata chiriei se efectuează în contul Locatorului, IBAN:{" "}
              <Text style={styles.bold}>{data.locatorIBAN}</Text>.
            </Text>
          )}
          {data.indexareAnuala && data.procentIndexare && (
            <Text style={styles.paragraph}>
              Chiria se indexează anual cu{" "}
              <Text style={styles.bold}>{data.procentIndexare}%</Text>{" "}
              începând cu al doilea an de contract.
            </Text>
          )}
        </View>

        {/* Obligații locator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Obligațiile Locatorului</Text>
          <Text style={styles.paragraph}>
            {f("Locatorul se obligă: să predea proprietatea în stare corespunzătoare folosinței convenite; să asigure folosința liniștită și utilă a proprietății pe toată durata contractului; să efectueze reparațiile capitale (structurale și majore) necesare, conform art. 1786 alin. 1 lit. b Cod Civil; să nu împiedice sau să tulbure folosința normală a proprietății.")}
          </Text>
        </View>

        {/* Obligații locatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligațiile Locatarului</Text>
          <Text style={styles.paragraph}>
            {f("Locatarul se obligă: să plătească chiria la termenele stabilite; să folosească proprietatea cu diligența unui bun proprietar, conform destinației sale; să efectueze reparațiile de întreținere curentă pe cheltuiala sa; să nu subînchirieze fără acordul scris al Locatorului; să restituie proprietatea la încetarea contractului în starea în care a primit-o, cu excepția uzurii normale (deteriorare graduală prin utilizare normală și uzura în timp, fără neglijență sau daune); să suporte costurile utilităților pe durata contractului.")}
          </Text>
        </View>

        {/* Reziliere anticipată */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Reziliere Anticipată</Text>
          <Text style={styles.paragraph}>
            {f("Oricare dintre părți poate rezilia prezentul contract înainte de termen, cu un preaviz scris de minimum 30 de zile transmis celeilalte părți.")}
          </Text>
          <Text style={styles.paragraph}>
            {f("Rezilierea de drept (pact comisoriu, art. 1553 Cod Civil) intervine în cazul: neachitării chiriei timp de 2 luni consecutive; utilizării proprietății contrar destinației sau fără acordul Locatorului; producerii de degradări grave ale proprietății; subînchirierii fără acord scris.")}
          </Text>
          <Text style={styles.paragraph}>
            {f("La data rezilierii, Locatarul este obligat să elibereze proprietatea și să o predea Locatorului pe baza unui proces-verbal de predare-primire.")}
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VIII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            {f("Locatorul are obligația legală de a înregistra prezentul contract la organul fiscal competent (ANAF) în termen de 30 de zile de la data semnării și de a declara veniturile din chirii, conform art. 120 din Codul Fiscal.")}
          </Text>
          <Text style={styles.paragraph}>
            {f("La expirarea duratei contractului, dacă Locatarul continuă să dețină bunul și să își îndeplinească obligațiile fără ca Locatorul să se opună, contractul se consideră reînnoit pe perioadă nedeterminată, în condițiile art. 1828 din Codul Civil (tacita reconducțiune).")}
          </Text>
          <Text style={styles.paragraph}>
            {f("Prezentul contract este guvernat de dispozițiile art. 1777-1850 din Codul Civil român. Este încheiat sub semnătură privată, în două exemplare originale, câte unul pentru fiecare parte. Orice modificare se face prin act adițional semnat de ambele părți. Litigiile vor fi soluționate de instanțele competente din România.")}
          </Text>
        </View>

        {/* Semnături */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locator (Proprietar)</Text>
            <Text style={styles.signatureName}>{data.locatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locatar (Chiriaș)</Text>
            <Text style={styles.signatureName}>{data.locatarNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generat prin FaraNotar.ro</Text>
          <Text style={[styles.footerText, { flex: 1, textAlign: "center" }]}>Model document · utilizatorul răspunde pentru corectitudinea datelor și capacitatea semnatarilor</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
