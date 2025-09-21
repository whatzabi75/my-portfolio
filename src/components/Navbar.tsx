"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white/90 backdrop-blur">
        <h1 className="text-xl font-bold tracking-tight text-blue-600">
          Christian Langenberg
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/projects" className="hover:text-blue-600">Projects</Link>
          <Link href="/about" className="hover:text-blue-600">About Me</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col space-y-2 px-6 py-4 border-b bg-white/95">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Projects</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">About Me</Link>
        </nav>
      )}
    </>
  );
}