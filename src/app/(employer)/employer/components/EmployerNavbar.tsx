
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { AppWindow, BriefcaseBusiness, LayoutDashboard, ListCheck, LogOut, Menu, MessageCircle, MessagesSquare, Moon, PersonStanding, Send, Settings, Sun, User } from "lucide-react"
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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { PersonIcon } from '@radix-ui/react-icons'
// import CheckUserType from '@/app/components/CheckUserType'

import axios from 'axios'
import { MyEmployerLogInContext } from '@/app/(employer)/context/EmployerLogInContext'
import Link from 'next/link'

function EmployerNavbar() {
    const router = useRouter();
    const pathname = usePathname()
    const { setTheme, theme } = useTheme();
    const { employerData,organizationData } = useContext<any>(MyEmployerLogInContext);
    const [showNavigationName,setShowNavigationName]=useState<any>("DASHBOARD");
     
    const items = [
        {
            name: "DASHBOARD",
            path: "/employer",
            icon: LayoutDashboard
        },
        {
            name: "POST JOB",
            path: "/employer/postjob",
            icon: BriefcaseBusiness
        },
        {
            name: "POST JOB LIST",
            path: "/employer/postjobslist",
            icon: ListCheck
        },
        // {
        //     name: "POST INTERNSHIP",
        //     path: "/employer/internship",
        //     icon: User
        // },
        {
            name: "APPLICATION",
            path: "/employer/application",
            icon: AppWindow
        },
        {
            name: "Message",
            path: "/messaging",
            icon: MessageCircle
        },


    ]
  const filterName=items.filter((item)=>item.path==pathname);
  useEffect(()=>{
     setShowNavigationName(filterName[0])
  },[pathname])
    return (
        <div className={`flex w-full  dark:bg-[rgb(17,24,39)] dark:text-white  justify-between m-auto shadow-md items-center p-3  `}>

            <div className=' flex gap-1 justify-center items-center'>
                <div className=' visible md:hidden lg:hidden'>
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="size-10 m-2" />
                        </SheetTrigger>
                        <SheetContent className=' bg-white dark:bg-[rgb(17,24,39)] dark:text-white text-black' side="left">
                            <SheetHeader>
                                <SheetTitle>

                                    <Image
                                        alt="logo"
                                        src="/images/logo.png"
                                        width={80}
                                        height={80}
                                        className="rounded-full shadow-sm object-cover object-center"
                                    />

                                </SheetTitle>
                                <SheetDescription>
                                    <div>
                                        {items.map((item, index) => (
                                            <SheetClose asChild key={index}>
                                                <Link
                                                    href={item?.path}
                                                    className={`flex gap-2 items-center rounded-md p-2 border m-2 hover:bg-blue-400 hover:text-white ${pathname === item?.path ? "bg-blue-700 text-white" : ""
                                                        }`}
                                                >
                                                    <item.icon />
                                                    <span>{item?.name}</span>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
                <div className=' font-bold underline underline-offset-1 underline-[8px]'>
                {showNavigationName?.name}
                </div>
            </div>
            <div className=' flex  gap-[6px]'>
                <div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className=' outline-none' ><div>

                            <div className='relative group w-[40px] h-[35px] rounded-full  border '>
                              {organizationData&&  <Image src={organizationData?.logo} alt={"profile image"} width={100} height={100} className=' object-fill h-[40px] w-[40px] rounded-[20px] ' />} 
                            </div>

                        </div></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className=' flex  gap-1 text-sm' onClick={() => {
                                router.push("/employer/profile")
                            }}><PersonIcon className=' size-[20px] cursor-pointer' />Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className=' text-sm flex gap-1 cursor-pointer'
                                onClick={() => {
                                    router.push("/employer/setting")
                                }}
                            ><Settings size={20} /> Setting
                            </DropdownMenuItem>

                            <DropdownMenuItem className=' cursor-pointer flex gap-1' onClick={() => {
                                // HandleLogOut();
                            }} ><LogOut size={20} />log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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

export default EmployerNavbar



