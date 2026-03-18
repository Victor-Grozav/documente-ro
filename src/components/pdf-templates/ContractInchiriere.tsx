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
    <Document title="Contract de Inchiriere" author="Documente.ro" creator="Documente.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contract de Inchiriere</Text>
        <Text style={styles.subtitle}>
          Incheiat astazi, {data.data}, in {data.locul}
        </Text>

        {/* Parti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Partile Contractante</Text>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Locatorul (proprietarul):</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.locatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.locatorCNP}</Text>
          </View>
          {data.locatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
              <Text style={styles.value}>{data.locatorCI}</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.locatorAdresa}</Text>
          </View>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Locatarul (chiriasul):</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.locatarNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.locatarCNP}</Text>
          </View>
          {data.locatarCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
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
            Locatorul da in locatiune Locatarului urmatoarea proprietate:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tip proprietate:</Text>
            <Text style={styles.value}>{data.proprietateTip}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresa:</Text>
            <Text style={styles.value}>{data.proprietateAdresa}</Text>
          </View>
          {data.proprietateSuprafata && (
            <View style={styles.row}>
              <Text style={styles.label}>Suprafata:</Text>
              <Text style={styles.value}>{data.proprietateSuprafata} mp</Text>
            </View>
          )}
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            Locatorul declara ca este proprietarul de drept al imobilului, ca
            acesta nu este grevat de sarcini si ca are dreptul deplin de a-l da
            in locatiune.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Durata Inchirierii</Text>
          <Text style={styles.paragraph}>
            Prezentul contract se incheie pe o durata de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.durataLuni} luni</Text>,
            incepand cu{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.dataIncepere}</Text>{" "}
            si pana la{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{dataIncetare}</Text>.
          </Text>
        </View>

        {/* Chiria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Chiria si Modalitatea de Plata</Text>
          <Text style={styles.paragraph}>
            Chiria lunara convenita este de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {data.chiria} {data.moneda}
            </Text>
            , achitata prin{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.modalitataPlata}</Text>,
            pana la data de 5 a fiecarei luni pentru luna in curs.
          </Text>
          {data.garantie && (
            <Text style={styles.paragraph}>
              La semnarea prezentului contract, Locatarul achita o garantie
              echivalenta cu{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {data.garantie} chirie lunara
              </Text>
              , suma ce va fi restituita la incetarea contractului, daca nu
              exista prejudicii sau restante.
            </Text>
          )}
        </View>

        {/* Obligatii locator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Obligatiile Locatorului</Text>
          <Text style={styles.paragraph}>
            Locatorul se obliga: sa predea proprietatea in stare corespunzatoare
            folosintei convenite; sa asigure folosinta linistita si utila a
            proprietatii pe toata durata contractului; sa efectueze reparatiile
            majore necesare; sa nu impiedice sau sa tulbure folosinta normala a
            proprietatii.
          </Text>
        </View>

        {/* Obligatii locatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligatiile Locatarului</Text>
          <Text style={styles.paragraph}>
            Locatarul se obliga: sa plateasca chiria la termenele stabilite; sa
            foloseasca proprietatea cu diligenta unui bun proprietar, conform
            destinatiei sale; sa nu subinchirieze fara acordul scris al
            Locatorului; sa restituie proprietatea la incetarea contractului in
            starea in care a primit-o, cu exceptia uzurii normale; sa suporte
            costurile utilitatilor pe durata contractului.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Prezentul contract este guvernat de dispozitiile art. 1777-1850 din
            Codul Civil roman. Este incheiat sub semnatura privata, in doua
            exemplare originale. Orice modificare se face prin act aditional
            semnat de ambele parti. Litigiile vor fi solutionate de instantele
            competente din Romania.
          </Text>
        </View>

        {/* Semnaturi */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locator (Proprietar)</Text>
            <Text style={styles.signatureName}>{data.locatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locatar (Chirias)</Text>
            <Text style={styles.signatureName}>{data.locatarNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura</Text>
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
