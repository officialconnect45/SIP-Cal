"use client";

import { useState } from "react";
import Link from "next/link";

const utilityLinks = [{ label: "Contact", href: "/info/contact" }];

const navLinks = [
  { label: "Investing", href: "/info/investing" },
  { label: "Planning", href: "/info/planning" },
  { label: "Tools", href: "/info/tools" },
  { label: "Advice", href: "/info/advice" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--brand-red)] text-white font-semibold text-sm tracking-tight"
                aria-hidden
              >
                CW
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--brand-red)] transition-colors">
                  Calc Wealth
                </span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  Investment Calculators
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--brand-blue)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <nav
              className="hidden md:flex items-center gap-4 mr-2"
              aria-label="Utility"
            >
              {utilityLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium text-[var(--brand-link)] hover:underline underline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/info/tools"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors"
              aria-label="Tools"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Tools</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              <MenuIcon />
              <span className="hidden sm:inline">Menu</span>
              <ChevronIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[var(--border)] py-4 lg:hidden animate-fade-in">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-2 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-muted)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-wrap gap-4 border-t border-[var(--border)] pt-3 px-2">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs font-medium text-[var(--brand-link)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 20L16.5 16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
