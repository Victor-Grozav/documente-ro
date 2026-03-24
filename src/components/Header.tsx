import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-light.svg"
            alt="FaraNotar.ro"
            width={180}
            height={45}
            priority
          />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
