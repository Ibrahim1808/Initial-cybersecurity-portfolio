import Link from "next/link";
import { siteConfig } from "@/lib/site";

const socials = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];

export function ContactPanel() {
  return (
    <section className="section-shell section-gap">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-8">
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-acid">Secure Channel</div>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-white">
            Let&apos;s talk about testing, research, or collaboration.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            This portfolio is intentionally public-only. Reach out through email or social channels for project work,
            writeups, speaking, or security collaboration.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                className="rounded-full border border-cyber-line bg-white/[0.03] px-5 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:border-cyber-neon/50 hover:text-cyber-neon"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="panel p-8">
          <div className="space-y-4">
            {[
              ["Primary Focus", "Web application security, reconnaissance, and offensive validation."],
              ["Lab Interests", "ESP32 experiments, Wi-Fi capture workflows, and packet analysis."],
              ["Reporting Style", "Clear remediation guidance, reproducible steps, and stakeholder-friendly summaries."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-cyber-line bg-black/20 p-5">
                <div className="font-display text-lg uppercase tracking-[0.08em] text-white">{title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
