"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
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
import { MyPopUpContext } from '../context/PopUpClose'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function Login() {
  const { setOpenPopUp }: any = useContext(MyPopUpContext)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [loginLoader, setLoginLoader] = useState<any>()
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const passwordRegex = /^[a-zA-Z\s]/;
  const router = useRouter();

  //  const session=useSession();
  const dispatch = useDispatch();
  const [userGoogleData, setUserGoogleData] = useState<any>("");
  useEffect(() => {
    setOpenPopUp(false);
    if (email || password) {

      // setErrorBirth(!(dobRegex.test(birth) && birth.length > 4));
      setErrorEmail(!(emailRegex.test(email) && email.length > 4));
      setErrorPassword(!(passwordRegex.test(password) && password.length > 4));

    }
  }, [email, password]);
  const handlelogIn = async () => {
    setLoginLoader(true)
    // console.log(email,password)
    if (email && password) {


      toast({
        description: "🦄 data  submit successfully !"

      });
      const data = await fetch("/api/login/", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ loginemail: email, loginpassword: password })
      })
      // console.log("this is data ",data);

      if (data.ok) {
        const result = await data.json()
        setLoginLoader(false)
        if (result.status == 200) {
          toast({
            description: result.message,
            className: 'bg-white text-black rounded-md border-[2px] border-green-600 font-bold'

          });
          if (result.message == "User verified successfully") {
            dispatch(validUserToken(result));
            if (result.user.admin == true) {
              router.push("/admin/dashboard")
            } else[
              router.push("/user/")
            ]
          }

        } else {
          toast({
            className: 'bg-white text-black rounded-md border-[2px] border-green-600 font-bold',
            description: result.message,
          });
        }
      } else {
        toast({
          description: data.statusText,
          className: 'bg-white text-black rounded-md border-[2px] border-green-600 font-bold'
        });
      }
    }
  }
  const socialItem = [
    {
      name: "github",
      image: "/images/social/github.png",
      // link:"https://www.twitter.com"
    },
    {
      name: "apple",
      image: "/images/social/apple.png",
      // link:"https://www.facebook.com"
    },

    {
      name: "google",
      image: "/images/social/google.png",
      // link:"https://www.linkedin.com"
    }
  ]
  // employer  login from google 
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
      );
      setUserGoogleData(userInfo?.data);
      console.log(userInfo?.data)
      const data = await fetch("/api/login/", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ loginemail: userInfo?.data?.email, loginpassword: "loginfromGoogle", email_verified: true, name: userInfo?.data?.name, picture: userInfo?.data?.picture })
      })
      const ndata=await data.json();
      console.log(ndata)
      if(ndata?.status==202){
        router.push("/user/userinformation");
      }
  console.log(data);

      // console.log(userInfo?.data,"user Info");

    },
    onError: errorResponse => console.log(errorResponse),
  });

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
        < h1 className=' font-bold text-xl  '>Login</h1>
        <div className='flex flex-col gap-4'>
          <div className="flex flex-col justify-center item-start w-full">
            <label className=' font-bold mb-1' htmlFor="email">Email</label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" name='email' />
            {errorEmail && <p className=' text-red-600'>Please enter a valid Email</p>}
          </div>
          <div className="flex flex-col justify-center z-0 item-start w-full">
            <label className=' font-bold mb-1' htmlFor="password">Password</label>
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
          <p className=' text-center'>Don't have an account ? <Link href={"./signup"} className=' underline text-blue-600'> Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
