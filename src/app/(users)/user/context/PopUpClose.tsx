"use client"
import { createContext, useState  } from "react";
 export const  MyPopUpContext:any= createContext("");
 function PopUpClose({children}:any) {
     const [OpenPopUp,setOpenPopUp]=useState<boolean>(false);
   return (
      <MyPopUpContext.Provider value={{OpenPopUp,setOpenPopUp}}>
           {children}
      </MyPopUpContext.Provider>
   )
 }
 
 export default PopUpClose;