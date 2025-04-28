"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

import { Button } from '@/components/ui/button'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import ResetPassword from '../components/ResetPassword'
import axios from 'axios'
function ForgotPassword() {
    const router = useRouter();
    const [show, setshow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const [errorEmail, setErrorEmail] = useState(true);
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    useEffect(() => {
        if (email) {

            // setErrorBirth(!(dobRegex.test(birth) && birth.length > 4));
            setErrorEmail(!(emailRegex.test(email) && email.length > 4));

        }
    }, [email]);
    
    const checkuserVerify = async () => {
        setshow(true);
         if(!email) return;
         try {
            const data=(await axios.post("/api/resetpassword",{email})).data;
            if(data?.success){
                toast({
                    title: "Email sent successfully",
                    description: "Please check your email for the reset link.",
                    variant: "default", // optional, depending on your toast system
                    className: "bg-green-500 text-white border-0 shadow-xl", // style this toast
                  });
                  setshow(false);
            }

         } catch (error) {
             console.log(error)
         }
    }
    return (
        <div className='flex  flex-col justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>
           

            <div className=' grid-cols-2 justify-center items-center'>
                <div className=' flex flex-col justify-center '>

                    <div>
                        <Image alt='login image' src={"/images/forget.svg"} height={400} width={400} className=' h-full'></Image>
                    </div>
                </div>
            </div>
           
              <div className=' flex flex-col shadow-lg p-6 justify-center items-center m-4 rounded-md'>
            <div className=' w-full '>
                <div className=' flex  flex-row justify-between items-center w-full'>
                    <ChevronLeft className=' cursor-pointer' onClick={() => { router.push("./login") }} />
                    <h1 className=' text-center w-full'>Forgot password</h1>
                </div>
                <hr color='' className=' size-1 w-full m-2' />

            </div>
            <div className='flex flex-col gap-4 w-full'>
                <div>
                    <p>Enter the email address associated with your account</p>
                   
                </div>
                <div className="flex flex-col justify-center item-start w-full">
                    <label htmlFor="email">Email</label>
                    <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" name='email' />
                    {errorEmail && <p className=' text-red-600'>Please enter a valid Email</p>}
                </div>

                <Button onClick={()=>{
                  checkuserVerify();
                }}  disabled={show} className=' bg-blue-600 rounded-full  w-[200px] self-center'>Send reset link</Button>

            </div>
        </div>
           
        </div>
    )
}

export default ForgotPassword

