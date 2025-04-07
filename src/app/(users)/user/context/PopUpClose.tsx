"use client"
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const MyPopUpContext: any = createContext("");
function PopUpClose({ children }: any) {
   const [OpenPopUp, setOpenPopUp] = useState<boolean>(false);
   const [seekerId, setSeekerId] = useState<any>("");
   const [jobSeekerApplyData, setJobSeekerApplyData] = useState<any>();
   const [validUser, setValidUser]=useState<any>();
   const handlerChatEnable=async(id:string)=>{

       const send=(await axios.get("/api/user/apply",{params:{id:id}})).data
       if(send.status===200){
          setJobSeekerApplyData(send?.data);
          console.log(send,"this is in pop up")
         toast({title:"Apply successfully",className:"bg-white text-black border-green-600 border-[2px]"})
       }
      
   }
   useEffect(() => {
      if (typeof window !== undefined) {
         const id = localStorage.getItem("userId");
         console.log(id,"this is in pop up")
         setSeekerId(id);
        if(id){
         handlerChatEnable(id);
         console.log(id,"this is in pop up")
         setOpenPopUp(true)
        }
      }
   
       return()=>{
         setOpenPopUp(false)
         setSeekerId("")
         setJobSeekerApplyData("")
         setValidUser(false)
         // localStorage.removeItem("userId")
         // localStorage.removeItem("employerId")
       }
   }, []);
   return (
      <div>
         <MyPopUpContext.Provider value={{ validUser, setValidUser,OpenPopUp, setOpenPopUp, seekerId, setSeekerId, jobSeekerApplyData, setJobSeekerApplyData }}>

            {children}
         </MyPopUpContext.Provider>
      </div>
   )
}

export default PopUpClose;