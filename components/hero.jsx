"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="section-shell section-gap pt-16 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-cyber-acid"
          >
            {siteConfig.hero.title} • Offensive Security • Lab Research
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl uppercase leading-none tracking-[0.06em] text-white sm:text-6xl lg:text-7xl"
          >
            {siteConfig.hero.name}
            <span className="mt-3 block text-cyber-neon">{siteConfig.hero.title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            {siteConfig.hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="rounded-full border border-cyber-neon/50 bg-cyber-neon/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-neon transition hover:bg-cyber-neon/20"
            >
              View Projects
            </Link>
            <Link
              href="/resume"
              className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:border-cyber-acid/50 hover:text-cyber-acid"
            >
              Open Resume
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-cyber-violet/40 bg-cyber-violet/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-violet transition hover:bg-cyber-violet/20"
            >
              Contact
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="panel relative overflow-hidden p-6 shadow-glow"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-acid to-transparent" />
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-neon">
            Live Security Feed
          </div>
          <div className="mt-6 grid gap-4">
            {[
              ["Web App Testing", "OWASP-focused pentesting and secure review."],
              ["Wireless Lab", "ESP32, Wi-Fi capture, BLE recon, and protocol analysis."],
              ["Threat-Informed Notes", "Write-ups, experiments, and reproducible findings."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-cyber-line bg-black/20 p-4">
                <div className="font-display text-lg uppercase tracking-[0.08em] text-white">{title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {[
              ["12+", "Research Notes"],
              ["8", "Lab Builds"],
              ["24/7", "Learning Mode"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-cyber-line bg-white/[0.03] p-4">
                <div className="font-display text-2xl text-cyber-acid">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
