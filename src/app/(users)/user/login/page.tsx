"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button'
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader } from 'lucide-react'

import { useDispatch } from 'react-redux'
import { validUserToken } from '@/Redux/Slice'
import { toast } from '@/components/ui/use-toast'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { handler } from 'tailwindcss-animate'

function Login() {

  const router = useRouter();
  const socialItem = [

    {
      name: "google",
      role: "Employer (रोजगारदाता)",
      image: "/images/social/google.png",
      // link:"https://www.linkedin.com"
    },
    {
      name: "google",
      role: "Employee (कर्मचारी)",
      image: "/images/social/google.png",
      // link:"https://www.linkedin.com"
    },
    {
      name: "google",
      role: "Admin",
      image: "/images/social/admin.png",
      // link:"https://www.linkedin.com"
    },
  ]
  const seekerGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
      );

        console.log(userInfo, "userInfo")
      const data = (await axios.post("/api/user/google", userInfo.data)).data;
      if (typeof window !== undefined) {
        console.log(data)
        if (data?.message == "User Already Exists") {
          localStorage.setItem("userId", data?.results._id);

          router.push("/user/userinformation");
        }
        localStorage.setItem("userId", data?.results._id);

        router.push("/user/userinformation");
      }

      // console.log(userInfo?.data,"user Info");

    },
    onError: errorResponse => console.log(errorResponse),
  });

       // employer  login from google 
       const handlerEmployergoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );


            const data = (await axios.post("/api/employer", userInfo.data)).data;
            console.log(data, "This is data")
            if (typeof window !== undefined) {
                console.log(data)
                if (data?.message == "User Already Exists") {
                    localStorage.setItem("employerId", data?.results._id);

                    router.push("/employer");
                }
                localStorage.setItem("employerId", data?.results._id);

                router.push("/employer");
            }

            // console.log(userInfo?.data,"user Info");

        },
        onError: errorResponse => console.log(errorResponse),
    });
 
  // admin login from google


  const handlerUserType = async (role: string) => {
    console.log(role, "role")
    if (role == "Employee (कर्मचारी)") {
      if (typeof window !== undefined) {
        const data = localStorage.getItem("userId");
        if (!data) {
          seekerGoogleLogin()
        } else {
          router.push("/user/")
        }
      }
    } else if (role == "Employer (रोजगारदाता)") {
      if (typeof window !== undefined) {
        const data = localStorage.getItem("employerId");
        if (!data) {
            handlerEmployergoogleLogin()
        } else {
            router.push("/employer")
        }
    }
    } else if(role== "Admin"){
       
    }
  }

 


  return (
    <div className='flex  flex-col justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>

      <div className=' grid-cols-2 justify-center items-center'>
        <div className=' flex flex-col justify-center '>
          <p className='text-3xl mt-6'><strong>Make your dream career a <span className=' text-blue-600'> reality</span></strong></p>
          <div className=' flex gap-4'><span className=''> <b>With</b></span> <Image alt="image" src={"/images/logo.png"} height={100} width={100}></Image></div>
          <div>

            <Image alt='login image' src={"/images/login.png"} height={400} width={400} className=' h-full'></Image>
          </div>
        </div>
      </div>
      <div className='relative  flex flex-col shadow-lg p-6 justify-center items-center ml-12 rounded-md'>
        < Link href={"/user/login"} className=' mb-4 border-b-[2px] p-1 font-bold text-xl  '>Login/SignUp</Link>
        <div className='flex flex-col gap-4'>

          <div className=' flex flex-col gap-3 cursor-pointer self-center'>
            {
              socialItem.map((item: any, index) => (
                <>
                  <div onClick={() => {
                    handlerUserType(item?.role);
                  }}  key={index} className=' shadow-sm hover:shadow-md transition-all duration-100 ease-in flex gap-4 items-center  justify-between border p-2 rounded-md '>
                    <h1>{item?.role}</h1>    <Image src={item?.image} height={30} width={30} alt={item.name} ></Image>
     
                  </div>
                </>
              ))
            }
          </div>
          <p className=' text-center'>Don't have an account ? <Link href={"/user/signup"} className=' underline text-blue-600'> Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
