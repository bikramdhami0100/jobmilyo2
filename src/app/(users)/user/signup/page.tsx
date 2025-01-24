
"use client";
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userSignUpInfo } from '../../../../Redux/Slice';
import { Eye, EyeOff } from 'lucide-react';
import { MyPopUpContext } from '../context/PopUpClose';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export interface MysignupType {
  fullname: string,
  dob: string,
  email: string | undefined,
  password: string,
  confirmpassword: string
}

function Signup() {
  const { OpenPopUp, setOpenPopUp }: any = useContext(MyPopUpContext)
  const dispatch = useDispatch();
  const router = useRouter();

  // const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const passwordRegex = /^[a-zA-Z\s]/;

  const [name, setName] = useState<string>("");
  // const [birth, setBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [errorName, setErrorName] = useState(true);
  // const [errorBirth, setErrorBirth] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    setOpenPopUp(false);
    if (name || email || password || confirm) {
      setErrorName(!(name.length > 4));
      // setErrorBirth(!(dobRegex.test(birth) && birth.length > 4));
      setErrorEmail(!(emailRegex.test(email) && email.length > 4));
      setErrorPassword(!(passwordRegex.test(password) && password.length > 4));
      setErrorConfirmPassword(!(password === confirm && confirm.length > 4));
    }
  }, [name, email, password, confirm]);

  const handleSignup = async () => {

    if (name && email && password && confirm && !errorEmail && !errorPassword && !errorConfirmPassword) {
      toast.info('🦄 data submit successfully !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
      const userData: any = { fullname: name, email: email, password: password, confirmpassword: confirm };

      try {
        const response = await fetch('/api/email', {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          toast.success('🦄 Check your email!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          console.log(response)
          dispatch(userSignUpInfo(userData));
          // Optionally, redirect the user after successful signup
          // router.push("/user/signupverify");
        }
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  };
  // employer  login from google 
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
      );

      console.log(userInfo?.data)
      const data = await fetch("/api/email/", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ loginemail: userInfo?.data?.email, loginpassword: "loginfromGoogle", email_verified: true, name: userInfo?.data?.name, picture: userInfo?.data?.picture })
      })
      const ndata = await data.json();
      console.log(ndata)
      if (ndata?.status == 202) {
        router.push("/user/userinformation");
      }
      console.log(data);

      // console.log(userInfo?.data,"user Info");

    },
    onError: errorResponse => console.log(errorResponse),
  });

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

        <div className='flex  gap-2 flex-col w-full flex-wrap justify-center m-auto items-start '>
          {/* display name */}
          <div className="flex flex-col justify-center item-start w-full">
            <label className=' font-bold ' htmlFor="fname">Display Name</label>
            <Input onChange={(e) => setName(e.target.value)} name='fname' type="text" placeholder="Your display name" />
            {errorName && <p className=' text-red-600'>Please enter a valid name</p>}
          </div>


          {/* email */}
          <div className="flex flex-col justify-center item-start w-full">
            <label className=' font-bold' htmlFor="email">Email</label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" name='email' />
            {errorEmail && <p className=' text-red-600'>Please enter a valid Email</p>}
          </div>
          {/*  password */}
          <div className="flex flex-col justify-center z-0 item-start w-full">
            <label className=' font-bold' htmlFor="password">Password</label>
            <div className='flex'>
              <Input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "password" : "text"} placeholder="Create a strong password" name='password' />
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} className='z-10 absolute right-7 self-center' />
              ) : (
                <EyeOff onClick={() => setShowPassword(true)} className='z-10 absolute right-7 self-center' />
              )}
            </div>
            {errorPassword && <p className=' text-red-600'>Please enter a strong password</p>}
          </div>
          {/* confirm password */}
          <div className="flex flex-col justify-center item-start w-full">
            <label className=' font-bold' htmlFor="confirmpassword">Confirm Password</label>
            <div className='flex'>
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} className='z-10 absolute right-7 self-center' />
              ) : (
                <EyeOff onClick={() => setShowPassword(true)} className='z-10 absolute right-7 self-center' />
              )}
              <Input onChange={(e) => setConfirm(e.target.value)} type={showPassword ? "password" : "text"} placeholder="Confirm your password" name='confirmpassword' />
            </div>
            {errorConfirmPassword && <p className=' text-red-600'>Please enter Confirm Password</p>}

          </div>

          <div className='mt-3 w-full '>
            <p className=' text-center'>    <span>  By selecting Agree and continue</span> <span className='text-blue-600 font-bold'>Job</span> <span className='text-red-600 font-bold'>मिल्यो?</span>, I agree to the <span className='underline cursor-pointer text-blue-600'>Terms of Service</span></p>

          </div>
          <div className=' self-center items-center w-full justify-center flex'>
            <Button onClick={handleSignup} className='bg-blue-600 w-[200px] rounded-full mt-2 '>Continue</Button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Signup;
