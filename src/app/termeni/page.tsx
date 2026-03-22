import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții — FaraNotar.ro",
  description:
    "Termenii și condițiile de utilizare ale platformei FaraNotar.ro. Limitarea răspunderii, natura serviciului și obligațiile utilizatorului.",
};

export default function TermeniPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← Acasă
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-1">
            Termeni și Condiții de Utilizare
          </h1>
          <p className="text-sm text-gray-400">
            Ultima actualizare: martie 2026 · FaraNotar.ro
          </p>
        </div>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          {/* 0 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              1. Identitatea operatorului
            </h2>
            <p>
              Platforma FaraNotar.ro este operată de <strong>Victor Grozav</strong>, persoană
              fizică cu domiciliul în România. Pentru orice întrebare sau reclamație, ne puteți
              contacta la:{" "}
              <a href="mailto:faranotar@gmail.com" className="text-blue-600 hover:underline">
                faranotar@gmail.com
              </a>
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              2. Natura serviciului
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3">
              <p className="font-semibold text-amber-900 mb-1">Atenție importantă</p>
              <p className="text-amber-800">
                FaraNotar.ro furnizează exclusiv <strong>modele de documente precompletate</strong>.
                Platforma <strong>nu oferă consultanță juridică</strong>, nu reprezintă un cabinet de avocatură
                și nu este autorizată să presteze asistență juridică în sensul Legii nr. 51/1995
                privind exercitarea profesiei de avocat.
              </p>
            </div>
            <p>
              Documentele disponibile pe platformă sunt șabloane redactate pe baza legislației române
              în vigoare la data publicării. Ele reprezintă puncte de plecare pentru tranzacții standard
              și nu acoperă toate situațiile juridice posibile.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              3. Limitarea răspunderii
            </h2>
            <p className="mb-3">
              FaraNotar.ro, operatorul platformei și colaboratorii săi <strong>nu răspund</strong>, în nicio
              circumstanță, pentru:
            </p>
            <ul className="space-y-2 list-none">
              {[
                "Corectitudinea, completitudinea sau veridicitatea datelor introduse de utilizator în formulare;",
                "Capacitatea juridică, discernământul, identitatea sau buna-credință a oricărei persoane care semnează un document generat prin platformă;",
                "Viciile de consimțământ (eroare, dol, violență, leziune) care pot afecta valabilitatea unui act juridic;",
                "Prejudiciile directe sau indirecte rezultate din utilizarea documentelor generate, inclusiv pierderi financiare, litigii sau nulitatea actelor;",
                "Modificările legislative ulterioare publicării modelelor de documente pe platformă;",
                "Interpretarea sau aplicarea greșită a clauzelor contractuale de către utilizator sau de către terți;",
                "Situațiile în care un document standard nu este adecvat pentru circumstanțele specifice ale utilizatorului.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Răspunderea FaraNotar.ro este limitată în toate cazurile la suma efectiv plătită
              de utilizator pentru documentul în cauză.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              4. Obligațiile și responsabilitățile utilizatorului
            </h2>
            <p className="mb-3">Prin utilizarea platformei, utilizatorul confirmă că:</p>
            <ul className="space-y-2 list-none">
              {[
                "A citit și a înțeles conținutul complet al documentului înainte de semnare;",
                "A verificat că toate datele introduse (nume, CNP, adrese, sume, termene) sunt corecte și complete;",
                "Se asigură că toate părțile semnatare au capacitate juridică deplină și discernământ la momentul semnării;",
                "Înțelege că documentele generate sunt valabile sub semnătură privată exclusiv pentru bunuri mobile și situațiile permise de lege — notarul rămâne obligatoriu pentru imobile, succesiuni și procuri autentice;",
                "Consultă un avocat sau notar în situații complexe, atipice sau cu miză financiară ridicată.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              5. Când este obligatoriu notarul
            </h2>
            <p className="mb-3">
              Conform Codului Civil român, forma autentică notarială este obligatorie pentru:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-gray-600">
              <li>Contracte de vânzare-cumpărare a imobilelor (terenuri, apartamente, case)</li>
              <li>Contracte de donație a imobilelor sau a unor bunuri de valoare ridicată</li>
              <li>Partaje succesorale și testamente autentice</li>
              <li>Procuri pentru acte de dispoziție asupra imobilelor</li>
              <li>Convenții matrimoniale</li>
              <li>Orice act juridic pentru care legea prevede expres forma autentică</li>
            </ul>
            <p className="mt-3 text-gray-500">
              FaraNotar.ro nu oferă și nu poate oferi documente valabile pentru categoriile de mai sus.
            </p>
          </section>

          {/* drept retragere */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              6. Dreptul de retragere — conținut digital
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
              <p className="font-semibold text-blue-900 mb-1">
                Renunțarea la dreptul de retragere de 14 zile
              </p>
              <p className="text-blue-800">
                Conform art. 16 lit. m din OG nr. 34/2014 privind drepturile consumatorilor,
                dreptul de retragere de 14 zile <strong>nu se aplică</strong> contractelor pentru
                furnizarea de conținut digital care nu este livrat pe un suport material, dacă
                executarea a început cu acordul expres al consumatorului.
              </p>
            </div>
            <p>
              Prin apăsarea butonului <strong>„Continuă spre plată"</strong> și finalizarea
              tranzacției, utilizatorul confirmă că solicită livrarea imediată a conținutului
              digital (fișier PDF) și că înțelege că, odată livrat documentul, nu mai poate
              exercita dreptul de retragere. În cazul în care documentul nu a fost livrat din
              cauza unui defect tehnic al platformei, utilizatorul poate solicita rambursarea
              sumei achitate contactând operatorul.
            </p>
          </section>

          {/* plata Stripe */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              7. Procesarea plăților — Stripe
            </h2>
            <p>
              Plățile sunt procesate prin <strong>Stripe Payments Europe, Ltd.</strong> FaraNotar.ro
              nu stochează și nu are acces la datele cardului dumneavoastră. Prin finalizarea plății,
              acceptați și Termenii de Serviciu Stripe. Stripe poate crea un profil de client asociat
              adresei de email utilizate la plată. Consultați{" "}
              <a
                href="https://stripe.com/en-ro/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Politica de Confidențialitate Stripe
              </a>{" "}
              pentru detalii.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              8. Proprietatea intelectuală
            </h2>
            <p>
              Modelele de documente, textele, structura și codul platformei sunt proprietatea
              FaraNotar.ro și sunt protejate de legislația drepturilor de autor. Documentele
              generate pot fi utilizate de utilizator exclusiv în scopuri personale sau comerciale
              proprii. Redistribuirea modelelor sau comercializarea lor este interzisă.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              9. Protecția datelor
            </h2>
            <p>
              Datele introduse în formularele de generare a documentelor sunt procesate exclusiv
              în browser-ul utilizatorului pentru a compune PDF-ul și <strong>nu sunt stocate</strong> pe
              serverele platformei. FaraNotar.ro nu păstrează copii ale documentelor generate și
              nu are acces la datele personale introduse în formulare.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              10. Modificarea termenilor
            </h2>
            <p>
              FaraNotar.ro își rezervă dreptul de a modifica oricând acești termeni. Continuarea
              utilizării platformei după publicarea modificărilor constituie acceptarea noilor termeni.
              Utilizatorii sunt încurajați să verifice periodic această pagină.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              11. Legea aplicabilă
            </h2>
            <p>
              Prezenții termeni sunt guvernați de legislația română. Orice litigiu izvorând din
              utilizarea platformei va fi soluționat de instanțele judecătorești competente din România.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
          FaraNotar.ro · Termeni actualizați în martie 2026
        </div>
      </div>
    </main>
  );
}
