"use client";
import { Circle, Phone, Video } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { socket } from "@/lib/SocketClient";
import axios from 'axios';

function MessageDashboard() {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [room, setRoom] = useState<any>([{id:""}]);
  const [joined, setJoined] = useState<boolean>(false);
  const [userName, setUserName] = useState<any>("");
  const [searchItem, setSearchItem] = useState<any>("");
  const [itemsById, setItemsById] = useState<any>(null);
  const results = [
    {
      name: "Bikki Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: true,
      time: "4m Ago",
      id: room
    },
    {
      name: "Sunita Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: false,
      time: "4m Ago",
      id: room
    }
  ];

  const getJobSeekerDetails = async (userId: any) => {
    const data = await axios.get("/api/user/apply", {
      params: {
        id: userId
      }
    }).then((respon) => {
      console.log(respon?.data?.data,"This is job seeker data")
      setUserName(respon?.data);
      setRoom(respon?.data?.data[0]?.job?.user);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handlerSubmitId = (id: string) => {
    if (id) {
      const onlineUserData = results.filter((item) => id === item.id);
      setItemsById(onlineUserData);
    } else {
      alert("Select User");
    }
  };
 

  const getEmployerDetails = async (employerId: any) => {
    const data = await axios.get("/api/employer", {
      params: {
        id: employerId
      }
    }).then((respon) => {
      setUserName(respon.data.results);
    }).catch((error) => {
      console.log(error);
    });
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const employerId = localStorage.getItem("employerId");
      const userId=localStorage.getItem("userId");
      if (employerId) {
        setJoined(true);
        setRoom((prev:any)=>({id:employerId}));
        getEmployerDetails(employerId);
      }
      if(userId){
        setJoined(true);
        getJobSeekerDetails(userId);
      }
      
    }


    // Listen for incoming messages
    socket.on("message", (data: { sender: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("message");
    };
  }, []);
 
  useEffect(()=>{
    
  },[room]);
  const handleSendMessage = (message: string) => {
    if (message.trim() && room && userName) {
      const data = { room, message, sender: userName?.fullName };
      setMessages((prev) => [...prev, { sender: userName?.fullName, message }]);
      socket.emit("message", data);
    }
  };

  useEffect(() => {
    if (itemsById && typeof window !== "undefined") {
      const roomId = localStorage.getItem("employerId");
      const receiverName = itemsById[0]?.name;

      if (roomId && receiverName) {
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
            {/* <MainSearch handlerSubmitId={handlerSubmitId} setSearchItem={setSearchItem} searchItem={searchItem} results={results} /> */}
          </div>
          {/* Chat Header Section */}
          {itemsById && itemsById.length > 0 ? (
            <div className='w-full'>
              {/* top main contain */}
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
                {/* <div className='h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg'>
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      sender={msg.sender}
                      message={msg.message}
                      isOwnMessage={msg.sender === userName?.fullName}
                    />
                  ))}
                </div> */}
                {/* <ChatForm onSendMessage={handleSendMessage} /> */}
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