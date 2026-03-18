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
  const unitati = ["", "unu", "doi", "trei", "patru", "cinci", "sase", "sapte", "opt", "noua",
    "zece", "unsprezece", "doisprezece", "treisprezece", "paisprezece", "cincisprezece",
    "saisprezece", "saptesprezece", "optsprezece", "nouasprezece"];
  const zeci = ["", "", "douazeci", "treizeci", "patruzeci", "cincizeci",
    "saizeci", "saptezeci", "optzeci", "nouazeci"];
  if (n === 0) return "zero";
  if (n < 20) return unitati[n];
  if (n < 100) return zeci[Math.floor(n / 10)] + (n % 10 !== 0 ? " si " + unitati[n % 10] : "");
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
      title="Contract de Vanzare-Cumparare"
      author="Documente.ro"
      creator="Documente.ro"
    >
      <Page size="A4" style={styles.page}>
        {/* Titlu */}
        <Text style={styles.title}>Contract de Vanzare-Cumparare</Text>
        <Text style={styles.subtitle}>
          Incheiat astazi, {data.data}, in {data.locul}
        </Text>

        {/* Parti contractante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Partile Contractante</Text>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>
            Vanzatorul:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.vanzatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.vanzatorCNP}</Text>
          </View>
          {data.vanzatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
              <Text style={styles.value}>{data.vanzatorCI}</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 12 }]}>
            <Text style={styles.label}>Domiciliu:</Text>
            <Text style={styles.value}>{data.vanzatorAdresa}</Text>
          </View>

          <Text style={[styles.paragraph, { fontFamily: "Helvetica-Bold" }]}>
            Cumparatorul:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nume si prenume:</Text>
            <Text style={styles.value}>{data.cumparatorNume}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNP:</Text>
            <Text style={styles.value}>{data.cumparatorCNP}</Text>
          </View>
          {data.cumparatorCI && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie si nr. CI:</Text>
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
            Vanzatorul vinde, iar Cumparatorul cumpara urmatorul bun:
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

        {/* Pretul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Pretul</Text>
          <Text style={styles.paragraph}>
            Pretul convenit de parti pentru bunul mentionat este de{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {data.pret} {data.moneda}
            </Text>{" "}
            ({pretLitere} {data.moneda.toLowerCase()}), suma achitata integral la
            data semnarii prezentului contract, prin{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.modalitataPlata}</Text>.
          </Text>
        </View>

        {/* Predarea bunului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Predarea Bunului</Text>
          <Text style={styles.paragraph}>
            Predarea bunului se va efectua la data semnarii prezentului contract,
            la urmatoarea locatie:{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.locPredare}</Text>.
            Predarea se considera efectuata la momentul in care Cumparatorul intra
            in posesia efectiva a bunului.
          </Text>
          <Text style={styles.paragraph}>
            Bunul se vinde si se cumpara in starea tehnica si estetica vazuta si
            acceptata de Cumparator la data incheierii prezentului contract.
          </Text>
        </View>

        {/* Declaratia vanzatorului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Declaratia Vanzatorului</Text>
          <Text style={styles.paragraph}>
            Vanzatorul declara pe propria raspundere ca bunul descris la Art. II
            este proprietatea sa exclusiva, nu este grevat de sarcini, gajuri,
            ipoteci sau orice alte drepturi ale tertilor, nu face obiectul vreunui
            litigiu, nu este urmarit sau sechestrat si ca are dreptul deplin de
            a-l instraina.
          </Text>
        </View>

        {/* Obligatiile partilor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligatiile Partilor</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Vanzatorul</Text> se
            obliga sa predea bunul la locatia si in conditiile stabilite prin
            prezentul contract si sa garanteze Cumparatorul contra evictiunii si
            viciilor ascunse, conform dispozitiilor Codului Civil roman.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Cumparatorul</Text> se
            obliga sa achite pretul convenit la data semnarii si sa preia bunul
            in conditiile stabilite prin prezentul contract.
          </Text>
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Prezentul contract este incheiat sub semnatura privata si este valabil
            fara autentificare notariala pentru bunurile mobile, conform art. 1674
            din Codul Civil roman. Contractul reprezinta vointa libera si
            neviciata a partilor si a fost incheiat in doua exemplare originale,
            cate unul pentru fiecare parte.
          </Text>
          <Text style={styles.paragraph}>
            Orice modificare a prezentului contract se va face numai prin acordul
            scris al ambelor parti. Litigiile izvorand din prezentul contract vor
            fi solutionate pe cale amiabila, iar in caz de neintelegere, de catre
            instantele judecatoresti competente din Romania.
          </Text>
        </View>

        {/* Semnaturi */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Vanzator</Text>
            <Text style={styles.signatureName}>{data.vanzatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Cumparator</Text>
            <Text style={styles.signatureName}>{data.cumparatorNume}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureHint}>Semnatura</Text>
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
