"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface ArchivedData {
  archive: boolean;
  fullName: string;
  _id: string;
  color: string; // Assuming this is a profile image URL or a color code
  email: string;
  userType: string;
  userVerify: boolean;
}

function ArchiveChat() {
  const [userData, setUserData] = useState<ArchivedData[]>([]);

  const handlerFetchArchivedChat = async (userId: string) => {
    try {
      const send = (await axios.get("/api/messaging/archived", { params: { id: userId } })).data;
      setUserData(send?.data || []);
      console.log(send, "archive chat");
    } catch (error) {
      console.error("Error fetching archived chats", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId") || localStorage.getItem("employerId");
      userId && handlerFetchArchivedChat(userId);
      console.log(userId, "this is user id");
    }
  }, []);

  return (
    <div className="">
      
      <ScrollArea className="h-[70vh]">
        <div className="flex flex-col  ">
          {userData.length > 0 ? (
            userData.map((item, index) => (
              <div
                key={index}
                className="flex border m-2 items-center gap-4 p-3 rounded-lg cursor-pointer transition-all"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {item.color.startsWith("http") ? (
                    <Image
                      src={item.color}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-base">{item.fullName}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No archived chats.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ArchiveChat;
