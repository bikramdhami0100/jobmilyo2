
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BookMarked, BookMarkedIcon, Bookmark, Contact2Icon, FacebookIcon, GithubIcon, ImageIcon, LayoutDashboard, LayoutList, Loader, LogOut, LogOutIcon, LucideWrench, MessagesSquare, Moon, ScanSearch, Search, Settings, SettingsIcon, SquarePlus, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from 'next/navigation'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

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

import { toast } from '@/components/ui/use-toast'


function AdminNavbar() {
    const pathname=usePathname()
    const [mounted, setMounted] = useState(false);
    const [loadinglogout,setLoadingLogout]=useState<any>(false)
    useEffect(() => {
        setMounted(true);
    }, []);
    const AdminMenu = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "New Job",
            path: "/admin/newjob",
            icon: SquarePlus
        },
        {
            name: "Job List",
            path: "/admin/joblist",
            icon: LayoutList
        },
        {
            name: "View Resume",
            path: "/admin/viewresume",
            icon: Search
        }
        ,
        {
            name: "Contact List",
            path: "/admin/contactlist",
            icon: Contact2Icon
        }
    ]


    const router = useRouter();

    const { setTheme, theme } = useTheme();

    // const navbarBgColor = theme === 'light' ? "bg-[#1983d1] text-black  " : 'bg-[rgb(17,24,39)]';
    const navbarBgColor = theme === 'light' ? 'bg-gradient-to-r from-[rgb(245,238,181)] to-[rgb(183,184,177),rgb(220,224,227)]' : 'bg-[rgb(17,24,39)]'; // Set background color based on theme
    const navbarBgColor2 = theme === 'light' ? 'bg-[#1983d1]' : 'bg-[rgb(17,24,39)]';
    // If the theme is not mounted yet, do not render the navbar

    if (!mounted) return null;
    const HandleLogOut = async () => {
        setLoadingLogout(true)
        if(typeof window !==undefined){
            const id =await localStorage.removeItem("adminId")
             router.push("/user/login")
        }
    }

    return (
        <div className={` flex justify-between m-auto  shadow-md p-3 ${navbarBgColor} w-full`}>
            <div className=' flex gap-4 justify-center items-center'>
                <div className=' visible md:hidden lg:hidden'>
                    <Sheet>
                        <SheetTrigger>  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></SheetTrigger>
                        <SheetContent side={"left"} className={`${navbarBgColor2}  `} >
                            <Image alt='logo' src={"/images/logo.png"} height={100} width={200}></Image>
                            <SheetHeader className=' w-full'>
                                <SheetTitle className=' underline underline-offset-4  decoration-[3px] text-[26px] mb-10' >Admin Pannel</SheetTitle>
                                <SheetDescription className=' w-full'>
                                    <div className=' flex flex-col justify-between gap items-start gap-[200px] '>
                                        <div className=' flex flex-col w-full '>
                                            <SheetClose>
                                                {
                                                    AdminMenu.map((item, index) => {
                                                        return (
                                                            <div key={index} className={`hover:bg-[#ed4b4b] m-1 ${pathname==item.path?"bg-[#ed4b4b]":""} ${theme == "light" ? "text-black" : ""}  rounded-md cursor-pointer  w-full p-2 flex gap-4 font-extrabold text-[20px]`} onClick={() => {
                                                                router.push(item.path)
                                                            }}>
                                                                <item.icon />
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div>
                                                    <Button className='  w-[80%] m-auto absolute bottom-10 text-center cursor-pointer bg-blue-700 flex gap-1' onClick={() => {
                                                        HandleLogOut();
                                                    }} >{loadinglogout&&<Loader className=' animate-spin'/>}<LogOut size={20} />log out</Button>
                                                </div>

                                            </SheetClose>
                                        </div>

                                    </div>
                                </SheetDescription>

                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
                <Image className=' cursor-pointer' onClick={() => {
                    router.push("/")
                }} alt='logo' src={"/images/logo.png"} height={100} width={100} /></div>

            <div className=' flex  gap-[6px]'>

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

export default AdminNavbar


