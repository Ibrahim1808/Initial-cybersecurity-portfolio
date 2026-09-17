export const projectTypes=['Hardwood Flooring','Vinyl Flooring','Laminate Flooring','Stairs','Other'] as const;
export type Quote={name:string;phone:string;email:string;projectType:string;message:string;website?:string};
export function validateQuote(value:unknown):{data?:Quote;errors:Record<string,string>}{
 const v=(value&&typeof value==='object'?value:{}) as Record<string,unknown>;
 const data:Quote={name:'',phone:'',email:'',projectType:'',message:'',website:''};
 for(const key of Object.keys(data) as (keyof Quote)[])data[key]=typeof v[key]==='string'?(v[key] as string).trim():'';
 const errors:Record<string,string>={};
 if(data.name.length<2||data.name.length>100)errors.name='Please enter your name (2–100 characters).';
 if(!/^[+\d\s().-]+$/.test(data.phone)||data.phone.replace(/\D/g,'').length<10||data.phone.replace(/\D/g,'').length>15||data.phone.length>30)errors.phone='Please enter a phone number with 10–15 digits.';
 if(data.email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email))errors.email='Please enter a valid email address.';
 if(!(projectTypes as readonly string[]).includes(data.projectType))errors.projectType='Please choose a project type.';
 if(data.message.length<10||data.message.length>5000)errors.message='Please describe your project in 10–5,000 characters.';
 return {data:Object.keys(errors).length?undefined:data,errors};
}
