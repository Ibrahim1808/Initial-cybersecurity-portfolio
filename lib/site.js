const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Ibrahim | Cybersecurity Portfolio",
  shortName: "Ibrahim SecOps",
  description:
    "Futuristic cybersecurity portfolio with projects, lab notes, research articles, and a public resume powered by Markdown in GitHub.",
  url: siteUrl,
  ogImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  email: "ibrahimsilvaoliveira122432@gmail.com",
  social: {
    github: "https://github.com/Ibrahim1808",
    linkedin: "https://www.linkedin.com/in/ibrahim-silva-b19a9536a",
  },
  hero: {
    name: "Ibrahim",
    title: "Cybersecurity Specialist / Pentester",
    intro:
      "I build practical offensive security projects, document lab experiments, and turn technical findings into clear next steps for real teams.",
  },
};
