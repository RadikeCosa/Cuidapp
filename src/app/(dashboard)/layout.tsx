"use client";
import { useState } from "react";
import SideNav from "@/components/layout/sidenav";
import { UsersIcon, UserPlusIcon, HomeIcon } from "@heroicons/react/24/outline";

const patientNavLinks = [
  { href: "/", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  {
    href: "/patients",
    label: "Patients",
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    href: "/add-patient",
    label: "Add Patient",
    icon: <UserPlusIcon className="w-6 h-6" />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Hamburger button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-gray-800 text-white"
        aria-label="Open menu"
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <SideNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navLinks={patientNavLinks}
      />

      {/* Main content */}
      <main className="flex-1  overflow-auto md:ml-0">{children}</main>
    </div>
  );
}
