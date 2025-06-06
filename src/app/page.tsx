import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center container mt-10 ">
      <nav className="w-full max-w-md flex flex-col gap-6">
        <Link
          href="/patients"
          className="block hover:text-blue-500 transition-colors duration-300"
        >
          <UsersIcon className="inline-block mr-2 h-5 w-5" />
          Patients Module
        </Link>

        <Link
          href="/"
          className="block hover:text-blue-500 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PaperClipIcon className="inline-block mr-2 h-5 w-5" />
          Documentation
        </Link>
      </nav>
    </div>
  );
}
