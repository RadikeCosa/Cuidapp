"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SideNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  navLinks: NavLink[];
}

export default function SideNav({
  sidebarOpen,
  setSidebarOpen,
  navLinks,
}: SideNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 text-gray-900 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64 md:h-full`}
    >
      <div className="flex items-center justify-between  border-gray-200">
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
          className="text-gray-900 md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-2 h-full">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-gray-200 text-gray-900" : "hover:bg-gray-200"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{icon}</span>
              <span className="text-base font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
