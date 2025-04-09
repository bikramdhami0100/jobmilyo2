
"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
export const MyEmployerLogInContext = createContext<any>("bikram dhami from bajhang");
function EmployerContext({ children }: any) {
  const router=useRouter();
  const [employerData, setEmployerData] = useState<any>("");
  const [organizationData,setOrganizationData]=useState<any>("");
  const handlerGetEmployerDetails = async (id: any) => {
    const data = (await axios.get("/api/employer", {
      params: {
        id: id,
      }
    })).data;
    setEmployerData(data?.results)
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
    setOrganizationData(data?.results);
   
  }
  
  useEffect(() => {
    if (typeof window !== undefined) {
      const id = localStorage.getItem("employerId");
      // console.log(id,"employer id from local storage")
      handlerGetEmployerDetails(id);
      handlerGetOrganizationDetails(id);
    }


  }, []);
  return (
    <MyEmployerLogInContext.Provider value={{ employerData, setEmployerData ,organizationData,setOrganizationData}}>
      {children}
    </MyEmployerLogInContext.Provider>
  )
}

export default EmployerContext;