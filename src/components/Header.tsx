import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-5xl mx-auto flex justify-center">
        <Link href="/">
          <Image
            src="/logo-light.svg"
            alt="FaraNotar.ro"
            width={180}
            height={45}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
