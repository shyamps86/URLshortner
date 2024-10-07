import CreateLink from '@/components/createLink'
import Error from '@/components/error'
import LinkCard from '@/components/linkCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UseUrlContext } from '@/context/contextApi'
import { getClicksForUrls } from '@/DB/apiCLicks'
import { getUrls } from '@/DB/apiUrls'
import useFetch from '@/hooks/use-fetch'
import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const DashBoard = () => {

  const [searchQuery,setSearchQuery]=useState("");

  const {user}=UseUrlContext();

  const {error,loading,data:urls,fnFetch:fetchUrl}=useFetch(getUrls,user?.id);



      const {loading:loadingClicks,
      
      data:clicks,fnFetch:fnClicks}
      =useFetch(getClicksForUrls,
        urls?.map((url)=>url.id)
      );


  useEffect(()=>{
    fetchUrl();
  },[])

  useEffect(()=>{
    if(urls?.length){
      fnClicks();
    }
  },[urls?.length])


  const filterUrls=urls?.filter((url)=>url.title.toLowerCase().includes(searchQuery.toLowerCase()))

console.log(filterUrls)
  return (
    <div className='flex flex-col gap-8'>
      {loading || loadingClicks && <BarLoader width={"100%"} color='red' />}

     <div className='grid grid-cols-2 gap-4'>
       
      <Card >
          <CardHeader>
            <CardTitle>Links created </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
          
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>clicks created </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
          
        </Card>
     </div>

     <div className='flex justify-between'>
         <h1 className='text-3xl font-extrabold'>My Links</h1>
         
          <CreateLink/>
        
      </div>
      <div className='relative'>
          <Input type="text" placeholder='Filter Links....'
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          />

          <Filter className='absolute top-2 right-3' />

      </div>
      {error && <Error message={error.message}/>}
      {(filterUrls || []).map((url,id)=>{
        return <LinkCard key={url.id} url={url} fetchUrl={fetchUrl}/>
        })}
    </div>
  )
}

export default DashBoard