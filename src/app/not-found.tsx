import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagina nu există</h1>
        <p className="text-gray-500 text-sm mb-8">
          Pagina pe care o cauți nu a fost găsită sau a fost mutată.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Înapoi la pagina principală
          </Link>
          <Link
            href="/documente"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Generator documente →
          </Link>
        </div>
      </div>
    </main>
  );
}
