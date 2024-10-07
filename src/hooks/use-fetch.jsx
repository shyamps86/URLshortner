import React, { useState } from 'react'

const useFetch = (cb,options={}) => {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(null);
    const [error,setError]=useState(null);

    const fnFetch= async(...args)=>{
        setLoading(true);
        setError(null);
        try{
            const response=await cb(options,args);
            setData(response);
        }
        catch(err){
            setError(err);
        }
        finally{
            setLoading(false);
        }

    }
    return {data,error,loading,fnFetch};

}

export default useFetch
