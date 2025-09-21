"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900">
      


        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Icon changes depending on state */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col space-y-2 px-6 py-4 border-b bg-white/95">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/projects"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Projects
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            About Me
          </Link>
        </nav>
      )}

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Senior Product Manager <span className="text-blue-600">& AI Builder</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Driving innovation at the intersection of <strong>Product Management</strong> and 
            <strong> Artificial Intelligence</strong>.  
            I design, lead, and deliver solutions that create measurable impact. 
          </p>
        </div>
      </main>

    </div>
  );
}