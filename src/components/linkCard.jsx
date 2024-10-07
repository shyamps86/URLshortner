import { Copy, Download, Trash } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/DB/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({url,fetchUrl}) => {

    const downloadImage=()=>{

        const element=document.createElement("a");
        element.href=url?.qr;
        element.download=url?.title;

        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    }
  
     const {loading:loadingDelete,fnFetch:deleteURL}=useFetch(deleteUrl,url.id)


  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
        <img className='ring ring-blue-500 h-32 object-contain self-start' 
        src={url.qr} alt="qr code"/>
        <Link className='flex flex-col border-2 flex-1' to={`/link/${url?.id}`}>
          <span className='text-2xl font-semibold'>{url?.title}</span>
          <span className='text-xl font-semibold hover:underline cursor-pointer text-blue-500'>https://shyam.in/${url?.custom_url ? (url?.custom_url ):(url?.short_url) }</span>
          <span className='flex items-center gap-1 hover:underline'>{url?.original_url}</span>
          <span className='flex items-end text-sm flex-1'>{new Date(url?.created_at).toLocaleString()}</span>
        </Link>

        <div className='flex'>
            <Button 
            onClick={()=>{navigator.clipboard.writeText(`https://shyam.in/${url?.short_url}`)}}
            variant='ghost'>
            <Copy/>
             </Button>
            <Button onClick={downloadImage} variant='ghost'>
            <Download/>
            </Button>
            <Button onClick= {()=>deleteURL().then(()=>fetchUrl())} variant='ghost'>
            <Trash/>
            </Button>

            {loadingDelete && <BeatLoader size={5} color='white'/>}
            
        </div>
    </div>
  )
}

export default LinkCard