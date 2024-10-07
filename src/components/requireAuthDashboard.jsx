import { UseUrlContext } from "@/context/contextApi"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";



const RequireAuthDashboard = ({children}) => {

    const {isAuthenticated,loading,error}=UseUrlContext();
    const navigate=useNavigate();

     useEffect(()=>{
        if(!isAuthenticated && loading===false){
           navigate("/auth");
        }
     },[isAuthenticated,loading])

     if(loading){
        return <BarLoader width={"100%"}/>
     }
     if(isAuthenticated){
        return children
     }
}

export default RequireAuthDashboard