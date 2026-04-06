"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#estimator", label: "Estimate" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="section-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="font-display text-2xl tracking-[0.18em] text-white">
            Royal <span style={{ color: "var(--royal-gold)" }}>Car Detail</span>
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noreferrer"
              className="gold-button hidden rounded-full px-5 py-2.5 text-sm font-semibold transition md:inline-flex"
            >
              Book Now
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white transition hover:border-[rgba(212,175,55,0.45)] md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-4 space-y-2 rounded-[1.75rem] border border-white/10 bg-black/90 p-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-white/78 transition hover:bg-white/[0.03] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="gold-button mt-2 block rounded-2xl px-4 py-3 text-center text-sm font-semibold"
                >
                  Book Now
                </a>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
