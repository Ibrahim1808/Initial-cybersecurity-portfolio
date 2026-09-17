import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{const base=siteUrl();return base?['','/services','/gallery','/about','/contact'].map(path=>({url:base+path})):[];}
