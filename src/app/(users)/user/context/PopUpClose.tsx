"use client"
import { createContext, useEffect, useState  } from "react";
 export const  MyPopUpContext:any= createContext("");
 function PopUpClose({children}:any) {
     const [OpenPopUp,setOpenPopUp]=useState<boolean>(false);
     const [seekerId,setSeekerId]=useState<any>("");
    useEffect(()=>{
      if(typeof window !==undefined){
         const id=localStorage.getItem("userId")
         setSeekerId(id);
      }
    },[]);
   return (
      <MyPopUpContext.Provider value={{OpenPopUp,setOpenPopUp,seekerId,setSeekerId}}>
           {children}
      </MyPopUpContext.Provider>
   )
 }
 
 export default PopUpClose;