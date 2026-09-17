'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="container not-found"><p className="eyebrow">Something went wrong</p><h1>Let’s try that again.</h1><p>This page could not load. Please try again.</p><button className="button" onClick={reset}>Try again ↗</button></section>}
