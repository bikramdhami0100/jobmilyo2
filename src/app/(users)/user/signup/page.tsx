
"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface MysignupType {
  fullname: string,
  dob: string,
  email: string | undefined,
  password: string,
  confirmpassword: string
}

function Signup() {
  const socialItem=[
    // {
    //   name:"apple",
    //   role:"Job seeker"
    //   // image:"/images/social/apple.png",
    //   // link:"https://www.facebook.com"
    // },
    
    {
      name:"google",
      role:"Employer",
      image:"/images/social/google.png",
      // link:"https://www.linkedin.com"
    },
    {
      name:"google",
      role:"Job Seeker",
      image:"/images/social/google.png",
      // link:"https://www.linkedin.com"
    },
]
  return (
    <div className='flex flex-wrap  w-full h-full'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />

      <div className=' sm:w-full md:w-[60%] lg:w-[60%]'>
        <div>
          <div className='flex gap-4 mt-4'>
            <Image alt="image" src={"/images/logo.png"} height={200} width={200} />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-3xl'>
              <strong>
                <span className='text-red-600'>Create</span> a new account and get your <span className='text-blue-600'>Dream Job</span>
              </strong>
            </p>
            <div>
              <Image alt='login image' src={"/images/signup.png"} height={400} width={400} className='h-full' />
            </div>
          </div>
        </div>
      </div>

      <div className='relative border m-6 shadow-md  p-6 sm:w-[90%] md:w-[32%] lg:w-[32%] rounded-md gap-2'>
        {/* let create */}
        <div className='m-4 w-full text-2xl font-bold'>
          <h1 className=' text-center w-full'>Let's create a new account</h1>
           <div className=' h-[2px] bg-gray-400'></div>
        </div>

        <div className='relative  flex flex-col  p-6 justify-center items-center ml-12 rounded-md'>
        
         <div  className='flex flex-col gap-4'>
         
           <div className=' flex flex-col gap-3 cursor-pointer self-center'> 
             {
              socialItem.map((item:any,index)=>(
                <>
                  <div key={index} className=' shadow-sm hover:shadow-md transition-all duration-100 ease-in flex gap-4 items-center  justify-between border p-2 rounded-md '>
                   <h1>{item?.role}</h1>    <Image src={item.image} height={30} width={30} alt={item.name} ></Image>
                  </div>
                </>
              ))
             }
           </div>
           <p className=' text-center'>You have an account ? <Link href={"/user/login"} className='  text-blue-600'> Login</Link></p>
         </div>
      </div>

      </div>
    </div>
  );
}

export default Signup;
