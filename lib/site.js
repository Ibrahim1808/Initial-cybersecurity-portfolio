const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Royal Car Detail",
  shortName: "Royal Detail",
  description:
    "Premium car detailing with luxury-grade paint care, deep interior restoration, ceramic coating, and concierge-level service.",
  url: siteUrl,
  ogImage:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  email: "bookings@royalcardetail.com",
  phone: "(555) 987-2451",
  location: "123 Luxury Lane, Beverly Hills, CA",
  calendly: "https://calendly.com/your-placeholder-link",
  hero: {
    name: "Royal Car Detail",
    title: "Luxury Auto Spa",
    intro:
      "Showroom-level detailing for drivers who expect flawless finishes, refined care, and premium results at every appointment.",
  },
};
