
"use client";

import { Archive, Calendar, ChartNoAxesGantt, Group, Home, Inbox, KeyRound, LayoutDashboard, LucideHandCoins, MessageCircleQuestion, Search, Settings, SquareChevronDown, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { IconChessKing, IconChessQueen, IconKey, IconMessage, IconMessageCircleQuestion } from "@tabler/icons-react";

function EmployerNavbar() {
  const pathname = usePathname();
  const items = [
    {
      title: "My Jobs",
      url: "/messaging",
      icon: LayoutDashboard,
    },
    {
      title: "Priority",
      url: "/",
      icon:IconChessQueen  ,
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
    <div>
      <div className="flex border-b-2  justify-start items-center">
        {/* Mobile Navbar */}
        <div className="md:hidden lg:hidden sm:block  ">
          <Sheet >
            <SheetTrigger>
              <Menu className="size-10 m-2" />
            </SheetTrigger>
            <SheetContent className="  bg-white dark:bg-[rgb(2,8,23)]" side="left">
              <SheetHeader>
                <SheetTitle>
                  <center className="shadow-sm mb-14">
                    <Image
                      alt="logo"
                      src="/images/logo.png"
                      width={80}
                      height={80}
                      className="rounded-full shadow-sm object-cover object-center"
                    />
                  
                  </center>
                </SheetTitle>
                <SheetDescription>
                  <div>
                    {items.map((item, index) => (
                      <SheetClose asChild key={index}>
                        <Link
                          href={item.url}
                          className={`flex gap-2 items-center rounded-md p-2 border m-2 hover:bg-blue-400 hover:text-white ${
                            pathname === item.url ? "bg-blue-700 text-white" : ""
                          }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                  <div className=" flex  w-auto  mt-[100%] border p-4 rounded-md   justify-end gap-4">
                      <div className=" flex gap-1 p-2 rounded-md   ">
                         <KeyRound/> Invite
                      </div>
                      <div className=" flex gap-1 border p-2 rounded-md ">
                         <MessageCircleQuestion/> Support
                      </div>
                  </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Current Page Title */}
        <h1>
          {pathname &&
            items.map((item, index) => (
              <div
                className="text-justify underline underline-offset-2 decoration-slate-950 decoration-2 text-2xl mt-3 font-bold tracking-wider ml-2"
                key={index}
              >
                {pathname === item.url && item.title}
              </div>
            ))}
        </h1>
      </div>
    </div>
  );
}

export default EmployerNavbar;
