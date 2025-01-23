

"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userSignUpInfo } from '../../../../Redux/Slice';
import { Eye, EyeOff } from 'lucide-react';
const bcrypt = require("bcryptjs");
export interface MysignupType {
    fullname: string,
    dob: string,
    email: string | undefined,
    password: string,
    confirmpassword: string
}

function ResetPassword({id}:any) {
    const dispatch = useDispatch();
    const router = useRouter();

    const passwordRegex = /^[a-zA-Z\s]/;

    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    const [errorPassword, setErrorPassword] = useState(true);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        if (password || confirm) {
            setErrorPassword(!(passwordRegex.test(password) && password.length > 4));
            setErrorConfirmPassword(!(password === confirm && confirm.length > 4));
        }
    }, [password, confirm]);

    const handleResetPassword = async () => {

        if (password && confirm && !errorPassword && !errorConfirmPassword) {
        
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
            const userData: any = { password,id };

            try {
                const response = await fetch('/api/login/resetpassword/', {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                if (response) {
                    const result = await response.json()
                    if (result.status == 200) {
                        toast.success('🦄 password reset successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "light",
                        });
                        router.push("/user/login");
                    }
                   
                }
            } catch (error) {
                console.error('Signup failed', error);
            }
        }
    };

    return (
        <div className='flex flex-col w-full md:w-[50%] lg:w-[50%] justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>
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
            <div className='flex flex-col w-full gap-4 shadow-md hover:shadow-lg p-6 justify-center items-center m-4 rounded-md border-[2px]'>
                <div className='m-4'>
                    <h1>Reset password</h1>
                    <hr color='gray' className='w-full shadow-md' />
                </div>
                <div className="flex flex-col justify-center z-0 item-start w-full">
                    <label htmlFor="password">New Password</label>
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

                <div className="flex flex-col justify-center item-start w-full">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className='flex'>
                        {showPassword ? (
                            <Eye onClick={() => setShowPassword(false)} className='z-10 absolute right-[10%]   self-center' />
                        ) : (
                            <EyeOff onClick={() => setShowPassword(true)} className='z-10 absolute right-[10%]   self-center' />
                        )}
                        <Input onChange={(e) => setConfirm(e.target.value)} type={showPassword ? "password" : "text"} placeholder="Confirm your password" name='confirmpassword' />
                    </div>
                    {errorConfirmPassword && <p className=' text-red-600'>Please enter Confirm Password</p>}
                </div>

                <Button onClick={handleResetPassword} className='bg-blue-600 w-[200px] rounded-full self-center'>Continue</Button>
            </div>

        </div>

    );
}

export default ResetPassword;

