import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import projects from '../data/projects.json';
const routes=['/','/services','/gallery','/about','/contact'];
test('all pages: desktop, tablet and phone layout, links, images and accessibility',async({page,request})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:950});
  for(const route of routes){
   const response=await page.goto(route);expect(response?.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);await page.evaluate(()=>document.fonts.ready);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
   const bad=await page.locator('a[href]').evaluateAll(els=>els.filter(e=>{const h=e.getAttribute('href');return !h||h==='#'}).length);expect(bad).toBe(0);
   await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
   if(width===1440||width===390){const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([])}
   if(width===1440||width===390)await page.screenshot({path:`.qa/${route==='/'?'home':route.slice(1)}-${width}.png`,fullPage:route!=='/gallery'});
  }
 }
 for(const p of projects){const r=await request.get(p.src);expect(r.status(),p.src).toBe(200);expect((await request.get(p.thumb)).status()).toBe(200)}
 expect(errors).toEqual([]);
});
test('filters, lightbox keyboard, focus return and swipe',async({page})=>{
 await page.goto('/gallery');for(const f of ['Hardwood','Vinyl','Laminate','Stairs','In progress','All']){await page.getByRole('button',{name:f,exact:true}).click();const expected=projects.filter(p=>f==='All'||p.category===f||(f==='In progress'&&p.stage==='In progress')).length;await expect(page.locator('.project-card')).toHaveCount(expected)}
 await page.getByRole('button',{name:'Stairs',exact:true}).click();const first=page.locator('.project-card button').first();await first.click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.locator('.lightbox-bottom')).toContainText('1 / 3');await page.keyboard.press('ArrowRight');await expect(page.locator('.lightbox-bottom')).toContainText('2 / 3');await page.keyboard.press('ArrowLeft');await expect(page.locator('.lightbox-bottom')).toContainText('1 / 3');await page.getByRole('button',{name:'Next photograph'}).click();await expect(page.locator('.lightbox-bottom')).toContainText('2 / 3');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(first).toBeFocused();
 await first.click();await page.locator('.lightbox-stage').evaluate(el=>{el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[new Touch({identifier:1,target:el,clientX:250})]}));el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[new Touch({identifier:1,target:el,clientX:50})]}))});await expect(page.locator('.lightbox-bottom')).toContainText('2 / 3');await page.getByRole('button',{name:'Close photograph'}).click();
});
test('mobile menu navigates and closes with Escape',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Open menu'}).click();await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Gallery'}).click();await expect(page).toHaveURL('/gallery');await expect(page.getByRole('button',{name:'Open menu'})).toBeVisible();await page.getByRole('button',{name:'Open menu'}).click();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Open menu'})).toHaveAttribute('aria-expanded','false')});
test('form validates and never fakes a submission',async({page,request})=>{await page.goto('/contact?type=Stairs');await expect(page.locator('select')).toHaveValue('Stairs');await expect(page.getByRole('button',{name:'Request a free quote'})).toBeDisabled();await page.locator('form').evaluate((f:HTMLFormElement)=>f.requestSubmit());await expect(page.locator('#name-error')).toBeVisible();await expect(page.locator('#phone-error')).toBeVisible();await expect(page.locator('#email-error')).toBeVisible();await expect(page.locator('#message-error')).toBeVisible();
 const invalid=await request.post('/api/quote',{data:{}});expect(invalid.status()).toBe(400);
 const data={name:'Site test',phone:'4845551234',email:'test@example.com',projectType:'Stairs',message:'Local integration test. No email should be sent.'};
 const unconfigured=await request.post('/api/quote',{data});expect(unconfigured.status()).toBe(503);expect((await unconfigured.json()).ok).toBe(false);
 expect((await request.post('/api/quote',{data:{...data,website:'spam'}})).status()).toBe(400);
 expect((await request.post('/api/quote',{data,headers:{origin:'https://untrusted.example'}})).status()).toBe(403);
 expect((await request.post('/api/quote',{data:{...data,message:'x'.repeat(21000)}})).status()).toBe(413);
});
test('metadata, SEO assets and branded 404',async({page,request})=>{for(const route of routes){await page.goto(route);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{30,}/);await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);expect(await page.title()).toContain('Carreiro');expect(JSON.parse(await page.locator('script[type="application/ld+json"]').innerHTML()).name).toBe('Carreiro Flooring Contractor LLC')}
 for(const path of ['/robots.txt','/sitemap.xml','/icon.svg','/apple-icon.png','/images/social.jpg'])expect((await request.get(path)).status()).toBe(200);
 expect(await (await request.get('/robots.txt')).text()).toContain('Allow: /');const response=await page.goto('/not-a-real-page');expect(response?.status()).toBe(404);await expect(page.getByRole('link',{name:'Back to home'})).toBeVisible();
});
