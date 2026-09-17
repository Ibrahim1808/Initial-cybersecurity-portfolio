import {PageIntro,CTA} from '@/components/ui';
import {Gallery} from '@/components/gallery';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Project Gallery','Explore real Carreiro flooring photographs: residential floors, stairs, material details and work in progress.','/gallery');
export default function GalleryPage(){return <><PageIntro eyebrow="The Carreiro portfolio" title="Real spaces. Considered details.">Explore our work, from the warmth of a living room to the finishing touch on a staircase.</PageIntro><section className="container gallery-section" aria-label="Project gallery"><Gallery/></section><CTA/></>}
