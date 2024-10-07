import supabase from "./supabase";


export const getClicksForUrls=async(urlIds)=>{
    const {data,error}= await supabase
    .from("clicks")
    .select("*")
    .in("url_id",urlIds);

     if(error){
        console.log(error.message);
        throw new Error("unable load the clicks table data");
     }

    return data;
}

export async function getClicksForUrl(url_id) {
    const {data, error} = await supabase
      .from("clicks")
      .select("*")
      .eq("url_id", url_id);
  
    if (error) {
      console.error(error);
      throw new Error("Unable to load Stats");
    }
  
    return data;
  }


 