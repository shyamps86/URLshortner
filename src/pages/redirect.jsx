import { getLongerUrl, storeClicks } from '@/DB/apiUrls';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const Redirect = () => {

  const {id}=useParams();

  const {loading,data,fnFetch}=useFetch(getLongerUrl,id);

  const {loading:loadinStaus,fn:fnStats}=useFetch(storeClicks,{
    id:data?.id,
    original_url:data?.original_url
  });


  useEffect(()=>{
     fnFetch();
  },[])



  
  useEffect(()=>{
    if(!loading && data){
      fnStats();
    }
 },[])


 if(loading || loadinStaus){
  return(
    <>
       <BarLoader width={"100%"} color='red'/>
       <br />
       Redirecting....
    </>
  )
 }
  return (
    <div>
      
    </div>
  )
}

export default Redirect