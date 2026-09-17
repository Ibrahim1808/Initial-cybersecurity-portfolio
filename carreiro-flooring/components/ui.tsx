import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects.json';
export function Arrow(){return <span aria-hidden="true">↗</span>}
export function Button({href='/contact',children='Get a free quote',light=false}:{href?:string;children?:React.ReactNode;light?:boolean}){return <Link className={`button ${light?'button-light':''}`} href={href}>{children}<Arrow/></Link>}
export function ProjectImage({id,className='',priority=false,sizes='(max-width: 700px) 100vw, 50vw'}:{id:number;className?:string;priority?:boolean;sizes?:string}){const p=projects.find(x=>x.id===id)!;return <Image className={className} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={sizes} priority={priority}/>}
export function PageIntro({eyebrow,title,children}:{eyebrow:string;title:string;children:React.ReactNode}){return <section className="page-intro container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></section>}
export function CTA(){return <section className="cta"><div className="cta-image"><ProjectImage id={41}/></div><div className="cta-copy"><p className="eyebrow">Your next chapter starts here</p><h2>Make room for<br/><em>something beautiful.</em></h2><p>Tell us about your space. Let’s talk flooring, finishes and the details of your project.</p><Button light>Request a free quote</Button></div></section>}
