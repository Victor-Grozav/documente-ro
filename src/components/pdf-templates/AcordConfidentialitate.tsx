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
    <Document title="Acord de Confidențialitate (NDA)" author="Documente.ro" creator="Documente.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Acord de Confidențialitate</Text>
        <Text style={styles.titleSub}>(Non-Disclosure Agreement)</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Părți */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile Contractante</Text>

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
            <Text style={styles.label}>Adresă / Sediu:</Text>
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
            <Text style={styles.label}>Adresă / Sediu:</Text>
            <Text style={styles.value}>{data.parte2Adresa}</Text>
          </View>
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul Acordului</Text>
          <Text style={styles.paragraph}>
            Părțile convin ca următoarele categorii de informații să fie tratate
            ca strict confidențiale:
          </Text>
          <Text style={styles.paragraph}>{data.obiectConfidentialitate}</Text>
        </View>

        {/* Obligația de confidențialitate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Obligația de Confidențialitate</Text>
          <Text style={styles.paragraph}>
            Fiecare parte se obligă să nu divulge, să nu transmită și să nu
            utilizeze informațiile confidențiale ale celeilalte părți în niciun
            alt scop decât cel agreat în mod expres, fără acordul prealabil
            scris al părții divulgatoare.
          </Text>
          <Text style={styles.paragraph}>
            Obligația de confidențialitate se aplică tuturor angajaților,
            colaboratorilor și reprezentanților fiecărei părți care au acces
            la informațiile confidențiale.
          </Text>
        </View>

        {/* Excepții */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Excepții</Text>
          <Text style={styles.paragraph}>
            Obligația de confidențialitate nu se aplică informațiilor care: (a)
            sunt sau devin publice fără culpa părții receptoare; (b) erau deja
            cunoscute părții receptoare la data divulgării; (c) sunt furnizate
            de o terță parte fără restricții de confidențialitate; (d) trebuie
            divulgate prin lege sau ordin judecătoresc, cu notificarea prealabilă
            a părții divulgatoare.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Durata</Text>
          <Text style={styles.paragraph}>
            Prezentul acord este valabil pentru o perioadă de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.durataAni} ani</Text>{" "}
            de la data semnării. Obligațiile de confidențialitate supraviețuiesc
            încetării acordului pe aceeași perioadă.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Încălcarea prezentului acord dă dreptul părții lezate la despăgubiri
            pentru prejudiciul cauzat, inclusiv daune indirecte și pierderi de
            profit. Prezentul acord este guvernat de legislația română. Litigiile
            vor fi soluționate de instanțele competente din România.
          </Text>
          <Text style={styles.paragraph}>
            Prezentul act este încheiat sub semnătură privată, în două exemplare
            originale, câte unul pentru fiecare parte.
          </Text>
        </View>

        {/* Semnături */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Partea 1</Text>
            <Text style={styles.signatureName}>{data.parte1Nume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură / Ștampilă</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Partea 2</Text>
            <Text style={styles.signatureName}>{data.parte2Nume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură / Ștampilă</Text>
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
