import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          CuidApp
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Plataforma para la gestión profesional de atención médica
          domiciliaria. Accede a los módulos principales desde aquí.
        </p>
        <nav className="w-full flex flex-col gap-5">
          <Link
            href="/patients"
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 font-medium shadow-sm"
          >
            <UsersIcon className="h-6 w-6" />
            <span>Módulo Pacientes</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-medium shadow-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PaperClipIcon className="h-6 w-6" />
            <span>Documentación</span>
          </Link>
        </nav>
        {/* Espacio para futuros módulos */}
        <div className="mt-8 text-xs text-gray-400 text-center">
          Próximamente: más módulos y funcionalidades
        </div>
      </div>
    </main>
  );
}
