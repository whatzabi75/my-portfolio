import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // ✅ import Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christian Langenberg Portfolio",
  description: "Senior Product Manager with AI/Tech focus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        {/* ✅ Shared Navbar */}
        <Navbar />

        {/* ✅ Page Content */}
        <main className="flex-1">{children}</main>

        {/* ✅ Shared Footer */}
        <footer className="py-6 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Christian Langenberg — Portfolio
        </footer>
      </body>
    </html>
  );
}