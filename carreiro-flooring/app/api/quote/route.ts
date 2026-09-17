import {NextRequest,NextResponse} from 'next/server';
import {validateQuote} from '@/lib/quote';
export const runtime='nodejs';
const failure=(message:string,status:number)=>NextResponse.json({ok:false,message},{status});
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');
 if(origin&&origin!==request.nextUrl.origin)return failure('This request could not be accepted.',403);
 if(!request.headers.get('content-type')?.includes('application/json'))return failure('Please use the quote form.',415);
 try{
  if(Number(request.headers.get('content-length')||0)>20000)return failure('Please shorten your message.',413);
  const reader=request.body?.getReader();if(!reader)return failure('Please complete the form.',400);
  const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>20000){await reader.cancel();return failure('Please shorten your message.',413)}chunks.push(value)}
  const value=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  const {data,errors}=validateQuote(value);if(!data)return NextResponse.json({ok:false,message:'Please check the highlighted fields.',errors},{status:400});
  if(data.website)return failure('This request could not be accepted. Please call or email us.',400);
  const {RESEND_API_KEY,QUOTE_FROM_EMAIL,QUOTE_TO_EMAIL}=process.env;
  if(!RESEND_API_KEY||!QUOTE_FROM_EMAIL||!QUOTE_TO_EMAIL)return failure('Online requests are being set up. Please call or email us directly.',503);
  // Add shared rate limiting or Turnstile here if spam volume requires it.
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:QUOTE_FROM_EMAIL,to:[QUOTE_TO_EMAIL],reply_to:data.email,subject:`Flooring quote: ${data.projectType}`,text:`Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nProject: ${data.projectType}\n\n${data.message}`}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)return failure('Your request could not be sent. Please call or email us directly.',502);
  const result=await response.json();if(typeof result.id!=='string')return failure('We could not confirm delivery. Please call or email us.',502);
  return NextResponse.json({ok:true});
 }catch{return failure('We could not process your request. Please try again or contact us directly.',400)}
}
