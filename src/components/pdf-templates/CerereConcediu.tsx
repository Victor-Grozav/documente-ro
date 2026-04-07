import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures as fl } from "@/lib/pdfFonts";
import { CerereConceduData } from "@/lib/types";

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
  toBlock: {
    marginBottom: 24,
  },
  toLine: {
    fontSize: 11,
    marginBottom: 3,
  },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  paragraph: { fontSize: 11, marginBottom: 10, textAlign: "justify" },
  section: { marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 180, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  signatureSection: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20 },
  signatureBox: { width: "45%", alignItems: "center" },
  signatureLabel: { fontSize: 10, fontFamily: "Roboto", fontWeight: "bold", marginBottom: 4, textTransform: "uppercase" },
  signatureName: { fontSize: 10, marginBottom: 8 },
  signatureLine: { borderTopWidth: 1, borderTopColor: "#333", width: "100%", marginTop: 24 },
  signatureHint: { fontSize: 8, color: "#888", marginTop: 4 },
  approvalSection: { marginTop: 20, borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 12 },
  approvalTitle: { fontSize: 10, fontFamily: "Roboto", fontWeight: "bold", textTransform: "uppercase", marginBottom: 10, color: "#666" },
  approvalRow: { flexDirection: "row", justifyContent: "space-between" },
  approvalBox: { width: "45%" },
  approvalLabel: { fontSize: 9, color: "#888", marginBottom: 10 },
  approvalLine: { borderTopWidth: 1, borderTopColor: "#aaa", width: "100%" },
  approvalHint: { fontSize: 8, color: "#aaa", marginTop: 3 },
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
  data: CerereConceduData;
}

const TIP_LABEL: Record<CerereConceduData["tipConcediu"], string> = {
  "odihnă": "concediu de odihnă",
  "fără plată": "concediu fără plată",
  "studii": "concediu de studii",
};

export default function CerereConcediu({ data: rawData }: Props) {
  const data = fixData(rawData) as CerereConceduData;
  const tipLabel = TIP_LABEL[data.tipConcediu] || data.tipConcediu;

  return (
    <Document title="Cerere de Concediu" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Cerere de Concediu</Text>
        <Text style={styles.subtitle}>Întocmită în {data.locul}, {data.data}</Text>

        {/* Towards */}
        <View style={styles.toBlock}>
          <Text style={styles.toLine}>Către,</Text>
          <Text style={styles.toLine}><Text style={styles.bold}>{data.angajatorNume}</Text></Text>
          <Text style={styles.toLine}>Conducerea / Departamentul Resurse Umane</Text>
        </View>

        {/* Body */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Subsemnatul/a <Text style={styles.bold}>{data.angajatNume}</Text>,
            angajat/ă în funcția de <Text style={styles.bold}>{data.angajatFunctia}</Text>
            {data.departament ? (
              <Text> în cadrul departamentului <Text style={styles.bold}>{data.departament}</Text>,{" "}</Text>
            ) : <Text>,{" "}</Text>}
            {fl("prin prezenta solicit aprobarea efectuării unui")} <Text style={styles.bold}>{tipLabel}</Text> {fl("în perioada")} <Text style={styles.bold}>{data.dataInceput} - {data.dataSfarsit}</Text>,
            {fl(" respectiv")} <Text style={styles.bold}>{data.nrZile} {Number(data.nrZile) === 1 ? fl("zi lucrătoare") : fl("zile lucrătoare")}</Text>.
          </Text>

          {data.observatii ? (
            <Text style={styles.paragraph}>
              Mențiuni suplimentare: {data.observatii}
            </Text>
          ) : null}

          <Text style={styles.paragraph}>
            Vă mulțumesc pentru înțelegere și aștept aprobarea dumneavoastră.
          </Text>
        </View>

        {/* Summary + Semnătură + Aprobare — wrap=false garantează că nu ajung separate pe pagini diferite */}
        <View wrap={false}>
          <View style={[styles.section, { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 12 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>Angajat:</Text>
              <Text style={styles.value}>{data.angajatNume}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Funcția:</Text>
              <Text style={styles.value}>{data.angajatFunctia}{data.departament ? ` - ${data.departament}` : ""}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tip concediu:</Text>
              <Text style={styles.value}>{tipLabel}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Perioadă:</Text>
              <Text style={styles.value}>{data.dataInceput} - {data.dataSfarsit}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Număr zile:</Text>
              <Text style={styles.value}>{data.nrZile} {Number(data.nrZile) === 1 ? fl("zi lucrătoare") : fl("zile lucrătoare")}</Text>
            </View>
          </View>

          {/* Semnătură solicitant */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Solicitant</Text>
              <Text style={styles.signatureName}>{data.angajatNume}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureHint}>Semnătură</Text>
            </View>
          </View>

          {/* Rubrică aprobare angajator */}
          <View style={styles.approvalSection}>
            <Text style={styles.approvalTitle}>{fl("Rubrică pentru aprobare (completată de angajator)")}</Text>
            <View style={styles.approvalRow}>
              <View style={styles.approvalBox}>
                <Text style={styles.approvalLabel}>Aprobat [ ] / Respins [ ]</Text>
                <View style={styles.approvalLine} />
                <Text style={styles.approvalHint}>Semnătura responsabilului HR / Manager</Text>
              </View>
              <View style={styles.approvalBox}>
                <Text style={styles.approvalLabel}>Data aprobării: ________________</Text>
                <View style={styles.approvalLine} />
                <Text style={styles.approvalHint}>Ștampilă societate</Text>
              </View>
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
