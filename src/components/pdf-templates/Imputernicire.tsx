import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ImputernicireData } from "@/lib/types";

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
  section: { marginBottom: 18 },
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
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 50 },
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
  data: ImputernicireData;
}

export default function Imputernicire({ data }: Props) {
  return (
    <Document title="Imputernicire" author="Documente.ro" creator="Documente.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Imputernicire</Text>
        <Text style={styles.subtitle}>
          Incheiata astazi, {data.data}, in {data.locul}
        </Text>

        {/* Mandant */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Mandantul (cel care imputerniceste)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.mandantNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.mandantCNP}</Text>
          </View>
          {data.mandantCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
              <Text style={styles.value}>{data.mandantCI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.mandantAdresa}</Text>
          </View>
        </View>

        {/* Mandatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Mandatarul (imputernicitul)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.mandatarNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.mandatarCNP}</Text>
          </View>
          {data.mandatarCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
              <Text style={styles.value}>{data.mandatarCI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.mandatarAdresa}</Text>
          </View>
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Obiectul Mandatului</Text>
          <Text style={styles.paragraph}>
            Prin prezenta imputernicire, Mandantul{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.mandantNume}</Text>{" "}
            imputerniceste pe Mandatarul{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.mandatarNume}</Text>{" "}
            sa efectueze urmatoarele acte si operatiuni in numele sau:
          </Text>
          <Text style={styles.paragraph}>{data.obiect}</Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Durata Imputernicirii</Text>
          <Text style={styles.paragraph}>
            Prezenta imputernicire este valabila pana la data de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.dataExpirare}</Text>,
            daca nu este revocata anterior de catre Mandant.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Mandantul declara ca imputerniceste Mandatarul cu toate drepturile
            necesare pentru indeplinirea obiectului prezentului mandat, conform
            art. 2009-2071 din Codul Civil roman.
          </Text>
          <Text style={styles.paragraph}>
            Prezentul act este incheiat sub semnatura privata, in doua exemplare
            originale, cate unul pentru fiecare parte. Mandantul isi rezerva
            dreptul de a revoca prezenta imputernicire oricand, prin notificare
            scrisa catre Mandatar.
          </Text>
        </View>

        {/* Semnaturi */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Mandant</Text>
            <Text style={styles.signatureName}>{data.mandantNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Mandatar</Text>
            <Text style={styles.signatureName}>{data.mandatarNume}</Text>
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
