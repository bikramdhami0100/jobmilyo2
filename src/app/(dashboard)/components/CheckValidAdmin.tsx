"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
function CheckValidAdmin() {
    const [showAdmin,setshowAdmin]=useState<any>(false);
    const [loading,setLoading]=useState<any>(false)
    const router= useRouter()
    const ValideAdmin=async()=>{
        setLoading(true)
      try {
        const data=(await axios.get("/api/checkadmin/")).data
      //   console.log(data);
     if(data.success===true){
        setLoading(false)
        setshowAdmin(true)
     }else{
        setshowAdmin(false)
        setLoading(false)
        router.push("/user/login")
     }
      } catch (error) {
         if(error){
            setshowAdmin(false)
            setLoading(false)
            router.push("/user/login")
         }
      }
        
    }
    
useEffect(()=>{
ValideAdmin()
},[])



  return (
   <>
     {
     loading==false? "":(<div className='bg-white dark:bg-[#111827] w-screen h-screen absolute overflow-x-hidden overflow-y-hidden z-40 '>
             <h1 className=' text-center mt-[48%] text-3xl font-bold text-red-600'>Loading ....  </h1> 
        </div>)
    }
    {
     showAdmin? "":(<div className='bg-white dark:bg-[#111827] w-screen h-screen absolute overflow-x-hidden overflow-y-hidden z-40 '>
             <h1 className=' text-center mt-[48%] text-3xl font-bold text-red-600'>Loading...  </h1> 
        </div>)
    }
   
   </>
  )
}

export default CheckValidAdmin