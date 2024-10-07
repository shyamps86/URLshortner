import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../assets/banner.jpg'
const LandingPage = () => {

  const [longURl,setLongUrl]=useState("");
  const navigate=useNavigate();


  
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(longURl){
      navigate(`/auth?createNew=${longURl}`);
    }

  }
  return (
    <div className='flex flex-col '>
        <h2 className='Capitalize my-10 text-3xl sm:my-16 md:text-6xl lg:text-7xl
         text-white font-extrabold text-center'>The only shortener you needed!!</h2>
         <div>
            <form onSubmit={handleSubmit} className='sm:h-14 flex flex-col sm:justify-center sm:flex-row w-full md:w-2/4 gap-2 ' >
                <Input type='url' 
                 value={longURl}
                  placeholder="Enter looooong URL"
                  onChange={(e)=>setLongUrl(e.target.value)}
                  className='h-full flex-1 py-4 px-4 text-white'
                />    
                <Button variant='destructive' className='h-full' type='submit'>shortener</Button>
            </form>
            <img src={banner} alt="banner image" className='w-full h-auto my-11 md:px-11 rounded-lg '/>

            <Accordion type="multiple" className='w-full md:px-11'>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it possible to shorten the URL?</AccordionTrigger>
              <AccordionContent>
                Yes.It is. the way desinged it so let's go on give a try!!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it possible to shorten the URL?</AccordionTrigger>
              <AccordionContent>
                Yes.It is. the way desinged it so let's go on give a try!!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it possible to shorten the URL?</AccordionTrigger>
              <AccordionContent>
                Yes.It is. the way desinged it so let's go on give a try!!
              </AccordionContent>
            </AccordionItem>
        </Accordion>

         </div>
    </div>
  )
}

export default LandingPage