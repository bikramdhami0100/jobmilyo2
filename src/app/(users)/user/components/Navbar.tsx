"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { BookMarked, BookMarkedIcon, Bookmark, BriefcaseBusiness, BriefcaseBusinessIcon, Group, Home, LogOut, MessageCircle, MessagesSquare, Moon, PersonStanding, Send, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { useSelector } from 'react-redux'
import { PersonIcon } from '@radix-ui/react-icons'
import { IconNotebook, IconNotes } from '@tabler/icons-react'
import { MyPopUpContext } from '../context/PopUpClose'
import axios from 'axios'

function Navbar() {
    const router = useRouter();
    const path = usePathname()
    const { OpenPopUp, setOpenPopUp,seekerId,validUser, setValidUser }: any = useContext(MyPopUpContext);
    console.log(seekerId,"This is seekers")
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
   
    useEffect(() => {
        setMounted(true);
    }, []);
    //  console.log(theme)
    const navbarBgColor = theme === 'light' ? 'bg-gradient-to-r from-[rgb(245,238,181)] to-[rgb(183,184,177),rgb(220,224,227)]' : 'bg-[rgb(17,24,39)]'; // Set background color based on theme

    const NavMenu2 = [
        {
            name: "HOME",
            path: "/user",
            // icon: Home
        },
        {
            name: "ABOUT",
            path: "/user/about",
            // icon: Group
        },
        {
            name: "JOBS",
            path: "/user/Jobs",
            // icon: PersonStanding
        },
        {
            name: "CONTACT US",
            path: "/user/contact",
            // icon: MessageCircle
        },


    ]

    const checkuserVerify = async () => {
        const data = await (await axios.get("/api/user/user_type",{params:{id:seekerId}})).data
        setValidUser(data?.validuser)
    }
    useEffect(() => {
    
       seekerId&& checkuserVerify();
    }, [seekerId]);


    const HandleLogOut = async () => {
        // console.log("log out c")
        if(typeof window!==undefined){
            localStorage.removeItem("userId");
            setValidUser("")
            router.push("/user");
        }
    }
    const pathHandler = (path: any) => {
        router.push(path)
    }

    // employer  login from google 
    const googleLogin = useGoogleLogin({
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

    // Seeker Login from google
    const seekerGoogleLogin= useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );


            const data = (await axios.post("/api/google", userInfo.data)).data;
            console.log(data, "This is data")
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
 
    // If the theme is not mounted yet, do not render the navbar
    if (!mounted) return null;

    return (
        <div className={`flex w-full h-[80px]  justify-between m-auto shadow-md items-center p-3 ${navbarBgColor} `}>

            <div className=' flex gap-1 justify-center items-center'>
                <div className=' visible md:hidden lg:hidden'>

                    <Sheet>

                        <SheetTrigger>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></SheetTrigger>
                        <SheetContent side={"left"} className={`${navbarBgColor}  `}>
                            <Image alt='logo' src={"/images/logo.png"} height={100} width={200}></Image>
                            <SheetHeader>
                                <SheetTitle >Menu</SheetTitle>
                                <SheetDescription>
                                    <div>
                                        {
                                            NavMenu2.map((item, index) => {
                                                return (<div className=' flex font-bold  m-2 text-2xl flex-row' key={index}>
                                                    <SheetClose> <h1 className={` cursor-pointer hover:text-blue-600 hover:underline hover:transition-shadow ${path == item.path ? "text-blue-600 underline underline-offset-2" : ""}`} onClick={() => {
                                                        pathHandler(item.path);

                                                    }}>{item.name == "Post a job" ? (<p className=' bg-[#b0dac1] rounded-full p-2 underline'>{item.name}</p>) : item.name}</h1></SheetClose>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
                <Image className=' cursor-pointer' onClick={() => {
                    router.push("/user")
                }} alt='logo' src={"/images/logo.png"} height={100} width={100} /></div>

            <div className={` flex hidden  md:flex font-bold  text-xl lg:flex  gap-10 `}>

                {
                    NavMenu2.map((item: any, index: any) => {
                        return (<div className=' flex flex-row justify-center items-center  gap-10' key={index}>
                            <span className={` cursor-pointer hover:text-blue-600 hover:underline  ${path == item.path ? "text-blue-600 underline underline-offset-2" : ""}`} onClick={() => {
                                router.push(item.path)
                            }}>{item.name == "Post a job" ? (<span className={` ${theme == "light" ? "bg-[#b0dac1]" : ""}  flex  items-center justify-center text-center rounded-full p-2 underline`}>{item.name}</span>) : item.name}</span>
                        </div>)
                    })
                }</div>
            <div className=' flex  gap-[6px]'>
                {
                     validUser?
                        <div>
                            <DropdownMenu >
                                <DropdownMenuTrigger className=' outline-none' ><div>
                                    {
                                        validUser?.color.startsWith("#") ? (
                                            <div className='w-[40px] flex justify-center items-center -mb-4 relative group'>
                                                <div style={{ backgroundColor: validUser?.color }} className='flex justify-center items-center w-[40px] h-[40px] rounded-full'>
                                                    <div className='text-center'>{validUser.fullName.charAt(0).toUpperCase()}</div>
                                                </div>

                                            </div>
                                        ) : (
                                            <div className='relative group w-[40px] h-[35px] rounded-full  border '>
                                                <Image src={validUser?.color} alt={"profile image"} width={100} height={100} className=' object-fill h-[40px] w-[40px] rounded-[20px] ' />
                                            </div>
                                        )
                                    }
                                </div></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className=' flex  gap-1 text-sm' onClick={() => {
                                        router.push("/user/profile")
                                    }}><PersonIcon className=' size-[20px] cursor-pointer' />Profile</DropdownMenuItem>
                                    <DropdownMenuItem className=' flex  gap-1 text-sm' onClick={() => {
                                        router.push("/user/apply")
                                    }}><BriefcaseBusinessIcon className=' size-[20px] cursor-pointer' />apply list
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className=' text-sm flex gap-1 cursor-pointer'
                                        onClick={() => {
                                            router.push("/user/setting")
                                        }}
                                    ><Settings size={20} /> Setting</DropdownMenuItem>
                                    {/* <DropdownMenuItem className=' cursor-pointer flex gap-1' onClick={() => {
                                        router.push(`/user/post/`)
                                    }} ><IconNotebook />Post Job
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className=' cursor-pointer flex gap-1' onClick={() => {
                                        router.push(`/user/userpostjobs/`)
                                    }} ><IconNotes /> post list
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem className=' cursor-pointer flex gap-1' onClick={() => {
                                        HandleLogOut();
                                    }} ><LogOut size={20} />log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div> : <div className=' flex  gap-1'>
                            <Button onClick={() => {
                                // setOpenPopUp(!OpenPopUp)
                                seekerGoogleLogin();
                            }} className=' bg-blue-600'>Job Seeker</Button>
                            <Button onClick={() => {

                                googleLogin()
                            }} className=' bg-blue-600'>Employer</Button>

                            {/* <AlertDialog open={OpenPopUp} >
                                <AlertDialogContent className=' bg-gray-400'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>

                                            <div className=' flex  gap-1  w-full'>
                                                <Button onClick={() => {
                                                    seekerGoogleLogin();
                                                }} className=' '>
                                                    <Image src="/images/social/google.png" height={30} width={30} alt={"images"} className=' m-1 p-1 cursor-pointer '></Image>

                                                </Button>
                                                <Button className='bg-blue-600' onClick={() => {
                                                    router.push("/user/login")
                                                }}>Log in</Button>
                                                <Button className=' bg-blue-600' onClick={() => {
                                                    router.push("/user/signup")
                                                }}>Sign Up</Button>

                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => {
                                            setOpenPopUp(!OpenPopUp)
                                        }}>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog> */}

                        </div>
                }
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 outline-none" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] outline-none rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=' outline-none'>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar
