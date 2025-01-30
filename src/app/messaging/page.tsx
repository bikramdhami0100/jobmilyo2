"use client";
import { Circle, Phone, Video } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import MainSearch from './_components/MainSearch';
import ChatMessage from './_components/ChatMessage';
import { socket } from "@/lib/SocketClient";
import ChatForm from './_components/ChatFrom';
import { MyExistUser } from '@/context/ExistUser';

function MessageDashboard() {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [room, setRoom] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [searchItem, setSearchItem] = useState<any>("");
  const [itemsById, setItemsById] = useState<any>(null);
  const { userData } = useContext(MyExistUser);

  const results = [
    {
      name: "Bikki Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: true,
      time: "4m Ago",
      id: "676513d79d209b4d2fc600db"
    },
    {
      name: "Sunita Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: false,
      time: "4m Ago",
      id: "676513d79d209b4d2fc600dc"
    }
  ];

  const handlerSubmitId = (id: string) => {
    if (id) {
      const onlineUserData = results.filter((item) => id === item.id);
      setItemsById(onlineUserData);
    } else {
      alert("Select User");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const employerId = localStorage.getItem("employerId");
      if (employerId) {
        setJoined(true);
        setRoom(employerId);
      }
    }

    // Listen for incoming messages
    socket.on("join-room", (data) => {
      console.log(data, "join-room data");
    });

    socket.on("message", (data: { sender: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for user joined events
    socket.on("user_joined", (message: string) => {
      console.log(message);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (message.trim() && room && userName) {
      const data = { room, message, sender: userName };
      setMessages((prev) => [...prev, { sender: userName, message }]);
      socket.emit("message", data);
    }
  };

  useEffect(() => {
    if (itemsById && typeof window !== "undefined") {
      const roomId = localStorage.getItem("employerId");
      const receiverName = itemsById[0]?.name;

      if (roomId && receiverName) {
        console.log("Emitting join-seeker event with:", { room: roomId, receiver: receiverName });
        socket.emit("join-seeker", { room: roomId, receiver: receiverName });
      }
    }

    // Cleanup listeners on component unmount
    return () => {
      socket.off("join-seeker");
    };
  }, [itemsById]);

  return (
    <div>
      <div className='flex-col py-2'>
        {/* Search Section */}
        <div className='flex py-2'>
          <div className='min-h-screen border-r-2 p-2'>
            <MainSearch handlerSubmitId={handlerSubmitId} setSearchItem={setSearchItem} searchItem={searchItem} results={results} />
          </div>
          {/* Chat Header Section */}
          {itemsById && itemsById.length > 0 ? (
            <div className='w-full'>
              <div className='flex justify-between border-b-2 p-2'>
                <div>
                  <div className='flex gap-2 mx-1'>
                    <div>
                      <Image src={itemsById[0]?.image} alt='image' width={40} height={40} />
                    </div>
                    <div className=''>
                      <div>{itemsById[0]?.name}</div>
                      <div className='flex gap-1 justify-center items-center'>
                        {itemsById[0]?.online ? (
                          <>
                            <Circle color='green' fill='green' size={8} /> Online
                          </>
                        ) : (
                          <>Offline</>
                        )}
                      </div>
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
                <div className='h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg'>
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      sender={msg.sender}
                      message={msg.message}
                      isOwnMessage={msg.sender === userName}
                    />
                  ))}
                </div>
                <ChatForm onSendMessage={handleSendMessage} />
              </div>
            </div>
          ) : (
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