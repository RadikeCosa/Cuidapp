import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="w-full h-16 flex flex-col justify-center items-center p-3 sm:flex-row sm:justify-between">
      <Link href="/">
        <div className="flex items-center gap-2">
          <HeartIcon className="h-6 w-6" />
          <h1 className="text-lg font-bold">Cuidapp</h1>
        </div>
      </Link>
      <span className="text-sm text-gray-600">Utilities for Health Care</span>
    </header>
  );
}
