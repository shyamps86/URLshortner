import { Button } from "@/components/ui/button";
import { UseUrlContext } from "@/context/contextApi";
import { getClicksForUrl } from "@/DB/apiCLicks";
import { deleteUrl, getUrl } from "@/DB/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BarLoader, BeatLoader } from "react-spinners";


const Link = () => {
  const {id}=useParams();

  const {user}=UseUrlContext()

  const navigate=useNavigate();

  const {loading,error,data:url,fnFetch}=useFetch(getUrl,{id,user_id:user?.id})

  const {loading:lodingStats,data:stats,fnFetch:fnStats}=useFetch(getClicksForUrl,id);
  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);
   if(error){
    navigate("/dashboard");
   }
   useEffect(()=>{
      fnFetch();
      fnStats();
   },[])

   console.log(url)

   const downloadImage = () => {
      const imageUrl = url?.qr;
      const fileName = url?.title;
  
      // Create an anchor element
      const anchor = document.createElement("a");
      anchor.href = imageUrl;
      anchor.download = fileName;
  
      // Append the anchor to the body
      document.body.appendChild(anchor);
  
      // Trigger the download by simulating a click event
      anchor.click();
  
      // Remove the anchor from the document
      document.body.removeChild(anchor);
    };

let link="";
console.log(url)
   if(url){
     link= url?.custom_url ? url?.custom_url : url.short_url;
   }
  return (
     <>
      {  (loading || lodingStats ) &&  (<BarLoader width={"100%"} color='red'/>) }
      <br />
         

       <div className="flex flex-col gap-8 sm:flex-row justify-between">
         <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
          <a className="text-3xl font-bold sm:text-4xl text-blue-200 hover:underline cursor-pointer" href={`http://shyam.in/${link}`}>http://shyam.in/{link}</a> <br />
          <a  target='_blank' href={url?.original_url}>{url?.original_url}</a>

          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimrr.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
         </div>
       </div>
    </>
  )
}

export default Link