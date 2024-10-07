import { getCurrentUser } from '@/DB/apiAuth';
import useFetch from '@/hooks/use-fetch';
import { createContext, useContext, useEffect } from 'react'

const UrlContext=createContext();

export const UseUrlContext=()=>{
    return useContext(UrlContext);
    
}


const UrlProvider=({children})=>{

   const {data:user,loading,fnFetch:fetchUser} =useFetch(getCurrentUser);

   const isAuthenticated=user?.role==='authenticated';

   useEffect(()=>{
    fetchUser();
   },[])

   return(
    <UrlContext.Provider value={{user,loading,fetchUser,isAuthenticated}}>
      {children}
    </UrlContext.Provider>)
   
}

export default UrlProvider;