import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ContractInchiriereData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
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
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 4,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 140, fontFamily: "Helvetica-Bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  paragraph: { fontSize: 10, marginBottom: 8, textAlign: "justify" },
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  signatureBox: { width: "45%", alignItems: "center" },
  signatureLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 4, textTransform: "uppercase" },
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

export default function ContractInchiriere({ data }: Props) {
  const dataIncetare = (() => {
    const luni = parseInt(data.durataLuni) || 0;
    const [zi, luna, an] = data.dataIncepere.split(".").map(Number);
    if (!zi || !luna || !an) return "—";
    const d = new Date(an, luna - 1 + luni, zi);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  })();

  return (
    <Document title="Contract de Închiriere" author="Documente.ro" creator="Documente.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contract de Închiriere</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Părți */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile Contractante</Text>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Locatorul (proprietarul):</Text>
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

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Locatarul (chiriașul):</Text>
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
            în locațiune.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Durata Închirierii</Text>
          <Text style={styles.paragraph}>
            Prezentul contract se încheie pe o durată de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.durataLuni} luni</Text>,
            începând cu{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.dataIncepere}</Text>{" "}
            și până la{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{dataIncetare}</Text>.
          </Text>
        </View>

        {/* Chiria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Chiria și Modalitatea de Plată</Text>
          <Text style={styles.paragraph}>
            Chiria lunară convenită este de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {data.chiria} {data.moneda}
            </Text>
            , achitată prin{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.modalitataPlata}</Text>
            , până la data de 5 a fiecărei luni pentru luna în curs.
          </Text>
          {data.garantie && (
            <Text style={styles.paragraph}>
              La semnarea prezentului contract, Locatarul achită o garanție
              echivalentă cu{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {data.garantie} chirie lunară
              </Text>
              , sumă ce va fi restituită la încetarea contractului, dacă nu
              există prejudicii sau restanțe.
            </Text>
          )}
        </View>

        {/* Obligații locator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Obligațiile Locatorului</Text>
          <Text style={styles.paragraph}>
            Locatorul se obligă: să predea proprietatea în stare corespunzătoare
            folosinței convenite; să asigure folosința liniștită și utilă a
            proprietății pe toată durata contractului; să efectueze reparațiile
            majore necesare; să nu împiedice sau să tulbure folosința normală a
            proprietății.
          </Text>
        </View>

        {/* Obligații locatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligațiile Locatarului</Text>
          <Text style={styles.paragraph}>
            Locatarul se obligă: să plătească chiria la termenele stabilite; să
            folosească proprietatea cu diligența unui bun proprietar, conform
            destinației sale; să nu subînchirieze fără acordul scris al
            Locatorului; să restituie proprietatea la încetarea contractului în
            starea în care a primit-o, cu excepția uzurii normale; să suporte
            costurile utilităților pe durata contractului.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Prezentul contract este guvernat de dispozițiile art. 1777-1850 din
            Codul Civil român. Este încheiat sub semnătură privată, în două
            exemplare originale. Orice modificare se face prin act adițional
            semnat de ambele părți. Litigiile vor fi soluționate de instanțele
            competente din România.
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
          <Text style={styles.footerText}>Generat prin Documente.ro</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
