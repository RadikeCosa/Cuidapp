import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full h-12 flex justify-center items-center">
      &copy; {year} · Cuidapp ·
      <Link
        href="https://ramirocosa.is-a.dev/"
        className="text-gray-500 hover:text-blue-500 transition-colors duration-300 ml-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made by Rami
      </Link>{" "}
      ·
      <nav className="ml-2">
        <Link
          className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
          href="https://cuidapp-documentation.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </Link>
      </nav>
    </footer>
  );
}
