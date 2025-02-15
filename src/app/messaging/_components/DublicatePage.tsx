"use client";
import { Circle, Phone, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import MainSearch from '../_components/MainSearch';
import ChatMessage from '../_components/ChatMessage';
import { socket } from "@/lib/SocketClient";
import ChatForm from '../_components/ChatFrom';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

function MessageDashboard() {
  const [messages, setMessages] = useState<{ sender: string; message: string, senderId: string }[]>([]);
  const [senderData, setSenderData] = useState<any>();
  const [roomId, setRoomId] = useState<any>("");
  const [receiverData, setReceiverData] = useState<any>("");
  const [selectReceiverId, setSelectReceiverId] = useState<any>("");
  const [checkRoomId, setCheckRoomId] = useState<any>("");
  const [selectItem, setSelectItem] = useState<any>("");
  const [searchItem, setSearchItem] = useState<any>("");
  const [checkMessage, setCheckMessage] = useState<any>("");
  const [defaultData, setDefaultData] = useState<any>([]);

  const param = useSearchParams();
  const receiverId = param.get("id");

  // Fetch receiver data
  const handlerReceiver = async (id: any) => {
    const receiver = (await axios.get("/api/user/user_type", { params: { id } })).data;
    setReceiverData(receiver?.receivers);
  };

  // Fetch sender data
  const handlerSenderData = async (id: any) => {
    const user = (await axios.get("/api/user/profile", { params: { id } })).data;
    setSenderData(user?.data?.user);
  };

  // Fetch sender and receiver data on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const senderId = localStorage.getItem("employerId") || localStorage.getItem("userId");
      senderId && handlerSenderData(senderId);
      senderId && handlerReceiver(senderId);
    }
  }, []);

  // Handle sending a message
  const handleSendMessage = (message: any) => {
    if (message.trim() === "") return; // Prevent empty messages
    const newMessage = { senderId: senderData?._id, message, sender: senderData?.fullName, room: roomId };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("messages", { message, sender: senderData?.fullName, room: roomId, senderId: senderData?._id });
  };

  // Check if a room ID exists for the users
  const handlerRoomIdCheck = async (id: string, senderId: string) => {
    const send = (await axios.get("/api/messaging/new_message", { params: { id, senderId } })).data;
    setCheckMessage(send?.new_message);
    setCheckRoomId(send?.new_message[0]?.room);
  };

  // Generate or set room ID
  useEffect(() => {
    if (senderData) {
      selectReceiverId && handlerRoomIdCheck(selectReceiverId, senderData?._id);
    }
    if (!checkRoomId && checkMessage?.length === 0) {
      const uuid = uuidv4();
      setRoomId(uuid);
    } else {
      setRoomId(checkRoomId);
    }
  }, [checkRoomId, selectItem]);

  // Socket event listeners
  useEffect(() => {
    if (selectItem && senderData && roomId) {
      // Join the room
      socket.emit("join_user", { room: roomId, username: senderData?.fullName, receiverId: selectItem?._id });

      // Listen for incoming messages
      socket.on("con_message", ({ sender, message, senderId }) => {
        setMessages((prev) => [...prev, { sender, message, senderId }]);
        setDefaultData((prev: any) => [...prev, { sender, message, senderId }]);
      });

      // Cleanup socket listeners on unmount
      return () => {
        socket.off("con_message");
        socket.off("join_user");
      };
    }
  }, [selectItem, roomId]);

  // Load existing messages
  useEffect(() => {
    if (checkMessage) {
      const formattedMessages = checkMessage.map((item: any) => ({
        sender: item?.sender?._id === senderData?._id ? item?.sender?.fullName : item?.receiver?.fullName,
        senderId: item?.sender?._id,
        message: item?.message,
      }));
      setMessages(formattedMessages);
    }
  }, [checkMessage]);

  console.log(messages.length,"length of message")
  return (
    <div>
      <div className='flex-col py-2'>
        {/* Search Section */}
        <div className='flex py-2'>
          <div className='min-h-screen h-full border-r-2 p-2'>
            <MainSearch setSearchItem={setSearchItem} setSelectItem={setSelectItem} setSelectReceiverId={setSelectReceiverId} searchItem={searchItem} results={receiverData} />
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
              <div className='w-full h-full max-w-3xl mx-auto'>
                <div className='overflow-y-auto p-4 mb-4'>
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      sender={msg?.senderId === senderData?._id ? senderData?.fullName : selectItem?.fullName}
                      message={msg.message}
                      isOwnMessage={msg.senderId === senderData?._id}
                    />
                  ))}
                </div>
                <div className='relative'>
                  <div className='w-[60%] fixed bottom-2 right-2'>
                    <ChatForm onSendMessage={handleSendMessage} />
                  </div>
                </div>
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