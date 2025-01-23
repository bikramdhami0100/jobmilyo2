"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BookMarked, BookMarkedIcon, Bookmark, LogOut, MessagesSquare, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"

import { signOut, useSession } from 'next-auth/react'

function Navbar() {
    const { setTheme, theme } = useTheme();

    const navbarBgColor = theme === 'light' ? 'bg-gradient-to-r from-[rgb(245,238,181)] to-[rgb(183,184,177),rgb(220,224,227)]' : 'bg-[rgb(17,24,39)]'; // Set background color based on theme
    const NavMenu = ["Home", "About", "Jobs", "Contact", "Documentation"]
    const [token,setToken]=useState();
   
    const session = useSession();

    const router = useRouter();
   useEffect(()=>{
   // Function to get a cookie value by its name
function getCookie(name:any) {
    // Construct the search string for the cookie name
    const nameEQ = name + "=";
    
    // Split the cookie string into individual cookies
    const ca = document.cookie.split(';');
    console.log("token is "+ca);
    // It"erate over the array of cookies
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        
        // Remove leading spaces from the cookie string
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        
        // Check if the cookie string starts with the desired cookie name
        if (c.indexOf(nameEQ) == 0) {
            // Return the cookie value
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    
    // If the cookie is not found, return null
    return null;
}

// Usage example
const tokenValue:any = getCookie('token');
setToken(tokenValue);
console.log('Token Value:', tokenValue);

   
   },[])

    if (session.status == "authenticated") {
        useEffect(() => {
            // Function to set a cookie
            const setCookie = (name: string, value: any, days: number) => {
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
            };

            // Call setCookie function to set your desired cookie
            setCookie('user', session.data.user?.email, 1); // 30 days expiry, adjust as needed
        }, []);


    }
    if (session.status == 'unauthenticated') {
        useEffect(() => {
            // Function to set a cookie
            const showCookie = (name: string, value: any, days: number) => {
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
            };

            // Call setCookie function to set your desired cookie
            showCookie('user', "", 1); // 30 days expiry, adjust as needed
        }, []);
    }

    const ChatWithUs = () => {
        alert("implement in major project !!!")
    }
    return (
        <div className={`flex justify-between m-auto shadow-md p-3 ${navbarBgColor} `}>
           
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
                                            NavMenu.map((item, index) => {
                                                return (<div className=' flex flex-row' key={index}>
                                                    <SheetClose> <h1 className=' cursor-pointer hover:text-blue-600 hover:underline hover:transition-shadow' onClick={() => {
                                                        router.push(`/user/${item}`)
                                                    }}>{item}</h1></SheetClose>
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
                    router.push("/")
                }} alt='logo' src={"/images/logo.png"} height={100} width={100} /></div>

            <div className={` flex hidden  md:flex md:gap-2  lg:flex  lg:gap-3`}>

                {
                    NavMenu.map((item, index) => {
                        return (<div className=' flex flex-row ' key={index}>
                            <h1 onClick={() => {
                                router.push(`/user/${item}`)
                            }} className=' cursor-pointer hover:text-blue-600 hover:underline hover:transition-shadow' >{item}</h1>
                        </div>)
                    })
                }</div>
            <div className=' flex  gap-[6px]'>

                <MessagesSquare className=' self-center  h-[40px] '
                    onClick={() => {
                        ChatWithUs();
                    }} />


                {
                    session.status == "authenticated" || token  ? <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger className=' outline-none' ><div>
                                <Image src={`${session.status=="unauthenticated"?"image/jpg":session.data?.user?.image}`} alt='user' height={30} width={30} className=' w-[35px] w-[35px]  rounded-full '></Image>
                            </div></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    router.push("/profile")
                                }}>Profile</DropdownMenuItem>
                                <DropdownMenuItem> </DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    signOut()
                                }} ><LogOut />log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div> : <div className=' flex  gap-1'>
                        <Button className='bg-blue-600' onClick={() => {
                            router.push("/login")
                        }}>Log in</Button>
                        <Button className=' bg-blue-600' onClick={() => {
                            router.push("/adminlogin")
                        }}>Admin</Button>
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
                        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
      
        </div>
    )
}

export default Navbar
