import React, { useEffect, useState } from 'react'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'

import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/DB/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseUrlContext } from '@/context/contextApi'




const Login = () => {

    const [errors,setErrors]=useState([]);

    
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })
    
    const [searchParams]=useSearchParams();
    const navigate=useNavigate();
    const {data,error,loading,fnFetch:fnLogin}= useFetch(login,formData);

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value,

        }))
    }
    const longLink=searchParams.get('createNew');
    
    const {fetchUser}= UseUrlContext();

   useEffect(()=>{
     
      if(error===null && data){
        fetchUser();
        navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`)
        
      }

   },[data,error])

    const handleLogin=async()=>{
        setErrors([]);
        try{
            const schema=Yup.object().shape({
                email:Yup.string()
                    .email("invalid email")
                    .required("email required"),
                    password:Yup.string()
                    .min(6,"minimum 6 character needed")
                    .required("password required"),
            })
    
            await schema.validate(formData,{abortEarly:false})

            // api call

            await fnLogin();
        }
        catch(e){
            const newErrors={};

            e?.inner?.forEach((err)=>{
                newErrors[err.path]=err.message;
            })

            setErrors(newErrors)
        }
    }
  return (
    <div>
          <Card>
              <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    if you are already a user,go Head!!
                  </CardDescription>
                   {error &&  <Error message={error.message}/>}
              </CardHeader>
              <CardContent className='space-y-2'>
                 <div className='space-y-1'>
                     <Input className='' name='email' type='email' 
                     placeholder="Enter Email" 
                     onChange={handleInputChange}
                     />
                     {errors.email && <Error message={errors.email}/>}
                 </div>
                 <div className='space-y-1'>
                     <Input className='' name='password' type='password' 
                     placeholder="Enter Password" 
                     onChange={handleInputChange}
                     />
                     {errors.password && <Error message={errors.password}/>}
                 </div>
              </CardContent>
              <CardFooter>
                  <Button onClick={handleLogin}>
                    {loading?<BeatLoader size={10} color='red'/>:"Login"}
                  </Button>
              </CardFooter>
          </Card>

    </div>
  )
}

export default Login