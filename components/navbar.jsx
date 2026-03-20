"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Lab" },
  { href: "/notes", label: "Notes" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyber-line bg-cyber-base/65 backdrop-blur-xl">
      <div className="section-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-lg uppercase tracking-[0.3em] text-white">
            <span className="text-cyber-acid">{siteConfig.hero.name}</span> SecOps
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${
                    active ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-cyber-neon/40 bg-cyber-neon/10"
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full border border-cyber-acid/50 bg-cyber-acid/10 px-4 py-2 text-sm text-cyber-acid transition hover:bg-cyber-acid/20 md:inline-flex"
            >
              Start a Conversation
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex rounded-full border border-cyber-line bg-white/[0.03] px-4 py-2 text-sm text-white transition hover:border-cyber-neon/50 md:hidden"
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
              <div className="mt-4 space-y-2 rounded-3xl border border-cyber-line bg-cyber-panel/90 p-3 shadow-glow">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-sm transition ${
                        active
                          ? "border border-cyber-neon/40 bg-cyber-neon/10 text-white"
                          : "text-slate-300 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
