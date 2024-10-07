import React, { useEffect, useState } from 'react'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'

import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { signUp } from '@/DB/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseUrlContext } from '@/context/contextApi'



const SignUp = () => {

    const [errors,setErrors]=useState([]);

    
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        name:"",
        profile_pic:null,
    })
    
    const {fetchUser}=UseUrlContext();

    const [searchParams]=useSearchParams();
    const navigate=useNavigate();
    const {data,error,loading,fnFetch:fnSignUp}= useFetch(signUp,formData);

    const handleInputChange=(e)=>{
        const {name,value,files}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:files?files[0]:value,

        }))
    }
    
   const longLink=searchParams.get('createNew')

   useEffect(()=>{
     
      if(error===null && data){
        navigate(`/dashboard${longLink?`createNew=${longLink}`:""}`)
        fetchUser();
      }

   },[data,error])

    const handleSignup=async()=>{
        setErrors([]);
        try{
            const schema=Yup.object().shape({
                name:Yup.string().required("Enter name"),
                email:Yup.string()
                    .email("invalid email")
                    .required("email required"),
                password:Yup.string()
                    .min(6,"minimum 6 character needed")
                    .required("password required"),
                profile_pic:Yup.mixed().required("profile picture required"),
            })
    
            await schema.validate(formData,{abortEarly:false})

            // api call

            await fnSignUp();
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
                  <CardTitle>signUp</CardTitle>
                  <CardDescription>
                    create new account here!!!
                  </CardDescription>
                   {error &&  <Error message={error.message}/>}
              </CardHeader>
              <CardContent className='space-y-2'>
                 <div className='space-y-1'>
                     <Input className='' name='name' type='text' 
                     placeholder="Enter name" 
                     onChange={handleInputChange}
                     />
                     {errors.name && <Error message={errors.name}/>}
                 </div>
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
                 <div className='space-y-1'>
                     <Input className='' name='profile_pic' type='file' accept='image/*'
                     placeholder="Enter Password" 
                     onChange={handleInputChange}
                     />
                     {errors.profile_pic && <Error message={errors.profile_pic}/>}
                 </div>
                 
              </CardContent>
              <CardFooter>
                  <Button onClick={handleSignup}>
                    {loading?<BeatLoader size={10} color='red'/>:"create account"}
                  </Button>
              </CardFooter>
          </Card>

    </div>
  )
}





export default SignUp
