import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate — FaraNotar.ro",
  description:
    "Politica de confidențialitate a platformei FaraNotar.ro. Cum sunt prelucrate datele cu caracter personal.",
};

export default function ConfidentialitatePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← Acasă
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-1">
            Politică de Confidențialitate
          </h1>
          <p className="text-sm text-gray-400">
            Ultima actualizare: martie 2026 · FaraNotar.ro
          </p>
        </div>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. Operatorul datelor</h2>
            <p>
              Platforma FaraNotar.ro este operată de <strong>Victor Grozav</strong>, persoană
              fizică cu domiciliul în România. Pentru orice solicitare privind datele personale,
              ne puteți contacta la:{" "}
              <a href="mailto:faranotar@gmail.com" className="text-blue-600 hover:underline">
                faranotar@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              2. Ce date prelucrăm — și ce NU prelucrăm
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
              <p className="font-semibold text-green-900 mb-2">
                Datele introduse în formulare NU ajung pe serverele noastre
              </p>
              <p className="text-green-800">
                Informațiile completate în formularele de generare documente (CNP, adrese, date
                personale) sunt procesate exclusiv în browser-ul dumneavoastră pentru a compune
                fișierul PDF. FaraNotar.ro nu transmite, nu stochează și nu are acces la aceste
                date pe serverele sale.
              </p>
            </div>
            <p className="mb-3">
              Singurele date prelucrate de platformă sau de partenerii săi sunt cele necesare
              pentru procesarea plății:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Adresa de email (colectată de Stripe la plată)</li>
              <li>Date de card (procesate exclusiv de Stripe, niciodată vizibile FaraNotar.ro)</li>
              <li>Adresa IP (loguri de server standard Vercel/Next.js)</li>
              <li>Tipul documentului achiziționat (pentru procesarea comenzii)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. Stripe — procesator de plăți</h2>
            <p className="mb-3">
              Plățile sunt procesate prin <strong>Stripe Payments Europe, Ltd.</strong>, cu sediul
              în Irlanda, care acționează ca operator independent de date pentru informațiile
              de plată. Prin efectuarea unei plăți, acceptați și{" "}
              <a
                href="https://stripe.com/en-ro/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Politica de Confidențialitate Stripe
              </a>
              .
            </p>
            <p>
              FaraNotar.ro nu stochează și nu are acces la datele complete ale cardului.
              Stripe poate crea un profil de client asociat adresei dumneavoastră de email
              pentru gestionarea tranzacțiilor.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Cookie-uri</h2>
            <p className="mb-3">
              FaraNotar.ro utilizează un număr minim de cookie-uri:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              <li>
                <strong>Cookie-uri esențiale:</strong> necesare funcționării tehnice a site-ului
                (sesiune, securitate)
              </li>
              <li>
                <strong>Cookie-uri Stripe:</strong> setate de Stripe în procesul de plată pentru
                prevenirea fraudelor și autentificare
              </li>
            </ul>
            <p className="mt-3">
              Nu utilizăm cookie-uri de analiză comportamentală (Google Analytics etc.) sau
              cookie-uri de publicitate. Preferințele dumneavoastră privind cookie-urile pot fi
              gestionate prin bannerul afișat la prima vizită.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              5. Temeiul legal al prelucrării
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              <li>
                <strong>Executarea contractului</strong> (art. 6 alin. 1 lit. b GDPR): procesarea
                plății și livrarea documentului achiziționat
              </li>
              <li>
                <strong>Obligație legală</strong> (art. 6 alin. 1 lit. c GDPR): păstrarea
                documentelor contabile și fiscale conform legislației române
              </li>
              <li>
                <strong>Consimțământ</strong> (art. 6 alin. 1 lit. a GDPR): pentru cookie-urile
                non-esențiale, dacă acceptați
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              6. Drepturile dumneavoastră (GDPR)
            </h2>
            <p className="mb-3">
              Conform Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018, aveți dreptul la:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-gray-600">
              <li>Acces la datele personale pe care le deținem</li>
              <li>Rectificarea datelor inexacte</li>
              <li>Ștergerea datelor ("dreptul de a fi uitat")</li>
              <li>Restricționarea prelucrării</li>
              <li>Portabilitatea datelor</li>
              <li>Opoziție față de prelucrare</li>
            </ul>
            <p className="mt-3">
              Întrucât datele din formulare nu sunt stocate pe serverele noastre, dreptul de
              ștergere se aplică în principal datelor de facturare Stripe. Pentru exercitarea
              drepturilor, contactați-ne sau direct Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. Retenția datelor</h2>
            <p>
              Datele de facturare (necesare pentru obligații fiscale) sunt păstrate conform
              termenelor legale din România (10 ani pentru documente contabile, conform
              Legii contabilității nr. 82/1991). Datele Stripe sunt gestionate conform
              politicii Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. Autoritatea de supraveghere</h2>
            <p>
              Aveți dreptul de a depune o plângere la{" "}
              <strong>
                Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
                (ANSPDCP)
              </strong>
              , cu sediul în Bd. G-ral. Gheorghe Magheru nr. 28–30, București.
              Website:{" "}
              <a
                href="https://www.dataprotection.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                dataprotection.ro
              </a>
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
          FaraNotar.ro · Politică de Confidențialitate actualizată în martie 2026
        </div>
      </div>
    </main>
  );
}
