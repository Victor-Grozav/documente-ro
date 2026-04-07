import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures as fl } from "@/lib/pdfFonts";
import { AdeverintaSalariatData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.5,
  },
  headerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 2,
  },
  companyName: {
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 3,
  },
  companyDetail: {
    fontSize: 9,
    color: "#555",
    marginBottom: 2,
  },
  nrLine: {
    fontSize: 9,
    color: "#555",
    textAlign: "right",
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  paragraph: { fontSize: 11, marginBottom: 8, textAlign: "justify" },
  section: { marginBottom: 10 },
  scopLine: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 12,
    textAlign: "justify",
    color: "#333",
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  signatureBox: { width: "50%", alignItems: "center" },
  signatureLabel: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  signatureName: { fontSize: 10, marginBottom: 4 },
  signatureLine: { borderTopWidth: 1, borderTopColor: "#333", width: "100%", marginTop: 30 },
  signatureHint: { fontSize: 8, color: "#888", marginTop: 4, textAlign: "center" },
  stampBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    width: 100,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  stampHint: { fontSize: 8, color: "#bbb", textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 160, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
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
  data: AdeverintaSalariatData;
}

export default function AdeverintaSalariat({ data: rawData }: Props) {
  const data = fixData(rawData) as AdeverintaSalariatData;

  return (
    <Document title="Adeverință de Salariat" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>

        {/* Header company */}
        <View style={styles.headerBox}>
          <Text style={styles.companyName}>{data.angajatorNume}</Text>
          {data.angajatorCUI ? <Text style={styles.companyDetail}>CUI: {data.angajatorCUI}</Text> : null}
          {data.angajatorAdresa ? <Text style={styles.companyDetail}>Adresă: {data.angajatorAdresa}</Text> : null}
          {data.numarAdeverinta ? (
            <Text style={styles.nrLine}>Nr. {data.numarAdeverinta} / {data.data}</Text>
          ) : (
            <Text style={styles.nrLine}>Data: {data.data}</Text>
          )}
        </View>

        <Text style={styles.title}>Adeverință</Text>
        <Text style={styles.subtitle}>Emisă în {data.locul}, {data.data}</Text>

        {/* Body */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Prin prezenta adeverim că{" "}
            <Text style={styles.bold}>{data.angajatNume}</Text>
            {data.angajatCNP ? <Text>, CNP <Text style={styles.bold}>{data.angajatCNP}</Text></Text> : null},
            {" "}este angajat/ă al/a societății noastre începând cu data de{" "}
            <Text style={styles.bold}>{data.dataAngajarii}</Text>, în funcția de{" "}
            <Text style={styles.bold}>{data.angajatFunctia}</Text>
            {data.departament ? <Text>, în cadrul departamentului <Text style={styles.bold}>{data.departament}</Text></Text> : null},
            în baza contractului individual de muncă, conform legislației muncii în vigoare.
          </Text>

          {data.includeSalariu && data.salariu ? (
            <Text style={styles.paragraph}>
              {fl("La data prezentei adeverințe, titularul beneficiază de un salariu net de")}{" "}
              <Text style={styles.bold}>{data.salariu} RON/lună</Text>.
            </Text>
          ) : null}

          <Text style={styles.scopLine}>
            {fl("Prezenta adeverință a fost eliberată la solicitarea titularului, pentru a servi la")}{" "}
            <Text style={styles.bold}>{data.scopAdeverinta}</Text>.
          </Text>
        </View>

        {/* Summary + Semnătură — wrap=false garantează că nu ajung separate pe pagini diferite */}
        <View wrap={false}>
          <View style={[styles.section, { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 12 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>Angajat:</Text>
              <Text style={styles.value}>{data.angajatNume}</Text>
            </View>
            {data.angajatCNP ? (
              <View style={styles.row}>
                <Text style={styles.label}>CNP:</Text>
                <Text style={styles.value}>{data.angajatCNP}</Text>
              </View>
            ) : null}
            <View style={styles.row}>
              <Text style={styles.label}>Funcția:</Text>
              <Text style={styles.value}>{data.angajatFunctia}{data.departament ? ` - ${data.departament}` : ""}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Angajat din:</Text>
              <Text style={styles.value}>{data.dataAngajarii}</Text>
            </View>
            {data.includeSalariu && data.salariu ? (
              <View style={styles.row}>
                <Text style={styles.label}>Salariu net:</Text>
                <Text style={styles.value}>{data.salariu} RON/lună</Text>
              </View>
            ) : null}
            <View style={styles.row}>
              <Text style={styles.label}>Scop:</Text>
              <Text style={styles.value}>{data.scopAdeverinta}</Text>
            </View>
          </View>

          {/* Semnătură */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Reprezentant Legal</Text>
              <Text style={styles.signatureName}>{data.angajatorReprezentant}</Text>
              <Text style={styles.signatureName}>{data.angajatorNume}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureHint}>Semnătură + Ștampilă</Text>
              <View style={styles.stampBox}>
                <Text style={styles.stampHint}>Ștampilă{"\n"}societate</Text>
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
