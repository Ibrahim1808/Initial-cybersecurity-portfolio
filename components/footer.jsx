import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="section-shell flex flex-col gap-6 py-10 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-2xl tracking-[0.14em] text-white">
            {siteConfig.shortName}
          </div>
          <div className="mt-2 max-w-xl">
            Luxury-level detailing for paint, interior, and long-lasting protection. Royal care from first rinse to final gloss.
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
            {siteConfig.email}
          </a>
          <a href="#contact" className="hover:text-white">
            Visit Us
          </a>
        </div>
      </div>
    </footer>
  );
}
