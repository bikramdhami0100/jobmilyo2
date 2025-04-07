"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import CryptoJS from 'crypto-js';

function Login() {

  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [loginLoader, setLoginLoader] = useState<any>()
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const passwordRegex = /^[a-zA-Z\s]/;

  useEffect(() => {
    if (email || password) {

      // setErrorBirth(!(dobRegex.test(birth) && birth.length > 4));
      setErrorEmail(!(emailRegex.test(email) && email.length > 4));
      setErrorPassword(!(passwordRegex.test(password) && password.length > 4));

    }
  }, [email, password]);
  const handlelogIn = async () => {

    if (typeof window !== undefined) {
      const data = localStorage.getItem("adminId");
      router.push("/admin/");
    }
    setLoginLoader(true)
    if (!email || !password) {
      setLoginLoader(false)
      return
    }
    
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO_JS!).toString();
    const data = (await axios.post("/api/adminlogin", { email, password: encryptedPassword })).data;

    console.log(data, "data");
    if(data?.user?.userType=="admin"){
      localStorage.setItem("adminId", data?.user?._id);
      router.push("/admin")
    }
    setLoginLoader(false);
  }
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
                  {
                    item?.role !== "Admin" && (
                      <div onClick={() => {
                        handlerUserType(item?.role);
                      }} key={index} className=' shadow-sm hover:shadow-md transition-all duration-100 ease-in flex gap-4 items-center  justify-between border p-2 rounded-md '>
                        <h1>{item?.role}</h1>    <Image src={item?.image} height={30} width={30} alt={item.name} ></Image>
                      </div>

                    )
                  }
                  {item?.role == "Admin" && (
                    <Dialog>
                      <DialogTrigger>
                        <div key={index} className=' shadow-sm hover:shadow-md transition-all duration-100 ease-in flex gap-4 items-center  justify-between border p-2 rounded-md '>
                          <h1>{item?.role}</h1>    <Image src={item?.image} height={30} width={30} alt={item.name} ></Image>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className=' text-center'>Admin Login</DialogTitle>
                          <DialogDescription>
                            <div className='flex  flex-col justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>
                              <div className='relative  flex flex-col shadow-lg p-6 justify-center items-center ml-12 rounded-md'>
                                <div className='flex flex-col gap-4'>
                                  <div className="flex flex-col justify-start item-start w-full">
                                    <label className=' font-bold mb-1 text-start items-start' htmlFor="email">Email</label>
                                    <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" name='email' />
                                    {errorEmail && <p className=' text-red-600'>Please enter a valid Email</p>}
                                  </div>
                                  <div className="flex flex-col justify-center z-0 item-start w-full">
                                    <label className=' font-bold mb-1 text-start' htmlFor="password">Password</label>
                                    <div className='flex'>
                                      <Input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "password" : "text"} placeholder="Create a strong password" name='password' />
                                      {showPassword ? (
                                        <Eye onClick={() => setShowPassword(false)} className='z-10 absolute right-[10%]  self-center' />
                                      ) : (
                                        <EyeOff onClick={() => setShowPassword(true)} className='z-10 absolute right-[10%]  self-center' />
                                      )}
                                    </div>
                                    {errorPassword && <p className=' text-red-600'>Please enter a strong password</p>}
                                  </div>

                                  <Link href={"/user/forgotpassword"} className=' text-blue-600 underline'> Forgot Password ? </Link>
                                  <p>You agree to create account for <span className=' text-blue-600'>job</span> <span className=' text-red-600'>मिल्यो?</span> </p>
                                  <Button onClick={handlelogIn} className=' bg-blue-600'> {loginLoader && <Loader className=' animate-spin' />}Continue </Button>
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )
                  }
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
