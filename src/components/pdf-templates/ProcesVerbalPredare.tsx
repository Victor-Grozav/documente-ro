import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData } from "@/lib/pdfFonts";
import { ProcesVerbalData } from "@/lib/types";

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
  label: { width: 160, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  paragraph: { fontSize: 10, marginBottom: 8, textAlign: "justify" },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
    minHeight: 28,
  },
  tableCell1: { flex: 2, fontSize: 10, paddingRight: 8 },
  tableCell2: { flex: 1, fontSize: 10, paddingRight: 8 },
  tableCell3: { flex: 1, fontSize: 10 },
  tableCellHeader: { fontFamily: "Roboto", fontWeight: "bold", fontSize: 10 },
  contor: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  contorLabel: { width: 140, fontSize: 10 },
  contorLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginLeft: 8,
    height: 16,
  },
  contorUnit: { width: 40, fontSize: 10, marginLeft: 8 },
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
  data: ProcesVerbalData;
}

const EMPTY_ROWS = 10;

export default function ProcesVerbalPredare({ data: rawData }: Props) {
  const data = fixData(rawData);
  return (
    <Document title="Proces Verbal de Predare-Primire" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Proces Verbal de Predare-Primire</Text>
        <Text style={styles.subtitle}>
          Anexă la Contractul de Închiriere din {data.dataContract} · {data.proprietateAdresa}
        </Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* I. Părțile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Locator:</Text>
            <Text style={styles.value}>{data.locatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Locatar:</Text>
            <Text style={styles.value}>{data.locatarNume}</Text>
          </View>
        </View>

        {/* II. Obiectul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul</Text>
          <Text style={styles.paragraph}>
            Prezentul proces verbal atestă predarea de către Locator și preluarea
            de către Locatar a proprietății situate la adresa:{" "}
            <Text style={styles.bold}>{data.proprietateAdresa}</Text>, în baza
            Contractului de închiriere încheiat la data de{" "}
            <Text style={styles.bold}>{data.dataContract}</Text>.
          </Text>
        </View>

        {/* III. Starea proprietății */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Starea Proprietății la Predare</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Stare generală:</Text>
            <Text style={styles.value}>{data.stareGenerala || "____________________________"}</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            Contoare (valorile înregistrate la data predării):
          </Text>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Energie electrică:</Text>
            <View style={styles.contorLine} />
            <Text style={styles.contorUnit}>kWh</Text>
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Gaz:</Text>
            <View style={styles.contorLine} />
            <Text style={styles.contorUnit}>mc</Text>
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Apă rece:</Text>
            <View style={styles.contorLine} />
            <Text style={styles.contorUnit}>mc</Text>
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Apă caldă:</Text>
            <View style={styles.contorLine} />
            <Text style={styles.contorUnit}>mc</Text>
          </View>
        </View>

        {/* IV. Bunuri incluse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Bunuri Incluse în Spațiu</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell1, styles.tableCellHeader]}>Denumire bun</Text>
            <Text style={[styles.tableCell2, styles.tableCellHeader]}>Stare</Text>
            <Text style={[styles.tableCell3, styles.tableCellHeader]}>Observații</Text>
          </View>
          {Array.from({ length: EMPTY_ROWS }).map((_, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
            </View>
          ))}
        </View>

        {/* V. Chei și accesorii predate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Chei și Accesorii Predate</Text>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Seturi de chei de intrare:</Text>
            <View style={styles.contorLine} />
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Chei cutie poștală:</Text>
            <View style={styles.contorLine} />
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Telecomenzi garaj/interfon:</Text>
            <View style={styles.contorLine} />
          </View>
          <View style={styles.contor}>
            <Text style={styles.contorLabel}>Carduri/ecusoane acces:</Text>
            <View style={styles.contorLine} />
          </View>
        </View>

        {/* VI. Declarație utilități */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Declarație privind Utilitățile</Text>
          <Text style={styles.paragraph}>
            Locatorul declară că la data prezentei predări nu există facturi restante sau datorii
            neachitate la furnizorii de utilități (energie electrică, gaz, apă, internet, televiziune)
            aferente proprietății mai sus menționate.
          </Text>
        </View>

        {/* VII. Mențiune exemplare */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Prezentul proces verbal face parte integrantă din Contractul de Închiriere
            încheiat la data de <Text style={styles.bold}>{data.dataContract}</Text> și
            s-a întocmit în două exemplare originale, câte unul pentru fiecare parte.
          </Text>
        </View>

        {/* VIII. Semnături */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locator</Text>
            <Text style={styles.signatureName}>{data.locatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Locatar</Text>
            <Text style={styles.signatureName}>{data.locatarNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generat prin FaraNotar.ro</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
