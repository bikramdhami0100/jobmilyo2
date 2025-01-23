
"use client"
import axios from "axios";
import { createContext, useEffect, useState  } from "react";
 export const  MyEmployerLogInContext= createContext<any>("bikram dhami from bajhang");
 function EmployerContext({children}:any) {
     const [employerDate,setEmployerData]=useState<any>("");
     const handlerGetEmployerDetails=async(id:any)=>{
      const data=(await axios.get("/api/employer",{
        params:{
          id:id,
        }
      })).data;
      setEmployerData(data?.results)
      console.log(data)
      
    }
     useEffect(()=>{
    if(typeof window !==undefined){
   const id=   localStorage.getItem("employerId");
      handlerGetEmployerDetails(id)
    }
     },[]);

   return (
      <MyEmployerLogInContext.Provider value={{employerDate,setEmployerData,message:"Hello Employer"}}>
           {children}
      </MyEmployerLogInContext.Provider>
   )
 }
 
 export default EmployerContext;