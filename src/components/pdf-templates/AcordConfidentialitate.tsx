import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures } from "@/lib/pdfFonts";
import { AcordConfidentialitateData } from "@/lib/types";

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
  data: AcordConfidentialitateData;
}

export default function AcordConfidentialitate({ data: rawData }: Props) {
  const data = fixData(rawData);
  const unitateTiMP = data.durataAni === "1" ? "an" : "ani";
  return (
    <Document title="Acord de Confidențialitate (NDA)" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Acord de Confidențialitate</Text>
        <Text style={styles.titleSub}>(Non-Disclosure Agreement)</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Părți */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile Contractante</Text>

          <Text style={[styles.paragraph, styles.bold]}>Partea 1:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Denumire / Nume:</Text>
            <Text style={styles.value}>{data.parte1Nume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calitate:</Text>
            <Text style={styles.value}>{data.parte1Calitate}</Text>
          </View>
          {data.parte1CUI && (
            <View style={styles.row}>
              <Text style={styles.label}>CUI / CIF:</Text>
              <Text style={styles.value}>{data.parte1CUI}</Text>
            </View>
          )}
          {data.parte1ReprezentantLegal && (
            <View style={styles.row}>
              <Text style={styles.label}>Reprezentant legal:</Text>
              <Text style={styles.value}>{data.parte1ReprezentantLegal}</Text>
            </View>
          )}
          {data.parte1CNP && (
            <View style={styles.row}>
              <Text style={styles.label}>CNP:</Text>
              <Text style={styles.value}>{data.parte1CNP}</Text>
            </View>
          )}
          {data.parte1CI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.parte1CI}</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 12 }]}>
            <Text style={styles.label}>Adresă / Sediu:</Text>
            <Text style={styles.value}>{data.parte1Adresa}</Text>
          </View>

          <Text style={[styles.paragraph, styles.bold]}>Partea 2:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Denumire / Nume:</Text>
            <Text style={styles.value}>{data.parte2Nume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calitate:</Text>
            <Text style={styles.value}>{data.parte2Calitate}</Text>
          </View>
          {data.parte2CUI && (
            <View style={styles.row}>
              <Text style={styles.label}>CUI / CIF:</Text>
              <Text style={styles.value}>{data.parte2CUI}</Text>
            </View>
          )}
          {data.parte2ReprezentantLegal && (
            <View style={styles.row}>
              <Text style={styles.label}>Reprezentant legal:</Text>
              <Text style={styles.value}>{data.parte2ReprezentantLegal}</Text>
            </View>
          )}
          {data.parte2CNP && (
            <View style={styles.row}>
              <Text style={styles.label}>CNP:</Text>
              <Text style={styles.value}>{data.parte2CNP}</Text>
            </View>
          )}
          {data.parte2CI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.parte2CI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Adresă / Sediu:</Text>
            <Text style={styles.value}>{data.parte2Adresa}</Text>
          </View>
        </View>

        {/* Obiect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul Acordului</Text>
          <Text style={styles.paragraph}>
            {f("Părțile convin ca următoarele categorii de informații să fie tratate ca strict confidențiale:")}
          </Text>
          <Text style={styles.paragraph}>{data.obiectConfidentialitate}</Text>
        </View>

        {/* Obligația de confidențialitate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Obligația de Confidențialitate</Text>
          {data.tipNDA === "unilateral" ? (
            <>
              <Text style={styles.paragraph}>
                Prezentul acord este unilateral. Numai{" "}
                <Text style={styles.bold}>{data.parte2Nume}</Text> (Partea 2)
                are obligații de confidențialitate față de{" "}
                <Text style={styles.bold}>{data.parte1Nume}</Text> (Partea 1).
              </Text>
              <Text style={styles.paragraph}>
                Partea 2 se obligă să nu divulge, să nu transmită și să nu
                utilizeze informațiile confidențiale ale Părții 1 în niciun
                alt scop decât cel convenit în mod expres, fără acordul prealabil
                scris al Părții 1.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.paragraph}>
                {f("Fiecare parte se obligă să nu divulge, să nu transmită și să nu utilizeze informațiile confidențiale ale celeilalte părți în niciun alt scop decât cel convenit în mod expres, fără acordul prealabil scris al părții divulgatoare.")}
              </Text>
              <Text style={styles.paragraph}>
                {f("Obligația de confidențialitate se aplică tuturor angajaților, colaboratorilor și reprezentanților fiecărei părți care au acces la informațiile confidențiale.")}
              </Text>
            </>
          )}
        </View>

        {/* Excepții */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Excepții</Text>
          <Text style={styles.paragraph}>
            Obligația de confidențialitate nu se aplică informațiilor care: (a)
            sunt sau devin publice fără culpa părții receptoare; (b) erau deja
            cunoscute părții receptoare la data divulgării; (c) sunt furnizate
            de o terță parte fără restricții de confidențialitate; (d) trebuie
            divulgate prin lege sau hotărâre judecătorească, cu notificarea
            prealabilă a părții divulgatoare.
          </Text>
        </View>

        {/* Durata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Durata</Text>
          <Text style={styles.paragraph}>
            Prezentul acord este valabil pentru o perioadă de{" "}
            <Text style={styles.bold}>{data.durataAni} {unitateTiMP}</Text>{" "}
            de la data semnării. Obligațiile de confidențialitate supraviețuiesc
            încetării acordului și rămân în vigoare pentru o perioadă egală de{" "}
            <Text style={styles.bold}>{data.durataAni} {unitateTiMP}</Text>{" "}
            calculată de la data încetării.
          </Text>
          {data.tipNDA === "unilateral" ? (
            <Text style={styles.paragraph}>
              {f("La încetarea prezentului acord, Partea 2 se obligă să returneze sau să distrugă, la cerere, toate documentele și suporturile conținând informații confidențiale ale Părții 1.")}
            </Text>
          ) : (
            <Text style={styles.paragraph}>
              {f("La încetarea prezentului acord, fiecare parte se obligă să returneze sau să distrugă, la cerere, toate documentele și suporturile conținând informații confidențiale ale celeilalte părți.")}
            </Text>
          )}
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            {f("Încălcarea prezentului acord dă dreptul părții lezate la despăgubiri pentru prejudiciile directe și previzibile cauzate, inclusiv beneficiul nerealizat (lucrum cessans), conform art. 1530 Cod Civil. Prezentul acord este guvernat de legislația română. Litigiile vor fi soluționate de instanțele competente din România.")}
          </Text>
          {data.penalitate && (
            <Text style={styles.paragraph}>
              În cazul încălcării obligațiilor de confidențialitate, partea în
              culpă datorează celeilalte părți o penalitate de{" "}
              <Text style={styles.bold}>{data.penalitate} RON</Text>,
              indiferent de prejudiciul efectiv suferit.
            </Text>
          )}
          <Text style={styles.paragraph}>
            {f("Prezentul act este încheiat sub semnătură privată, în două exemplare originale, câte unul pentru fiecare parte.")}
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
          <Text style={styles.footerText}>Generat prin FaraNotar.ro</Text>
          <Text style={[styles.footerText, { flex: 1, textAlign: "center" }]}>Model document · utilizatorul răspunde pentru corectitudinea datelor și capacitatea semnatarilor</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
