import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { ContractVanzareData } from "@/lib/types";

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
  section: {
    marginBottom: 18,
  },
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
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 140,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#444",
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: "justify",
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  signatureLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  signatureName: {
    fontSize: 10,
    marginBottom: 30,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    width: "100%",
    marginTop: 40,
  },
  signatureHint: {
    fontSize: 8,
    color: "#888",
    marginTop: 4,
  },
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
  footerText: {
    fontSize: 8,
    color: "#aaa",
  },
});

function numarInLitere(n: number): string {
  const unitati = ["", "unu", "doi", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă",
    "zece", "unsprezece", "doisprezece", "treisprezece", "paisprezece", "cincisprezece",
    "șaisprezece", "șaptesprezece", "optsprezece", "nouăsprezece"];
  const zeci = ["", "", "douăzeci", "treizeci", "patruzeci", "cincizeci",
    "șaizeci", "șaptezeci", "optzeci", "nouăzeci"];
  if (n === 0) return "zero";
  if (n < 20) return unitati[n];
  if (n < 100) return zeci[Math.floor(n / 10)] + (n % 10 !== 0 ? " și " + unitati[n % 10] : "");
  if (n < 1000) return unitati[Math.floor(n / 100)] + " sute" + (n % 100 !== 0 ? " " + numarInLitere(n % 100) : "");
  return n.toString();
}

interface Props {
  data: ContractVanzareData;
}

export default function ContractVanzareCumparare({ data }: Props) {
  const pretNumar = parseFloat(data.pret) || 0;
  const pretLitere = numarInLitere(Math.floor(pretNumar));

  return (
    <Document
      title="Contract de Vânzare-Cumpărare"
      author="Documente.ro"
      creator="Documente.ro"
    >
      <Page size="A4" style={styles.page}>
        {/* Titlu */}
        <Text style={styles.title}>Contract de Vânzare-Cumpărare</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* Părți contractante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Părțile Contractante</Text>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>
            Vânzătorul:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.vanzatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.vanzatorCNP}</Text>
          </View>
          {data.vanzatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.vanzatorCI}</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 12 }]}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.vanzatorAdresa}</Text>
          </View>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>
            Cumpărătorul:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume și prenume:</Text>
            <Text style={styles.value}>{data.cumparatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.cumparatorCNP}</Text>
          </View>
          {data.cumparatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie și nr. CI:</Text>
              <Text style={styles.value}>{data.cumparatorCI}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.cumparatorAdresa}</Text>
          </View>
        </View>

        {/* Obiectul contractului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Obiectul Contractului</Text>
          <Text style={styles.paragraph}>
            Vânzătorul vinde, iar Cumpărătorul cumpără următorul bun:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Descriere bun:</Text>
            <Text style={styles.value}>{data.bunDescriere}</Text>
          </View>
          {data.bunSerie && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie / Nr.:</Text>
              <Text style={styles.value}>{data.bunSerie}</Text>
            </View>
          )}
        </View>

        {/* Prețul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Prețul</Text>
          <Text style={styles.paragraph}>
            Prețul convenit de părți pentru bunul menționat este de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {data.pret} {data.moneda}
            </Text>{" "}
            ({pretLitere} {data.moneda.toLowerCase()}), sumă achitată integral la
            data semnării prezentului contract, prin{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.modalitataPlata}</Text>.
          </Text>
        </View>

        {/* Predarea bunului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Predarea Bunului</Text>
          <Text style={styles.paragraph}>
            Predarea bunului se va efectua la data semnării prezentului contract,
            la următoarea locație:{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.locPredare}</Text>.
            Predarea se consideră efectuată la momentul în care Cumpărătorul intră
            în posesia efectivă a bunului.
          </Text>
          <Text style={styles.paragraph}>
            Bunul se vinde și se cumpără în starea tehnică și estetică văzută și
            acceptată de Cumpărător la data încheierii prezentului contract.
          </Text>
        </View>

        {/* Declarația vânzătorului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Declarația Vânzătorului</Text>
          <Text style={styles.paragraph}>
            Vânzătorul declară pe propria răspundere că bunul descris la Art. II
            este proprietatea sa exclusivă, nu este grevat de sarcini, gajuri,
            ipoteci sau orice alte drepturi ale terților, nu face obiectul vreunui
            litigiu, nu este urmărit sau sechestrat și că are dreptul deplin de
            a-l înstrăina.
          </Text>
        </View>

        {/* Obligațiile părților */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligațiile Părților</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Vânzătorul</Text> se
            obligă să predea bunul la locația și în condițiile stabilite prin
            prezentul contract și să garanteze Cumpărătorul contra evicțiunii și
            viciilor ascunse, conform dispozițiilor Codului Civil român.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Cumpărătorul</Text> se
            obligă să achite prețul convenit la data semnării și să preia bunul
            în condițiile stabilite prin prezentul contract.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Prezentul contract este încheiat sub semnătură privată și este valabil
            fără autentificare notarială pentru bunurile mobile, conform art. 1674
            din Codul Civil român. Contractul reprezintă voința liberă și
            neviciată a părților și a fost încheiat în două exemplare originale,
            câte unul pentru fiecare parte.
          </Text>
          <Text style={styles.paragraph}>
            Orice modificare a prezentului contract se va face numai prin acordul
            scris al ambelor părți. Litigiile izvorând din prezentul contract vor
            fi soluționate pe cale amiabilă, iar în caz de neînțelegere, de către
            instanțele judecătorești competente din România.
          </Text>
        </View>

        {/* Semnături */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Vânzător</Text>
            <Text style={styles.signatureName}>{data.vanzatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Cumpărător</Text>
            <Text style={styles.signatureName}>{data.cumparatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnătură</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generat prin Documente.ro</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
