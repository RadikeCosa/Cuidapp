import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cuidapp",
  description: "Utilities for Health Care",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full ">
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex-1 min-h-0 overflow-auto">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
