import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { AcordConfidentialitateData } from "@/lib/types";

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
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  titleSub: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
    color: "#333",
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
  data: AcordConfidentialitateData;
}

export default function AcordConfidentialitate({ data }: Props) {
  return (
    <Document title="Acord de Confidentialitate (NDA)" author="Documente.ro" creator="Documente.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Acord de Confidentialitate</Text>
        <Text style={styles.titleSub}>(Non-Disclosure Agreement)</Text>
        <Text style={styles.subtitle}>
          Incheiat astazi, {data.data}, in {data.locul}
        </Text>

        {/* Parti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Partile Contractante</Text>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Partea 1:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Denumire / Nume:</Text>
            <Text style={styles.value}>{data.parte1Nume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calitate:</Text>
            <Text style={styles.value}>{data.parte1Calitate}</Text>
          </View>
          <View style={[styles.row, { marginBottom: 12 }]}>
            <Text style={styles.label}>Adresa / Sediu:</Text>
            <Text style={styles.value}>{data.parte1Adresa}</Text>
          </View>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>Partea 2:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Denumire / Nume:</Text>
            <Text style={styles.value}>{data.parte2Nume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calitate:</Text>
            <Text style={styles.value}>{data.parte2Calitate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresa / Sediu:</Text>
            <Text style={styles.value}>{data.parte2Adresa}</Text>
          </View>
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul Acordului</Text>
          <Text style={styles.paragraph}>
            Partile convin ca urmatoarele categorii de informatii sa fie tratate
            ca strict confidentiale:
          </Text>
          <Text style={styles.paragraph}>{data.obiectConfidentialitate}</Text>
        </View>

        {/* Obligatia de confidentialitate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Obligatia de Confidentialitate</Text>
          <Text style={styles.paragraph}>
            Fiecare parte se obliga sa nu divulge, sa nu transmita si sa nu
            utilizeze informatiile confidentiale ale celeilalte parti in niciun
            alt scop decat cel agreat in mod expres, fara acordul prealabil
            scris al partii divulgatoare.
          </Text>
          <Text style={styles.paragraph}>
            Obligatia de confidentialitate se aplica tuturor angajatilor,
            colaboratorilor si reprezentantilor fiecarei parti care au acces
            la informatiile confidentiale.
          </Text>
        </View>

        {/* Exceptii */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Exceptii</Text>
          <Text style={styles.paragraph}>
            Obligatia de confidentialitate nu se aplica informatiilor care: (a)
            sunt sau devin publice fara culpa partii receptoare; (b) erau deja
            cunoscute partii receptoare la data divulgarii; (c) sunt furnizate
            de o terta parte fara restrictii de confidentialitate; (d) trebuie
            divulgate prin lege sau ordin judecatoresc, cu notificarea prealabila
            a partii divulgatoare.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Durata</Text>
          <Text style={styles.paragraph}>
            Prezentul acord este valabil pentru o perioada de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.durataAni} ani</Text>{" "}
            de la data semnarii. Obligatiile de confidentialitate supravietuiesc
            incetarii acordului pe aceeasi perioada.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Incalcarea prezentului acord da dreptul partii lezate la despagubiri
            pentru prejudiciul cauzat, inclusiv daune indirecte si pierderi de
            profit. Prezentul acord este guvernat de legislatia romana. Litigiile
            vor fi solutionate de instantele competente din Romania.
          </Text>
          <Text style={styles.paragraph}>
            Prezentul act este incheiat sub semnatura privata, in doua exemplare
            originale, cate unul pentru fiecare parte.
          </Text>
        </View>

        {/* Semnaturi */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Partea 1</Text>
            <Text style={styles.signatureName}>{data.parte1Nume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura / Stampila</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Partea 2</Text>
            <Text style={styles.signatureName}>{data.parte2Nume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura / Stampila</Text>
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
