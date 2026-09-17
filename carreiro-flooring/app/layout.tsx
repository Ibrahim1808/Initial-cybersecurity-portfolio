import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { businessConfig as b } from '@/lib/business';
import { siteUrl } from '@/lib/seo';
import './globals.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/manrope/latin-600.css';
export const metadata:Metadata={title:{default:`${b.businessName} | Professional Flooring Installation`,template:`%s | ${b.businessName}`},description:'Professional hardwood, vinyl, laminate and stair flooring. Explore real Carreiro projects and request a free quote.',icons:{icon:'/icon.svg',apple:'/apple-icon.png'},robots:process.env.VERCEL_ENV==='preview'?{index:false,follow:false}:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){const url=siteUrl();const schema={'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:b.businessName,telephone:b.phone,email:b.email,areaServed:b.serviceArea,...(url?{url,image:url+'/images/social.jpg'}:{}),hasOfferCatalog:{'@type':'OfferCatalog',name:'Flooring services',itemListElement:['Hardwood Flooring','Vinyl Flooring','Laminate Flooring','Stairs'].map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name}}))}};return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></body></html>}
