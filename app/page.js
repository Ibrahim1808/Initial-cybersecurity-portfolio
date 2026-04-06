"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const services = [
  {
    title: "Exterior Detail",
    price: "Starting at $149",
    description:
      "Luxury hand wash, foam pre-treatment, wheel cleaning, paint-safe decontamination, and a deep gloss sealant finish.",
  },
  {
    title: "Interior Detail",
    price: "Starting at $169",
    description:
      "Full vacuum, steam sanitation, leather conditioning, trim restoration, and odor-neutralizing interior refinement.",
  },
  {
    title: "Full Detail Package",
    price: "Starting at $289",
    description:
      "Our signature complete reset combining exterior and interior restoration for a true showroom-ready presentation.",
  },
  {
    title: "Ceramic Coating",
    price: "Starting at $699",
    description:
      "Long-term gloss and hydrophobic protection with careful prep, paint enhancement, and premium coating application.",
  },
];

const reasons = [
  "High-quality products trusted on luxury finishes",
  "Experienced professionals with paint-safe methods",
  "Satisfaction guarantee backed by service follow-up",
  "Obsessive attention to detail in every surface touched",
];

const gallery = [
  {
    title: "Black sedan revival",
    before:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Luxury SUV interior refresh",
    before:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Truck protection package",
    before:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
  },
];

const testimonials = [
  {
    name: "Marcus L.",
    quote:
      "My S-Class looked better than the day I drove it home. The paint depth and interior finish were unreal.",
  },
  {
    name: "Danielle R.",
    quote:
      "Booking was easy, communication was sharp, and the ceramic coating finish made my SUV look premium again.",
  },
  {
    name: "Chris T.",
    quote:
      "Royal Car Detail handled my truck with real care. No rushed work, no missed spots, just excellent detailing.",
  },
  {
    name: "Alyssa M.",
    quote:
      "The before-and-after difference was dramatic. They treated the car like it was a collector vehicle.",
  },
];

const estimateMatrix = {
  sedan: { light: [140, 190], medium: [190, 260], heavy: [260, 340] },
  suv: { light: [180, 240], medium: [240, 320], heavy: [320, 410] },
  truck: { light: [200, 270], medium: [270, 360], heavy: [360, 460] },
};

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="gold-label text-xs font-semibold">{eyebrow}</div>
      <h2 className="font-display mt-4 text-4xl leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{description}</p>
    </div>
  );
}

function PriceEstimator() {
  const [carType, setCarType] = useState("sedan");
  const [condition, setCondition] = useState("light");

  const estimate = useMemo(() => {
    const [low, high] = estimateMatrix[carType][condition];
    return `$${low} - $${high}`;
  }, [carType, condition]);

  return (
    <div className="panel p-8 sm:p-10">
      <div className="gold-label text-xs font-semibold">Pricing Estimate</div>
      <h3 className="font-display mt-4 text-3xl text-white sm:text-4xl">Build your service range instantly</h3>
      <p className="mt-4 max-w-2xl text-white/68">
        Select your vehicle type and current condition to see a realistic starting range. Final quotes are confirmed after inspection.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-3 block text-sm text-white/75">Car type</span>
          <select value={carType} onChange={(event) => setCarType(event.target.value)} className="royal-input">
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-3 block text-sm text-white/75">Condition</span>
          <select value={condition} onChange={(event) => setCondition(event.target.value)} className="royal-input">
            <option value="light">Light dirt</option>
            <option value="medium">Medium dirt</option>
            <option value="heavy">Heavy dirt</option>
          </select>
        </label>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.08)] p-6">
        <div className="text-sm uppercase tracking-[0.24em] text-[var(--royal-gold-soft)]">Estimated range</div>
        <div className="font-display mt-3 text-4xl text-white sm:text-5xl">{estimate}</div>
        <div className="mt-3 text-sm text-white/65">Add-ons like ceramic coating or stain extraction are quoted separately.</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(`Royal Car Detail inquiry from ${form.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-8 sm:p-10">
      <div className="gold-label text-xs font-semibold">Contact Us</div>
      <h3 className="font-display mt-4 text-3xl text-white sm:text-4xl">Request your premium detail</h3>
      <div className="mt-8 grid gap-4">
        <input
          className="royal-input"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={updateField}
          required
        />
        <input
          className="royal-input"
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={updateField}
          required
        />
        <textarea
          className="royal-input min-h-32 resize-y"
          name="message"
          placeholder="Tell us about your vehicle and the service you need"
          value={form.message}
          onChange={updateField}
          required
        />
      </div>
      <button type="submit" className="gold-button mt-6 rounded-full px-6 py-3 font-semibold transition">
        Send Inquiry
      </button>
      {sent ? (
        <p className="mt-4 text-sm text-[var(--royal-gold-soft)]">
          Your email app should open with the message pre-filled. If it does not, contact us directly at {siteConfig.email}.
        </p>
      ) : null}
    </form>
  );
}

export default function HomePage() {
  return (
    <div id="top">
      <section className="section-shell section-gap pb-10 pt-12 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="gold-label text-xs font-semibold">Luxury Auto Spa</div>
            <h1 className="font-display mt-6 max-w-4xl text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              Premium Car Detailing for a Showroom Finish
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Exceptional detailing, premium-grade products, and meticulous care designed to restore gloss, protect every surface, and elevate how your vehicle feels every day.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={siteConfig.calendly}
                target="_blank"
                rel="noreferrer"
                className="gold-button rounded-full px-7 py-3.5 text-center font-semibold transition"
              >
                Book Now
              </a>
              <a href="#estimator" className="ghost-button rounded-full px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/8">
                Get a Quote
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["1,200+", "Vehicles detailed"],
                ["5-Star", "Client experience"],
                ["Premium", "Paint-safe products"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="font-display text-3xl text-white">{value}</div>
                  <div className="mt-1 text-sm text-white/62">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="panel image-sheen float-slow p-3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <img
                src="https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury sports car after a premium detailing service"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-6">
                <div className="text-sm uppercase tracking-[0.24em] text-[var(--royal-gold-soft)]">Signature Finish</div>
                <div className="font-display mt-2 text-3xl text-white">Refined gloss, deep-clean interior, lasting protection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="section-shell section-gap pt-10">
        <SectionIntro
          eyebrow="Services"
          title="Tailored detailing packages for every level of care"
          description="From maintenance details to full transformation packages, each service is designed to preserve appearance, protect materials, and deliver a premium experience."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="panel p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="gold-label text-[11px] font-semibold">Royal Service</div>
              <h3 className="font-display mt-4 text-3xl text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">{service.description}</p>
              <div className="mt-8 text-lg font-semibold text-[var(--royal-gold-soft)]">{service.price}</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="why-us" className="section-shell section-gap">
        <div className="panel grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionIntro
            eyebrow="Why Choose Us"
            title="Luxury-level detailing built on care, process, and consistency"
            description="We combine premium products, trained craftsmanship, and a client-first approach to deliver the polished, protected result luxury vehicles deserve."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-[var(--royal-gold)]">Royal Standard</div>
                <p className="mt-3 text-base leading-7 text-white/80">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell section-gap">
        <SectionIntro
          eyebrow="Gallery"
          title="Before and after transformations that speak for themselves"
          description="Preview the kind of depth, clarity, and finish our clients expect after every service."
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {gallery.map((item, index) => (
            <motion.article
              key={item.title}
              className="panel overflow-hidden p-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="mb-4 flex items-center justify-between px-2 pt-2">
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--royal-gold-soft)]">Before / After</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img src={item.before} alt={`${item.title} before detailing`} className="h-72 w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img src={item.after} alt={`${item.title} after detailing`} className="h-72 w-full object-cover" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="estimator" className="section-shell section-gap">
        <PriceEstimator />
      </section>

      <section id="reviews" className="section-shell section-gap">
        <SectionIntro
          eyebrow="Reviews"
          title="Trusted by owners who expect their vehicles to look exceptional"
          description="A premium service should feel polished from first contact to final handoff. These are the kinds of experiences our clients come back for."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="panel p-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="text-[var(--royal-gold-soft)]">★★★★★</div>
              <p className="mt-4 text-sm leading-7 text-white/76">"{testimonial.quote}"</p>
              <div className="mt-6 font-semibold text-white">{testimonial.name}</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell section-gap">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <div className="gold-label text-xs font-semibold">Booking</div>
            <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">Reserve your next detailing appointment</h2>
            <p className="mt-4 max-w-2xl text-white/68">
              Choose a time through our online booking link and we will confirm your vehicle details, service level, and final recommendations.
            </p>
          </div>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noreferrer"
            className="gold-button rounded-full px-7 py-3.5 font-semibold transition"
          >
            Open Booking
          </a>
        </div>
      </section>

      <section id="contact" className="section-shell section-gap pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="panel p-8 sm:p-10">
            <div className="gold-label text-xs font-semibold">Contact</div>
            <h3 className="font-display mt-4 text-3xl text-white sm:text-4xl">Talk with Royal Car Detail</h3>
            <div className="mt-8 space-y-6">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-[var(--royal-gold-soft)]">Phone</div>
                <a href={`tel:${siteConfig.phone}`} className="mt-2 block text-lg text-white hover:text-[var(--royal-gold-soft)]">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-[var(--royal-gold-soft)]">Email</div>
                <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-lg text-white hover:text-[var(--royal-gold-soft)]">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-[var(--royal-gold-soft)]">Location</div>
                <p className="mt-2 text-lg text-white">{siteConfig.location}</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
