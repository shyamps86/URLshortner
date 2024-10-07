import Login from '@/components/login';
import SignUp from '@/components/signUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseUrlContext } from '@/context/contextApi';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Auth = () => {

  const [searchParams,setSearchParams]=useSearchParams();

  const {loading,isAuthenticated}=UseUrlContext();
  const navigate=useNavigate();
  useEffect(()=>{
    if(isAuthenticated && !loading){
      navigate('/dashboard');
    }
  },[isAuthenticated,loading])
  
  return (
    <div className='mt-40 flex flex-col items-center'>
      <h1 className='text-5xl font-extrabold mb-7'>
        {searchParams.get("createNew")?"Hold up bhai,let's login first...":"Login/SignUp"}
        </h1>
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className=' w-full grid grid-cols-2'>
          <TabsTrigger value="login">login</TabsTrigger>
          <TabsTrigger value="sign up">sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login/>
          </TabsContent>
        <TabsContent value="sign up">
          <SignUp/>
        </TabsContent>
      </Tabs>


    </div>
  )
}

export default Auth