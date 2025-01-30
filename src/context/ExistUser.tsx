
"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
export const MyExistUser = createContext<any>("bikram dhami from bajhang");
function ExistUserContext({ children }: any) {
  const router=useRouter();
  const [userData, setUserData] = useState<any>("");
  const [roomId,setRoomId]=useState<any>("");
  const [userOrganizationData,setUserOrganizationData]=useState<any>("");
  const handlerGetEmployerDetails = async (id: any) => {
    const data = (await axios.get("/api/employer", {
      params: {
        id: id,
      }
    })).data;
    setUserData(data?.results)
    if(data?.results?.userType!=="employer"){
      router.push("/user");
    }
  }
  const handlerGetOrganizationDetails = async (id: any) => {
    const data = (await axios.get("/api/employer/organization_details", {
      params: {
        id: id,
      }
    })).data;
    setUserOrganizationData(data?.results);
   
  }
  
  useEffect(() => {
    if (typeof window !== undefined) {
      const employerId = localStorage.getItem("employerId");
      const userId=localStorage.getItem("userId");
       if(employerId){
        setRoomId(employerId);
        handlerGetEmployerDetails(employerId);
        handlerGetOrganizationDetails(employerId);
        router.push("/messaging")
       }

    }


  }, []);
  return (
    <MyExistUser.Provider value={{roomId,setRoomId, userData, setUserData,userOrganizationData,setUserOrganizationData}}>
      {children}
    </MyExistUser.Provider>
  )
}

export default ExistUserContext;