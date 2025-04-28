"use client"
import { SheetClose } from '@/components/ui/sheet'
import { IconChessQueen, IconMessage } from '@tabler/icons-react'
import { Archive, Calendar, ChartNoAxesGantt, Group, Home, Inbox, KeyRound, LayoutDashboard, LucideHandCoins, MessageCircleQuestion, Search, Settings, SquareChevronDown, Timer, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function MessageSideBar() {
    const pathname=usePathname();
    const items = [
        {
          title: "My Jobs",
          url: "/messaging",
          icon: LayoutDashboard,
        },
        {
          title: "Archived",
          url: "/messaging/archived",
          icon: Archive,
        },
        {
          title: "New Message",
          url: "/messaging/new_message",
          icon: IconMessage,
        },
        
      ];
  return (
    <div className=' sm:hidden md:block lg:block w-full  border-r-2'>
          <div>
              <center className=' shadow-sm mb-14 '>
              <Image alt='image' src={"/images/logo.png"} width={80} height={80} className=' rounded-full  shadow-sm object-cover object-center ' />
              {/* <p>Seti Himalayan Tour and Travels</p>
               <span>Pvt. Ltd</span> */}
              </center>
          </div>
          <div>
             {
                items.map((item,index)=>{
                    
                    return(
                      // <SheetClose asChild key={index}>
                      <Link
                       key={index}
                        href={item.url}
                        className={`flex gap-2 items-center rounded-md p-2 border m-2 hover:bg-blue-400 hover:text-white ${
                          pathname === item.url ? "bg-blue-700 text-white" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    // </SheetClose>
                    )
                })
             }
          </div>
        
    </div>
  )
}

export default MessageSideBar