
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BookMarked, BookMarkedIcon, Bookmark, Contact2Icon, FacebookIcon, GithubIcon, ImageIcon, LayoutDashboard, LayoutList, Loader, LogOut, LogOutIcon, LucideWrench, MessagesSquare, Moon, ScanSearch, Search, Settings, SettingsIcon, SquarePlus, Sun, ViewIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'

function AdminSideBar() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loadinglogout,setLoadingLogout]=useState<any>(false)
    const { setTheme, theme } = useTheme();
    const pathname=usePathname()
    useEffect(() => {
        setMounted(true);
    }, []);


    const HandleLogOut = async () => {

        setLoadingLogout(true)
        const data = await fetch(`/api/adminlogout`, {
            method: "get",

        })

        if (data.ok) {
            
            const result = await data.json()
            if (result) {
                setLoadingLogout(false)
                toast({
                    description: result?.message,
                })

                router.push("/user/login/")

            }

        }
    }

    // If the theme is not mounted yet, do not render the navbar
    if (!mounted) return null;

    const AdminSideMenu = [
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


    // const navbarBgColor = theme === 'light' ? 'bg-gradient-to-r from-[rgb(245,238,181)] to-[rgb(183,184,177),rgb(220,224,227)]' : 'bg-[rgb(17,24,39)]';
    const navbarBgColor = theme === 'light' ? 'bg-[#1983d1]' : 'bg-[rgb(17,24,39)]';
    // If the theme is not mounted yet, do not render the navbar
    if (!mounted) return null;
    return (
        <div className={`${navbarBgColor} min-h-screen w-full lg:visible md:visible`}>

            <div className=' flex flex-col justify-between items-start gap-[200px] p-2 '>

                <div className=' flex flex-col w-full '>
                    <div className=' text-center font-extrabold text-3xl mb-[100px]'>
                        <h1 className=' underline underline-offset-2'>Admin Panel</h1>
                    </div>

                    {
                        AdminSideMenu.map((item, index) => {
                            return (
                                <div className={`hover:bg-[#ed4b4b] ${pathname==item.path?"bg-[#ed4b4b]":""}  rounded-md cursor-pointer  w-full p-2 flex gap-4 font-extrabold text-[20px] m-1`} onClick={() => {
                                    router.push(item.path)
                                }} >
                                    <item.icon />
                                    {item.name}
                                </div>
                            )
                        })
                    }
                    <div>
                        <Button className='  w-[80%] m-auto absolute bottom-10 text-center cursor-pointer bg-blue-700 flex gap-1' onClick={() => {
                            HandleLogOut();
                        }} >{loadinglogout&& <Loader  className=' animate-spin'/>}<LogOut size={20} />log out</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminSideBar
