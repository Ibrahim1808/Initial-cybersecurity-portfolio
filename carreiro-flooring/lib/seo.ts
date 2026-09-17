import type { Metadata } from 'next';
import { businessConfig } from './business';
export function siteUrl() {
  const value=process.env.SITE_URL || (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  if (!value) return undefined;
  const url=new URL(value);
  if (!['http:','https:'].includes(url.protocol)) throw new Error('SITE_URL must use https://');
  return url.origin;
}
export function pageMetadata(title:string, description:string, path:string):Metadata {
  const base=siteUrl();
  return {title:{absolute:`${title} | ${businessConfig.businessName}`},description,alternates:base?{canonical:base+path}:undefined,
    openGraph:{title:`${title} | ${businessConfig.businessName}`,description,type:'website',siteName:businessConfig.businessName,...(base?{url:base+path,images:[{url:base+'/images/social.jpg',width:1200,height:630,alt:'Real Carreiro flooring project'}]}:{})},
    twitter:{card:'summary_large_image',title,description,...(base?{images:[base+'/images/social.jpg']}:{})}};
}
