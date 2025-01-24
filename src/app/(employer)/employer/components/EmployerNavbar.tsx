
// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useContext, useEffect, useState } from 'react'
// import { BookMarked, BookMarkedIcon, Bookmark, Contact2Icon, FacebookIcon, GithubIcon, ImageIcon, LayoutDashboard, LayoutList, Loader, LogOut, LogOutIcon, LucideWrench, MessagesSquare, Moon, ScanSearch, Search, Settings, SettingsIcon, SquarePlus, Sun } from "lucide-react"
// import { useTheme } from "next-themes"
// import { usePathname, useRouter } from 'next/navigation'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,

// } from "@/components/ui/dropdown-menu"
// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
//     SheetClose
// } from "@/components/ui/sheet"

// import { toast } from '@/components/ui/use-toast'
// import { PersonIcon } from '@radix-ui/react-icons'
// import axios from 'axios'

// function EmployerNavbar() {
//     const router = useRouter();
//     const { setTheme, theme } = useTheme();
//     const pathname = usePathname()
//     const [mounted, setMounted] = useState(false);
//     const [loadinglogout, setLoadingLogout] = useState<any>(false)
//     const [employerData,setEmployerData]=useState<any>();

//     const handlerGetEmployerDetails = async (id: any) => {
//         const data = (await axios.get("/api/employer", {
//             params: {
//                 id: id,
//             }
//         })).data;

//         console.log(data?.results)
// setEmployerData(data?.results)

//     }

//     useEffect(() => {
//         if (typeof window !== undefined) {
//             const id = localStorage.getItem("employerId");
//             handlerGetEmployerDetails(id)
//         }
//     }, []);
//     const EmployerSideBar = [
//         {
//             name: "DASHBOARD",
//             path: "/employer",
//             // icon: LayoutDashboard
//         },
//         {
//             name: "POST JOB",
//             path: "/employer/postjob",
//             // icon:BriefcaseBusiness
//         },
//         {
//             name: "POST INTERNSHIP",
//             path: "/employer/internship",
//             // icon:User
//         },
//         {
//             name: "APPLICATION",
//             path: "/employer/application",
//             // icon: AppWindow
//         }
//         ,

//     ]


//     console.log(employerData, "Employer Data Employer data")

//     // const navbarBgColor = theme === 'light' ? "bg-[#1983d1] text-black  " : 'bg-[rgb(17,24,39)]
//     const navbarBgColor2 = theme === 'light' ? 'bg-[#1983d1]' : 'bg-[rgb(17,24,39)]';
//     // If the theme is not mounted yet, do not render the navbar

//     if (!mounted) return null;
//     const HandleLogOut = async () => {
//         setLoadingLogout(true)
//         // console.log("log out c")
//         const data = await fetch(`/api/adminlogout`, {
//             method: "get",

//         })

//         if (data.ok) {
//             const result = await data.json()
//             if (result) {
//                 setLoadingLogout(false)
//                 toast({
//                     description: result?.message,
//                 })

//                 router.push("/user/login/")

//             }

//         }
//     }





//     return (
//         <div className={` flex top-0 right-0 justify-between m-auto dark:bg-[rgb(17,24,39)]  shadow-md  backdrop-blur-md p-3  w-full bg-red-700  `}>
//             <div className=' flex gap-4 justify-center items-center'>
//                 <div className=' visible md:hidden lg:hidden'>
//                     <Sheet>
//                         <SheetTrigger>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg></SheetTrigger>
//                         <SheetContent side={"left"} className={`${navbarBgColor2}  `} >
//                             <Image alt='logo' src={"/images/logo.png"} height={100} width={200}></Image>
//                             <SheetHeader className=' w-full'>
//                                 <SheetTitle className=' underline underline-offset-4  decoration-[3px] text-[26px] mb-10' >Employer Pannel</SheetTitle>
//                                 <SheetDescription className=' w-full'>
//                                     <div className=' flex flex-col justify-between gap items-start gap-[200px] '>
//                                         <div className=' flex flex-col w-full '>
//                                             <SheetClose>
//                                                 {
//                                                     EmployerSideBar.map((item, index) => {
//                                                         return (
//                                                             <div key={index} className={`hover:bg-[#ed4b4b] m-1 ${pathname == item.path ? "bg-[#ed4b4b]" : ""} ${theme == "light" ? "text-black" : ""}  rounded-md cursor-pointer  w-full p-2 flex gap-4 font-extrabold text-[20px]`} onClick={() => {
//                                                                 router.push(item.path)
//                                                             }}>
//                                                                 {item.name}
//                                                             </div>
//                                                         )
//                                                     })
//                                                 }
//                                                 <div>
//                                                     <Button className='  w-[80%] m-auto absolute bottom-10 text-center cursor-pointer bg-blue-700 flex gap-1' onClick={() => {
//                                                         HandleLogOut();
//                                                     }} >{loadinglogout && <Loader className=' animate-spin' />}<LogOut size={20} />log out</Button>
//                                                 </div>

//                                             </SheetClose>
//                                         </div>

//                                     </div>
//                                 </SheetDescription>

//                             </SheetHeader>
//                         </SheetContent>
//                     </Sheet>

//                 </div>
//                 <Image className=' cursor-pointer' onClick={() => {
//                     router.push("/")
//                 }} alt='logo' src={"/images/logo.png"} height={100} width={100} />
//             </div>

//             <div className=' flex  gap-[6px]'>
//                 <div>
//                     <div>
//                         <DropdownMenu >
//                             <DropdownMenuTrigger className=' outline-none' >
//                                 <div>
//                                     {employerData && (
//                                         <div className='relative group w-[40px] h-[35px] rounded-full  border '>
//                                             <Image src={employerData?.color} alt={"profile image"} width={100} height={100} className=' object-fill h-[40px] w-[40px] rounded-[20px] ' />


//                                         </div>
//                                     )
//                                     }
//                                 </div>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem className=' flex  gap-1 text-sm' onClick={() => {
//                                     router.push("/user/profile")
//                                 }}><PersonIcon className=' size-[20px] cursor-pointer' />Profile
//                                 </DropdownMenuItem>

//                                 <DropdownMenuItem
//                                     className=' text-sm flex gap-1 cursor-pointer'
//                                     onClick={() => {
//                                         router.push("/user/setting")
//                                     }}
//                                 ><Settings size={20} /> Setting
//                                 </DropdownMenuItem>

//                                 <DropdownMenuItem className=' cursor-pointer flex gap-1' onClick={() => {
//                                     HandleLogOut();
//                                 }} ><LogOut size={20} />log out</DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>

//                     </div>
//                 </div>
//                 <DropdownMenu >
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" size="icon">
//                             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 outline-none" />
//                             <Moon className="absolute h-[1.2rem] w-[1.2rem] outline-none rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                             <span className="sr-only">Toggle theme</span>
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className=' outline-none'>
//                         <DropdownMenuItem onClick={() => setTheme("light")}>
//                             Light
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => setTheme("dark")}>
//                             Dark
//                         </DropdownMenuItem>
//                         {/* <DropdownMenuItem onClick={() => setTheme("system")}>
//                             System
//                         </DropdownMenuItem> */}
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </div>
//     )
// }

// export default EmployerNavbar
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { LogOut, MessageCircle, MessagesSquare, Moon, PersonStanding, Send, Settings, Sun } from "lucide-react"
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
import { PersonIcon } from '@radix-ui/react-icons'
import CheckUserType from '@/app/components/CheckUserType'

import axios from 'axios'
import { MyEmployerLogInContext } from '@/app/(employer)/context/EmployerLogInContext'

function EmployerNavbar() {
    const router = useRouter();
    const path = usePathname()
    const [resultData, setResultData] = useState<any>();
    const [token, settoken] = useState<any>();
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const {employerData,setEmployerData}=useContext<any>(MyEmployerLogInContext);

    console.log(CheckUserType)
    useEffect(() => {
        setMounted(true);
    }, []);

    const HandleLogOut = async () => {
        // console.log("log out c")
        const data = await fetch(`/api/login/logout?token=${token}`, {
            method: "get",

        })

        if (data.ok) {
            const result = await data.json()
            if (result) {
                router.push("/user/login/")

            }

        }
    }


    const handlerGetEmployerDetails = async (id: any) => {
        const data = (await axios.get("/api/employer", {
            params: {
                id: id,
            }
        })).data;
         setEmployerData(data);
        setResultData(data?.results)

    }

    useEffect(() => {
        if (typeof window !== undefined) {
            const id = localStorage.getItem("employerId");
            handlerGetEmployerDetails(id)
        }
    }, []);
    // If the theme is not mounted yet, do not render the navbar
    if (!mounted) return null;

    return (
        <div className={`flex w-full   justify-between m-auto shadow-md items-center p-3  `}>

            <div className=' flex gap-1 justify-center items-center'>
                <div className=' visible md:hidden lg:hidden'>


                </div>
                <Image className=' cursor-pointer' onClick={() => {
                    router.push("/user")
                }} alt='logo' src={"/images/logo.png"} height={100} width={100} /></div>


            <div className=' flex  gap-[6px]'>
                <div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className=' outline-none' ><div>

                            <div className='relative group w-[40px] h-[35px] rounded-full  border '>
                                <Image src={resultData?.color} alt={"profile image"} width={100} height={100} className=' object-fill h-[40px] w-[40px] rounded-[20px] ' />


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
                                HandleLogOut();
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



