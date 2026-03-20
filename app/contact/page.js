import { PageHero } from "@/components/page-hero";
import { ContactPanel } from "@/components/contact-panel";

export const metadata = {
  title: "Contact",
  description: "Public contact page with social links for cybersecurity collaboration.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out through public channels"
        description="Use this section for GitHub, LinkedIn, email, or any other public contact method you want to share."
      />
      <ContactPanel />
    </>
  );
}
