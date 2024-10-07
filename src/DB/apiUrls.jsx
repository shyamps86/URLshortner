import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";
import { parse } from "postcss";

export const getUrls=async(user_id)=>{
    const {data,error}= await supabase
            .from("urls")
            .select("*")
            .eq("user_id",user_id)

    if(error) {
        console.log(error.message)
         
        throw new Error("unable to load the getUrls");
    }

    return data;
}



export async function getUrl({id, user_id}) {
    const {data, error} = await supabase
      .from("urls")
      .select("*")
      .eq("id", id)
      .eq("user_id", user_id)
      .single();
  
    if (error) {
      console.error(error);
      throw new Error("Short Url not found");
    }
  
    return data;
  }


export const deleteUrl=async(id)=>{
    const {data,error}= await supabase
            .from("urls")
            .delete()
            .eq("id",id)

    if(error) {
        console.log(error.message)
        
        throw new Error("unable to delete the getUrls");
    }

    return data;
}




export const InsertLinks=async({title,customUrl,longUrl,user_id},qrCode)=>{
    const short_url=Math.random().toString().substring(2,6)
    const fileName=`qr-${short_url}`;
   
    const {error:storageError}=await supabase.storage.from("qrs").upload(fileName,qrCode)

    if(storageError){
        throw new Error(storageError.message);
    }

    const qr=`${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
    const {data,error}=await supabase.from("urls").insert([
        {
            title,
            user_id,
            original_url:longUrl,
            custom_url: customUrl  || null,
            short_url,
            qr
        }
    ]).select();

    if(error){
        console.log(error.message)
        throw new Error("cannot be inserted");
    }
    return data;
}




export const getLongerUrl=async(id)=>{
    const {data,error}= await supabase
            .from("urls")
            .select("id,original_url")
            .or(`short_url${id}`,`custom_url${id}`)
            

    if(error) {
        console.log(error.message)
        
        throw new Error("unable to fetch short or custom");
    }

    return data;
}


const parser=new UAParser();

export const storeClicks=async({id,originalUrl})=>{
  try{
    const res=parse.getResult();
    const device=res.type || 'desktop'

    const response=await fetch('https://ipapi.co/json');

    const {city,country_name:country}=await response.json();

    await supabase.from("clicks").insert({
        url_id:id,
        city:city,
        country:country,
        device:device
    });

    window.location.href=originalUrl;

        
  }
  catch(error){
    console.log("error recording in clicks"+error)
  }
}



