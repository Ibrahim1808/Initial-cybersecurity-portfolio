import { PageHero } from "@/components/page-hero";
import { ResumePanel } from "@/components/resume-panel";

export const metadata = {
  title: "Resume",
  description: "View and download a PDF cybersecurity resume.",
};

export default function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Resume"
        title="View or download a public PDF resume"
        description="No login, no dashboard, and no extra tooling. Replace the sample file with your own resume whenever you are ready."
      />
      <ResumePanel />
    </>
  );
}
