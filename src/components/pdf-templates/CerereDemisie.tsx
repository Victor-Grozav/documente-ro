import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures as fl } from "@/lib/pdfFonts";
import { CerereDemisieData } from "@/lib/types";

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
  toBlock: { marginBottom: 24 },
  toLine: { fontSize: 11, marginBottom: 3 },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  paragraph: { fontSize: 11, marginBottom: 10, textAlign: "justify" },
  section: { marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 180, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  signatureSection: { flexDirection: "row", justifyContent: "flex-end", marginTop: 40 },
  signatureBox: { width: "45%", alignItems: "center" },
  signatureLabel: { fontSize: 10, fontFamily: "Roboto", fontWeight: "bold", marginBottom: 4, textTransform: "uppercase" },
  signatureName: { fontSize: 10, marginBottom: 30 },
  signatureLine: { borderTopWidth: 1, borderTopColor: "#333", width: "100%", marginTop: 40 },
  signatureHint: { fontSize: 8, color: "#888", marginTop: 4 },
  confirmSection: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
  },
  confirmTitle: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 12,
    color: "#666",
  },
  confirmRow: { flexDirection: "row", justifyContent: "space-between" },
  confirmBox: { width: "45%" },
  confirmLine: { borderTopWidth: 1, borderTopColor: "#aaa", width: "100%", marginTop: 36 },
  confirmHint: { fontSize: 8, color: "#aaa", marginTop: 3 },
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
  data: CerereDemisieData;
}

export default function CerereDemisie({ data: rawData }: Props) {
  const data = fixData(rawData) as CerereDemisieData;

  return (
    <Document title="Cerere de Demisie" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Cerere de Demisie</Text>
        <Text style={styles.subtitle}>Întocmită în {data.locul}, {data.data}</Text>

        {/* To */}
        <View style={styles.toBlock}>
          <Text style={styles.toLine}>Către,</Text>
          <Text style={styles.toLine}>
            <Text style={styles.bold}>{data.angajatorNume}</Text>
          </Text>
          <Text style={styles.toLine}>Conducerea / Departamentul Resurse Umane</Text>
        </View>

        {/* Body */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Subsemnatul/a <Text style={styles.bold}>{data.angajatNume}</Text>,
            angajat/ă în funcția de <Text style={styles.bold}>{data.angajatFunctia}</Text> în
            cadrul <Text style={styles.bold}>{data.angajatorNume}</Text>, prin prezenta
            {fl("îmi depun")} <Text style={styles.bold}>demisia</Text> {fl("din funcția deținută, în conformitate cu prevederile art. 81 alin. (1) din Legea nr. 53/2003 - Codul Muncii, cu modificările și completările ulterioare.")}
          </Text>

          <Text style={styles.paragraph}>
            {fl("Perioada de preaviz respectată este de")}{" "}
            <Text style={styles.bold}>{data.preavizZile} {fl("zile lucrătoare")}</Text>,
            {fl(" ultima zi de activitate urmând a fi")}{" "}
            <Text style={styles.bold}>{data.dataUltimaZi}</Text>.
          </Text>

          {data.motivDemisie ? (
            <Text style={styles.paragraph}>
              Motivul demisiei: {data.motivDemisie}
            </Text>
          ) : null}

          <Text style={styles.paragraph}>
            {fl("Prin prezenta mă angajez să predau toate sarcinile de serviciu, documentele și bunurile aflate în responsabilitatea mea până la data ultimei zile de activitate.")}
          </Text>

          <Text style={styles.paragraph}>
            {fl("Solicit eliberarea adeverinței de vechime și a documentelor aferente încetării raportului de muncă, conform art. 34 alin. (5) din Legea nr. 53/2003 - Codul Muncii.")}
          </Text>
        </View>

        {/* Summary */}
        <View style={[styles.section, { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 12 }]}>
          <View style={styles.row}>
            <Text style={styles.label}>Angajat:</Text>
            <Text style={styles.value}>{data.angajatNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Funcția:</Text>
            <Text style={styles.value}>{data.angajatFunctia}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Angajator:</Text>
            <Text style={styles.value}>{data.angajatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Preaviz:</Text>
            <Text style={styles.value}>{data.preavizZile} zile lucrătoare</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ultima zi de muncă:</Text>
            <Text style={styles.value}>{data.dataUltimaZi}</Text>
          </View>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection} wrap={false}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Angajat</Text>
            <Text style={styles.signatureName}>{data.angajatNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
        </View>

        {/* Confirmation section */}
        <View style={styles.confirmSection} wrap={false}>
          <Text style={styles.confirmTitle}>{fl("Confirmare primire (completată de angajator)")}</Text>
          <View style={styles.confirmRow}>
            <View style={styles.confirmBox}>
              <Text style={{ fontSize: 9, color: "#888", marginBottom: 4 }}>
                Primit în data de: ________________
              </Text>
              <View style={styles.confirmLine} />
              <Text style={styles.confirmHint}>Semnătură reprezentant / HR</Text>
            </View>
            <View style={styles.confirmBox}>
              <Text style={{ fontSize: 9, color: "#888", marginBottom: 4 }}>
                Nr. înregistrare: ________________
              </Text>
              <View style={styles.confirmLine} />
              <Text style={styles.confirmHint}>Ștampilă societate</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generat prin FaraNotar.ro</Text>
          <Text style={[styles.footerText, { flex: 1, textAlign: "center" }]}>Model document · utilizatorul răspunde pentru corectitudinea datelor</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
