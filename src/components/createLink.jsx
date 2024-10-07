import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UseUrlContext } from '@/context/contextApi'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './error';
import { Card } from './ui/card';
import * as Yup from 'yup'
import { QRCode } from 'react-qrcode-logo';
import useFetch from '@/hooks/use-fetch';
import { InsertLinks } from '@/DB/apiUrls';
import { BeatLoader } from 'react-spinners';



const CreateLink = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")
    const ref=useRef();
    const navigate = useNavigate();
    
    const [errors,setErrors]=useState();
    
    const [formValues,setFormValues]=useState({
        title:"",
        longUrl: longLink?longLink:"",
        customUrl:"",
        
    });
    
    
    const schema=Yup.object().shape({
        title:Yup.string().required("enter title"),
        longUrl:Yup.string().url("Must Be Valid Url").required("Long Url Is Required"),
        customUrl:Yup.string(),
    });
    
    const handleChange=(e)=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value,
        })
    }
    
    const { user } = UseUrlContext();

   const {loading,error,data,fnFetch:insertIntoUrls}= useFetch(InsertLinks,{...formValues,user_id:user.id})


   useEffect(()=>{
    if(error===null && data){
        navigate(`/link/${data[0].id}`)
    }
   },[error,data])

   const createUrl=async()=>{
      setErrors([])
        try{
           await schema.validate(formValues,{abortEarly:false});

            const canvas=ref.current.canvasRef.current;
            console.log(canvas)
            const blob=await new Promise((resolve)=>canvas.toBlob(resolve));
            console.log(blob)

            await insertIntoUrls(blob);
        }
        catch(e){
            const newErrors={};

            e?.inner?.forEach((err)=>{
                newErrors[err.path]=err.message;
            });
            setErrors(newErrors);
        }
   }
    return (
        <div className='flex flex-col space-y-2'>
            <Dialog >
                <DialogTrigger><Button variant="destructive">Create Link</Button></DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="m-1">Create New</DialogTitle>
                        {formValues?.longUrl && (<QRCode value={formValues?.longUrl} size={200} ref={ref}/>)}
                        <DialogDescription>
                            <Input name='title' placeholder='enter short link tittle'
                             className='capitalize m-3' 
                             value={formValues.title}
                             onChange={handleChange}
                             />
                           {errors?.title && <Error message={errors?.title} />}

                            <Input name='longUrl' placeholder='enter loooong url'
                             className='capitalize m-3'
                             value={formValues.longUrl}
                             onChange={handleChange}
                             />
                             {errors?.longUrl && <Error message={errors?.longUrl} />}
                            <div className='flex items-center gap-2 m-2'>
                                <Card className='p-2'>shyam/s</Card>
                                <Input name='customUrl' placeholder='enter custom link (optional)' 
                                className='capitalize' 
                                value={formValues.customUrl}
                                onChange={handleChange}
                                />
                            </div>
                            {error && <Error message={error.message} />}

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='sm:justify-start'>
                        <Button disabled={loading} onClick={createUrl} variant="destructive">
                        {loading ? <BeatLoader size={10} color={"white"}/>:"create"}

                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default CreateLink