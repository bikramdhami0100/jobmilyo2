"use client"
import { AppWindow, Archive, BriefcaseBusiness, LayoutDashboard, ListCheck, LucideHandCoins, Menu, MessageCircle, MessageCircleQuestion, Search, Settings, SquareChevronDown, Timer, TimerIcon, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function EDashboardSideBar() {
    const pathname=usePathname();
  
    const items = [
        {
            name: "DASHBOARD",
            path: "/employer",
            icon: LayoutDashboard
        },
        {
            name: "POST JOB",
            path: "/employer/postjob",
            icon:BriefcaseBusiness
        },
        {
          name: "POST JOB LIST",
          path: "/employer/postjobslist",
          icon: ListCheck
      },
        {
            name: "POST INTERNSHIP",
            path: "/employer/internship",
            icon:User
        },
        {
            name: "APPLICATION",
            path: "/employer/application",
            icon: AppWindow
        },
        {
            name: "Message",
            path: "/messaging",
            icon: MessageCircle
        } ,
       
       
    ]
 
  return (
    <div className=' sm:hidden md:block lg:block w-full  border-r-2'>
          <div>
              <div className='  mb-14   mt-[14px] flex gap-2 p-2 '>
               <Menu onClick={()=>{
                  
               }}/>
              <Image alt='image' src={"/images/logo.png"} width={80} height={80} className=' rounded-full  shadow-sm object-cover object-center ' />
              {/* <p>Seti Himalayan Tour and Travels</p>
               <span>Pvt. Ltd</span> */}
              </div>
          </div>
          <div>
             {
                items.map((item,index)=>{
                    
                    return(
                      // <SheetClose asChild key={index}>
                      <Link
                       key={index}
                        href={item?.path}
                        className={`flex gap-2 items-center rounded-md p-2 border m-2 hover:bg-blue-400 hover:text-white ${
                          pathname === item?.path? "bg-blue-700 text-white" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item?.name}</span>
                      </Link>
                    // </SheetClose>
                    )
                })
             }
          </div>
         
    </div>
  )
}

export default EDashboardSideBar