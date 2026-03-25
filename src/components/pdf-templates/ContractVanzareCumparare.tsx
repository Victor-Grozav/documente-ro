import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { fixData, fixLigatures } from "@/lib/pdfFonts";
import { ContractVanzareData } from "@/lib/types";

const f = fixLigatures;

const TIPURI_BUN: Record<string, string> = {
  "vehicul": "Autoturism / motocicletă / vehicul",
  "electronice": "Electronice și electrocasnice",
  "mobila": "Mobilă și obiecte de uz casnic",
  "utilaje": "Utilaje și echipamente",
  "animale": "Animale",
  "alte": "Alte bunuri mobile",
};

const isVehicul = (tip: string) => tip === "vehicul";

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
  section: {
    marginBottom: 18,
  },
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
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 140,
    fontFamily: "Roboto",
    fontWeight: "bold",
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
  bold: {
    fontFamily: "Roboto",
    fontWeight: "bold",
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
    fontFamily: "Roboto",
    fontWeight: "bold",
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

// Particle "de" required in Romanian before nouns for numerals >= 20
// e.g.: "douăzeci de lei", "o sută de lei", "o mie de lei", "douăzeci și unu de lei"
function numarInLitere(n: number): string {
  if (n === 0) return "zero";
  if (n === 1) return "un"; // "un leu" not "unu lei"

  function sub20(x: number): string {
    return [
      "", "unu", "doi", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă",
      "zece", "unsprezece", "doisprezece", "treisprezece", "paisprezece", "cincisprezece",
      "șaisprezece", "șaptesprezece", "optsprezece", "nouăsprezece",
    ][x];
  }

  function sub100(x: number): string {
    if (x < 20) return sub20(x);
    const zeci = ["", "", "douăzeci", "treizeci", "patruzeci", "cincizeci",
      "șaizeci", "șaptezeci", "optzeci", "nouăzeci"][Math.floor(x / 10)];
    return zeci + (x % 10 !== 0 ? " și " + sub20(x % 10) : "");
  }

  function sub1000(x: number): string {
    if (x < 100) return sub100(x);
    const sute = Math.floor(x / 100);
    const rest = x % 100;
    const suteText = sute === 1 ? "o sută" : sute === 2 ? "două sute" : sub20(sute) + " sute";
    return suteText + (rest !== 0 ? " " + sub100(rest) : "");
  }

  if (n < 1000) return sub1000(n);

  const mii = Math.floor(n / 1000);
  const rest = n % 1000;
  const miiText = mii === 1 ? "o mie" : mii === 2 ? "două mii" : sub1000(mii) + " mii";
  return miiText + (rest !== 0 ? " " + sub1000(rest) : "");
}

// Correct Romanian preposition per payment type
const MODALITATE_PLATA_DISPLAY: Record<string, string> = {
  "numerar": "în numerar",
  "transfer bancar": "prin transfer bancar",
  "alta modalitate": "prin altă modalitate",
};

interface Props {
  data: ContractVanzareData;
}

export default function ContractVanzareCumparare({ data: rawData }: Props) {
  const data = fixData(rawData);
  const pretNumar = parseFloat(data.pret) || 0;
  const pretInt = Math.floor(pretNumar);
  const pretLitere = numarInLitere(pretInt);
  const pretDe = pretInt >= 20 ? " de" : ""; // "de" particle for numerals >= 20
  // RON: singular "leu" for 1, plural "lei" for 2+; EUR/USD: invariable code
  const monedaLitere = data.moneda === "RON" ? (pretInt === 1 ? "leu" : "lei") : data.moneda;
  const modalitateDisplay = MODALITATE_PLATA_DISPLAY[data.modalitataPlata] ?? `prin ${data.modalitataPlata}`;

  return (
    <Document
      title="Contract de Vânzare-Cumpărare"
      author="FaraNotar.ro"
      creator="FaraNotar.ro"
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

          <Text style={[styles.paragraph, styles.bold]}>
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

          <Text style={[styles.paragraph, styles.bold]}>
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
            <Text style={styles.label}>Categorie bun:</Text>
            <Text style={styles.value}>{TIPURI_BUN[data.tipBun] || data.tipBun}</Text>
          </View>
          {data.bunDescriere && (
            <View style={styles.row}>
              <Text style={styles.label}>Descriere:</Text>
              <Text style={styles.value}>{data.bunDescriere}</Text>
            </View>
          )}
          {data.bunSerie && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie / Nr. șasiu:</Text>
              <Text style={styles.value}>{data.bunSerie}</Text>
            </View>
          )}
          {data.vehiculNrInmatriculare && (
            <View style={styles.row}>
              <Text style={styles.label}>Nr. înmatriculare:</Text>
              <Text style={styles.value}>{data.vehiculNrInmatriculare}</Text>
            </View>
          )}
          {data.vehiculSerieCIV && (
            <View style={styles.row}>
              <Text style={styles.label}>Serie CIV:</Text>
              <Text style={styles.value}>{data.vehiculSerieCIV}</Text>
            </View>
          )}
        </View>

        {/* Prețul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Prețul</Text>
          <Text style={styles.paragraph}>
            Prețul convenit de părți pentru bunul menționat este de{" "}
            <Text style={styles.bold}>
              {data.pret} {data.moneda}
            </Text>{" "}
            ({pretLitere}{pretDe} {monedaLitere}), sumă achitată integral la
            data semnării prezentului contract,{" "}
            <Text style={styles.bold}>{modalitateDisplay}</Text>.
          </Text>
        </View>

        {/* Predarea bunului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Predarea Bunului</Text>
          <Text style={styles.paragraph}>
            Predarea bunului se va efectua la data semnării prezentului contract,
            la următoarea locație:{" "}
            <Text style={styles.bold}>{data.locPredare}</Text>.
            Predarea se consideră efectuată la momentul în care Cumpărătorul intră
            în posesia efectivă a bunului.
          </Text>
          <Text style={styles.paragraph}>
            Bunul se vinde și se cumpără în starea tehnică și estetică văzută și
            acceptată de Cumpărător la data încheierii prezentului contract.
          </Text>
          {isVehicul(data.tipBun) && (data.vehiculKm || data.vehiculItpPanaLa || data.vehiculDocumente) && (
            <Text style={styles.paragraph}>
              {data.vehiculKm ? `La data predării, vehiculul are ${data.vehiculKm} km la bord` : ""}
              {data.vehiculKm && data.vehiculItpPanaLa ? " și " : ""}
              {data.vehiculItpPanaLa ? `ITP valabil până la ${data.vehiculItpPanaLa}` : ""}
              {(data.vehiculKm || data.vehiculItpPanaLa) ? ". " : ""}
              {data.vehiculDocumente ? `Vânzătorul predă Cumpărătorului următoarele documente: ${data.vehiculDocumente}.` : ""}
            </Text>
          )}
        </View>

        {/* Declarația vânzătorului */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Declarația Vânzătorului</Text>
          <Text style={styles.paragraph}>
            Vânzătorul declară pe propria răspundere că bunul descris la Art. II
            este proprietatea sa exclusivă, nu este grevat de sarcini, gajuri
            sau orice alte drepturi reale ale terților, nu face obiectul vreunui
            litigiu, nu este urmărit silit sau sechestrat și că are dreptul deplin
            de a-l înstrăina.
          </Text>
        </View>

        {/* Obligațiile părților */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. Obligațiile Părților</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{f("Vânzătorul")}</Text>{f(" se obligă să predea bunul la locația și în condițiile stabilite prin prezentul contract și să îl garanteze pe Cumpărător contra evicțiunii și viciilor ascunse, conform dispozițiilor Codului Civil român. Cumpărătorul este obligat să denunțe viciile ascunse în termen de 6 luni de la descoperire, termen rezonabil în sensul art. 1713 Cod Civil. Riscul pieirii fortuite a bunului trece la Cumpărător la momentul predării efective (art. 1274 și art. 1755 Cod Civil).")}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Cumpărătorul</Text> se
            obligă să achite prețul convenit la data semnării și să preia bunul
            în condițiile stabilite prin prezentul contract.
          </Text>
          {isVehicul(data.tipBun) && (
            <Text style={styles.paragraph}>
              Cumpărătorul se obligă să efectueze transcrierea vehiculului în
              evidențele DRPCIV în termen de 30 de zile de la data prezentului
              contract.
            </Text>
          )}
        </View>

        {/* Clauze finale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. Clauze Finale</Text>
          <Text style={styles.paragraph}>
            Prezentul contract este încheiat sub semnătură privată și este valabil
            fără autentificare notarială pentru bunurile mobile, conform principiului
            consensualismului (art. 1178 Cod Civil), transferul proprietății
            operând la data semnării (art. 1674 Cod Civil). Contractul reprezintă voința liberă și
            neviciată a părților și a fost încheiat în două exemplare originale,
            câte unul pentru fiecare parte.
          </Text>
          <Text style={styles.paragraph}>
            {f("Orice modificare a prezentului contract se va face numai prin acordul scris al ambelor părți. Litigiile izvorând din prezentul contract vor fi soluționate pe cale amiabilă, iar în caz de neînțelegere, de către instanțele judecătorești competente din România.")}
          </Text>
        </View>

        {/* Semnături */}
        <View style={styles.signatureSection} wrap={false}>
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
          <Text style={styles.footerText}>Generat prin FaraNotar.ro</Text>
          <Text style={[styles.footerText, { flex: 1, textAlign: "center" }]}>Model document · utilizatorul răspunde pentru corectitudinea datelor și capacitatea semnatarilor</Text>
          <Text style={styles.footerText}>{data.data}</Text>
        </View>
      </Page>
    </Document>
  );
}
