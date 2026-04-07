import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures } from "@/lib/pdfFonts";
import { ImputernicireData } from "@/lib/types";

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
  section: { marginBottom: 18 },
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
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 50 },
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
  data: ImputernicireData;
}

export default function Imputernicire({ data: rawData }: Props) {
  const data = fixData(rawData);
  return (
    <Document title="Împuternicire" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Împuternicire</Text>
        <Text style={styles.subtitle}>
          Încheiată astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Mandant */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Mandantul (cel care împuternicește)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.mandantNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.mandantCNP}</Text>
          </View>
          {data.mandantCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
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
          <Text style={styles.sectionTitle}>II. Mandatarul (împuternicitul)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.mandatarNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.mandatarCNP}</Text>
          </View>
          {data.mandatarCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.mandatarCI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.mandatarAdresa}</Text>
          </View>
          {data.mandatarContact && (
            <View style={styles.row}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>{data.mandatarContact}</Text>
            </View>
          )}
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Obiectul Mandatului</Text>
          <Text style={styles.paragraph}>
            Prin prezenta împuternicire, Mandantul{" "}
            <Text style={styles.bold}>{data.mandantNume}</Text>{" "}
            împuternicește pe Mandatarul{" "}
            <Text style={styles.bold}>{data.mandatarNume}</Text>{" "}
            să efectueze următoarele acte și operațiuni în numele și pe seama Mandantului:
          </Text>
          <Text style={styles.paragraph}>{data.obiect}</Text>
          {data.poateDelegaTert && (
            <Text style={styles.paragraph}>
              Mandatarul este autorizat să substituie un terț pentru
              îndeplinirea prezentului mandat, conform art. 2023 din Codul
              Civil român.
            </Text>
          )}
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Durata Împuternicirii</Text>
          <Text style={styles.paragraph}>
            Prezenta împuternicire este valabilă până la data de{" "}
            <Text style={styles.bold}>{data.dataExpirare}</Text>,
            dacă nu este revocată anterior de către Mandant.
          </Text>
        </View>

        {/* Clauze finale + Semnături — wrap=false garantează că nu ajung separate pe pagini diferite */}
        <View wrap={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>V. Clauze Finale</Text>
            <Text style={styles.paragraph}>
              Prezenta împuternicire constituie un mandat special pentru actele și
              operațiunile expres indicate la Art. III, conform art. 2010 și
              art. 2016 din Codul Civil român.
            </Text>
            <Text style={styles.paragraph}>
              {f("Mandatarul este obligat să acționeze în limitele împuternicirii și exclusiv în interesul Mandantului, să dea socoteală de îndeplinirea mandatului și să remită Mandantului tot ceea ce a primit în executarea mandatului (art. 2019 Cod Civil).")}
            </Text>
            <Text style={styles.paragraph}>
              {f("Prezentul act este încheiat sub semnătură privată, în două exemplare originale, câte unul pentru fiecare parte. Mandantul își rezervă dreptul de a revoca prezenta împuternicire oricând, prin notificare scrisă către Mandatar (art. 2031 Cod Civil).")}
            </Text>
          </View>

          {/* Semnături */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Mandant</Text>
              <Text style={styles.signatureName}>{data.mandantNume}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureHint}>Semnătură</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Mandatar</Text>
              <Text style={styles.signatureName}>{data.mandatarNume}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureHint}>Semnătură</Text>
            </View>
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
