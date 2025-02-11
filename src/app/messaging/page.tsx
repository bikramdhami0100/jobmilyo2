"use client";
import { Circle, Phone, Video } from 'lucide-react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import MainSearch from './_components/MainSearch';
import ChatMessage from './_components/ChatMessage';
import { socket } from "@/lib/SocketClient";
import ChatForm from './_components/ChatFrom';
import { MyExistUser } from '@/context/ExistUser';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

function MessageDashboard() {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [roomId, setRoomId] = useState<any>("");
  const [receiverData, setReceiverData] = useState<any>("");
  const [selectItem, setSelectItem] = useState<any>("");
  const [userName, setUserName] = useState<any>("");
  const [searchItem, setSearchItem] = useState<any>("");

  const param = useSearchParams();
  const receiverId = param.get("id");
  console.log(receiverId);

  const handlerSender = async (id: any) => {
    const sender = (await axios.get("/api/user/user_type", { params: { id } })).data;
    setUserName(sender?.validuser);
    console.log(sender);
    setReceiverData(sender?.receivers);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const senderId = localStorage.getItem("employerId") || localStorage.getItem("userId");
      console.log(senderId, "sender");
      senderId && handlerSender(senderId);
    }
  }, []);

  const handleSendMessage = (message: any) => {
    console.log("message", message);
  };

  // Generate roomId when selectItem changes
  useEffect(() => {
    if (selectItem) {
      const uuid = uuidv4();
      setRoomId(uuid);
    }
  }, [selectItem]);

  // Join room when roomId is set
  useEffect(() => {
    if (roomId && selectItem) {
      console.log("User is joining room:", roomId);
      socket.emit("join_user", { room: roomId, username: userName?.fullName || "Anonymous" });
    }

    socket.on("join_success",(value)=>{
      console.log(value,"value is")
    })
    // Cleanup listeners on component unmount
    return () => {
      socket.off("join_user");
    };
  }, [roomId, selectItem]);

  return (
    <div>
      <div className='flex-col py-2'>
        {/* Search Section */}
        <div className='flex py-2'>
          <div className='min-h-[800px] h-full border-r-2 p-2'>
            <MainSearch setSearchItem={setSearchItem} setSelectItem={setSelectItem} searchItem={searchItem} results={receiverData} />
          </div>
          {/* Chat Header Section */}
          {selectItem && (
            <div className='w-full'>
              {/* Top main container */}
              <div className='flex justify-between border-b-2 p-2'>
                <div>
                  <div className='flex justify-start items-center gap-2 mx-1'>
                    <div>
                      <Image className='w-[40px] h-[40px] rounded-[20px]' src={selectItem?.color} alt='image' width={40} height={40} />
                    </div>
                    <div className=''>
                      <div>{selectItem?.fullName}</div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <Video className='cursor-pointer' />
                  <Phone className='cursor-pointer' />
                  <div className='flex gap-[1px]'>
                    <Circle fill='gray' size={12} />
                    <Circle fill='gray' size={12} />
                    <Circle fill='gray' size={12} />
                  </div>
                </div>
              </div>
              {/* Chat Section */}
              <div className='w-full max-w-3xl mx-auto'>
                <div className='h-screen overflow-y-auto p-4 mb-4'>
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      sender={msg.sender}
                      message={msg.message}
                      isOwnMessage={msg.sender === userName?.fullName}
                    />
                  ))}
                </div>
                <ChatForm onSendMessage={handleSendMessage} />
              </div>
            </div>
          )}
          {!selectItem && (
            <div className='w-full h-full flex justify-center items-center p-4 text-center'>
              <div>
                <h1 className='text-2xl font-bold mb-4'>Welcome to Jobmilyo</h1>
                <p className='text-gray-700 mb-6'>
                  Find your dream job by chatting and video calling directly with employers.
                </p>
                <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'>
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageDashboard;