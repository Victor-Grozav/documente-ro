import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { fixData, fixLigatures } from "@/lib/pdfFonts";
import { ContractPrestariServiciiData } from "@/lib/types";

const f = fixLigatures;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.5,
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
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  section: { marginBottom: 12 },
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
  label: { width: 160, fontFamily: "Roboto", fontWeight: "bold", fontSize: 10, color: "#444" },
  value: { flex: 1, fontSize: 10 },
  paragraph: { fontSize: 10, marginBottom: 5, textAlign: "justify" },
  bold: { fontFamily: "Roboto", fontWeight: "bold" },
  listItem: { fontSize: 10, marginBottom: 4, paddingLeft: 8 },
  signatureSection: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
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
  data: ContractPrestariServiciiData;
}

export default function ContractPrestariServicii({ data: rawData }: Props) {
  const data = fixData(rawData);

  const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII"];
  let _n = 0;
  const sn = () => ROMAN[_n++];

  const valNum = parseFloat(data.valoare) || 0;
  const avansNum = parseFloat(data.avansPercent) || 30;
  const avansValoare = Math.round(valNum * avansNum / 100);
  const restValoare = valNum - avansValoare;
  const termenPlata = data.termenPlata || "15";

  const getPaymentText = () => {
    switch (data.modalitataPlata) {
      case "avans + rest la finalizare":
        return f(`Prețul se achită în două tranșe: ${avansNum}% (${avansValoare} ${data.moneda}) la semnarea prezentului contract cu titlu de avans, iar diferența de ${100 - avansNum}% (${restValoare} ${data.moneda}) la finalizarea serviciilor și acceptarea livrabilelor, în termen de ${termenPlata} zile calendaristice de la emiterea facturii.`);
      case "rate lunare":
        return f(`Prețul se achită în rate lunare egale pe durata contractului, în termen de ${termenPlata} zile calendaristice de la emiterea fiecărei facturi lunare. Numărul de rate și valoarea exactă a fiecărei rate se stabilesc de comun acord prin act adițional.`);
      case "lunar":
        return f(`Prețul se achită lunar, la sfârșitul fiecărei luni calendaristice, în termen de ${termenPlata} zile calendaristice de la emiterea facturii.`);
      default:
        return f(`Prețul se achită integral la finalizarea serviciilor și acceptarea livrabilelor, în termen de ${termenPlata} zile calendaristice de la emiterea facturii.`);
    }
  };

  return (
    <Document title="Contract de Prestări Servicii" author="FaraNotar.ro" creator="FaraNotar.ro">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contract de Prestări Servicii</Text>
        <Text style={styles.subtitle}>
          Încheiat astăzi, {data.data}, în {data.locul}
        </Text>

        {/* I. Părțile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Părțile Contractante</Text>

          <Text style={[styles.paragraph, styles.bold]}>Prestatorul:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{data.prestatorTip === "pj" ? "Denumire:" : "Nume și prenume:"}</Text>
            <Text style={styles.value}>{data.prestatorNume}</Text>
          </View>
          {data.prestatorTip === "pj" ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>CUI:</Text>
                <Text style={styles.value}>{data.prestatorCUI}</Text>
              </View>
              {data.prestatorRegCom ? (
                <View style={styles.row}>
                  <Text style={styles.label}>Nr. Reg. Com.:</Text>
                  <Text style={styles.value}>{data.prestatorRegCom}</Text>
                </View>
              ) : null}
              <View style={styles.row}>
                <Text style={styles.label}>Reprezentant legal:</Text>
                <Text style={styles.value}>{data.prestatorReprezentant}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>CNP:</Text>
                <Text style={styles.value}>{data.prestatorCNP}</Text>
              </View>
              {data.prestatorCI ? (
                <View style={styles.row}>
                  <Text style={styles.label}>Serie și nr. CI:</Text>
                  <Text style={styles.value}>{data.prestatorCI}</Text>
                </View>
              ) : null}
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Adresă/Sediu:</Text>
            <Text style={styles.value}>{data.prestatorAdresa}</Text>
          </View>
          {data.prestatorIBAN ? (
            <View style={[styles.row, { marginBottom: 10 }]}>
              <Text style={styles.label}>IBAN:</Text>
              <Text style={styles.value}>{data.prestatorIBAN}</Text>
            </View>
          ) : <View style={{ marginBottom: 10 }} />}

          <Text style={[styles.paragraph, styles.bold]}>Beneficiarul:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{data.beneficiarTip === "pj" ? "Denumire:" : "Nume și prenume:"}</Text>
            <Text style={styles.value}>{data.beneficiarNume}</Text>
          </View>
          {data.beneficiarTip === "pj" ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>CUI:</Text>
                <Text style={styles.value}>{data.beneficiarCUI}</Text>
              </View>
              {data.beneficiarRegCom ? (
                <View style={styles.row}>
                  <Text style={styles.label}>Nr. Reg. Com.:</Text>
                  <Text style={styles.value}>{data.beneficiarRegCom}</Text>
                </View>
              ) : null}
              <View style={styles.row}>
                <Text style={styles.label}>Reprezentant legal:</Text>
                <Text style={styles.value}>{data.beneficiarReprezentant}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>CNP:</Text>
                <Text style={styles.value}>{data.beneficiarCNP}</Text>
              </View>
              {data.beneficiarCI ? (
                <View style={styles.row}>
                  <Text style={styles.label}>Serie și nr. CI:</Text>
                  <Text style={styles.value}>{data.beneficiarCI}</Text>
                </View>
              ) : null}
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Adresă/Sediu:</Text>
            <Text style={styles.value}>{data.beneficiarAdresa}</Text>
          </View>
        </View>

        {/* II. Obiectul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Obiectul Contractului</Text>
          <Text style={styles.paragraph}>
            Prestatorul se obligă să presteze în favoarea Beneficiarului, în schimbul prețului convenit, următoarele servicii:
          </Text>
          <Text style={[styles.paragraph, { marginLeft: 8, marginBottom: 8 }]}>{data.descriereServicii}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Termen de finalizare:</Text>
            <Text style={styles.value}><Text style={styles.bold}>{data.termenFinalizare}</Text></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Loc de prestare:</Text>
            <Text style={styles.value}>{data.locPrestare}</Text>
          </View>
        </View>

        {/* III. Prețul */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Prețul și Modalitatea de Plată</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Valoare totală:</Text>
            <Text style={styles.value}><Text style={styles.bold}>{data.valoare} {data.moneda}</Text></Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 4, fontSize: 9, color: "#666" }]}>
            {f("Prețul este fără TVA dacă Prestatorul nu este plătitor de TVA. Dacă Prestatorul este înregistrat în scopuri de TVA, la prețul de mai sus se adaugă TVA la cota legală în vigoare.")}
          </Text>
          <Text style={[styles.paragraph, { marginTop: 4 }]}>{getPaymentText()}</Text>
          {data.penalitateIntarziere ? (
            <Text style={styles.paragraph}>
              {f("Întârzierea la plată atrage penalități de ")}
              <Text style={styles.bold}>{data.penalitateIntarziere}% pe zi</Text>
              {f(" din suma datorată, calculate de la data scadenței până la data plății efective.")}
            </Text>
          ) : (
            <Text style={styles.paragraph}>
              {f("Întârzierea la plată atrage aplicarea penalităților legale conform Legii nr. 72/2013 (dobânda de referință a BNR + 8 puncte procentuale), calculate de la data scadenței.")}
            </Text>
          )}
        </View>

        {/* IV. Obligații Prestator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Obligațiile Prestatorului</Text>
          <Text style={styles.paragraph}>Prestatorul se obligă:</Text>
          <Text style={styles.listItem}>{f("a) să execute serviciile descrise la Art. II cu diligența unui bun profesionist și în conformitate cu standardele aplicabile în domeniu;")}</Text>
          <Text style={styles.listItem}>{f("b) să respecte termenul de finalizare stabilit și să notifice Beneficiarul în scris cu cel puțin 5 zile lucrătoare înainte dacă termenul nu poate fi respectat, indicând cauza și noul termen estimat;")}</Text>
          <Text style={styles.listItem}>{f("c) să predea livrabilele rezultate din prestarea serviciilor în formatul convenit de comun acord cu Beneficiarul;")}</Text>
          <Text style={styles.listItem}>{f("d) să mențină confidențialitatea informațiilor furnizate de Beneficiar pe întreaga durată a contractului și ulterior încetării acestuia;")}</Text>
          <Text style={styles.listItem}>{f("e) să răspundă de calitatea serviciilor prestate pentru o perioadă de 30 de zile calendaristice de la data acceptării livrabilelor de către Beneficiar.")}</Text>
        </View>

        {/* V. Obligații Beneficiar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Obligațiile Beneficiarului</Text>
          <Text style={styles.paragraph}>Beneficiarul se obligă:</Text>
          <Text style={styles.listItem}>{f("a) să achite prețul în condițiile și la termenele stabilite la Art. III;")}</Text>
          <Text style={styles.listItem}>{f("b) să furnizeze Prestatorului, în timp util, toate informațiile, materialele și accesul necesar executării serviciilor;")}</Text>
          <Text style={styles.listItem}>{f("c) să comunice Prestatorului, în termen de 5 zile lucrătoare de la primire, acceptarea sau respingerea motivată în scris a livrabilelor. Lipsa unui răspuns în acest termen constituie acceptare tacită;")}</Text>
          <Text style={styles.listItem}>{f("d) să colaboreze activ și cu bună-credință cu Prestatorul pe întreaga durată de executare a contractului.")}</Text>
        </View>

        {/* VI. PI — condiționat */}
        {data.includeDrepturiPI && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{sn()}. Drepturi de Proprietate Intelectuală</Text>
            {data.drepturiPIBeneficiar ? (
              <Text style={styles.paragraph}>
                {f("Drepturile patrimoniale de autor asupra livrabilelor create de Prestator în executarea prezentului contract se transferă integral Beneficiarului la data plății integrale a prețului convenit, conform art. 41 și urm. din Legea nr. 8/1996. Prestatorul poate utiliza livrabilele exclusiv în scopuri de portofoliu propriu, cu acordul scris prealabil al Beneficiarului.")}
              </Text>
            ) : (
              <Text style={styles.paragraph}>
                {f("Drepturile de proprietate intelectuală asupra livrabilelor create de Prestator sunt și rămân proprietatea exclusivă a Prestatorului. Prin prezentul contract, Prestatorul acordă Beneficiarului o licență neexclusivă, netransferabilă, de utilizare a livrabilelor fără drept de sub-licențiere, în schimbul plății integrale a prețului, conform art. 40 și urm. din Legea nr. 8/1996.")}
              </Text>
            )}
          </View>
        )}

        {/* VII. Confidențialitate — condiționat */}
        {data.includeConfidentialitate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{sn()}. Confidențialitate</Text>
            <Text style={styles.paragraph}>
              {f("Fiecare parte se obligă să mențină confidențialitatea informațiilor, datelor, documentelor și know-how-ului primite de la cealaltă parte în legătură cu prezentul contract și să nu le divulge terților fără acordul scris prealabil al celeilalte părți.")}
            </Text>
            <Text style={styles.paragraph}>
              {f("Obligația de confidențialitate supraviețuiește încetării prezentului contract pentru o perioadă de 2 (doi) ani. Încălcarea acestei obligații dă dreptul părții lezate la acțiune în despăgubiri pentru prejudiciile cauzate.")}
            </Text>
          </View>
        )}

        {/* Forță Majoră */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{sn()}. Forță Majoră și Reziliere</Text>
          <Text style={styles.paragraph}>
            {f("Forța majoră, definită ca un eveniment imprevizibil, inevitabil și insurmontabil, exonerează de răspundere partea care o invocă, cu condiția notificării scrise a celeilalte părți în termen de 5 zile de la producerea evenimentului (art. 1634 Cod Civil).")}
          </Text>
          <Text style={styles.paragraph}>
            {f("Oricare dintre părți poate rezilia prezentul contract prin notificare scrisă cu 15 zile calendaristice în avans. Rezilierea unilaterală fără preaviz este permisă numai în cazul nerespectării grave a obligațiilor contractuale (art. 1551 Cod Civil).")}
          </Text>
          <Text style={styles.paragraph}>
            {f("În caz de reziliere din culpa Prestatorului, acesta restituie avansul primit pentru serviciile neprestate. În caz de reziliere din culpa Beneficiarului, acesta achită Prestatorului contravaloarea serviciilor prestate până la data rezilierii.")}
          </Text>
        </View>

        {/* Clauze Finale + Semnături — wrap=false garantează că nu ajung separate pe pagini diferite */}
        <View wrap={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{sn()}. Clauze Finale</Text>
            <Text style={styles.paragraph}>
              {f("Prezentul contract este guvernat de dreptul român și a fost încheiat sub semnătură privată, în două exemplare originale, câte unul pentru fiecare parte, conform art. 1270 Cod Civil. Este valabil fără autentificare notarială.")}
            </Text>
            <Text style={styles.paragraph}>
              {f("Orice modificare se face numai prin act adițional semnat de ambele părți. Litigiile izvorând din prezentul contract vor fi soluționate pe cale amiabilă, iar în caz de neînțelegere, de instanțele judecătorești competente din România.")}
            </Text>
          </View>

          {/* Semnături */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Prestator</Text>
              <Text style={styles.signatureName}>{data.prestatorNume}</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureHint}>Semnătură</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Beneficiar</Text>
              <Text style={styles.signatureName}>{data.beneficiarNume}</Text>
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
