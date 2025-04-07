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
        if(typeof window !== "undefined"){
            const adminId=localStorage.getItem("adminId");
            console.log(adminId)
            if(adminId){
               //  setshowAdmin(true)
                router.push("/admin/dashboard");
                setLoading(false);
                setshowAdmin(false);
            }else{
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