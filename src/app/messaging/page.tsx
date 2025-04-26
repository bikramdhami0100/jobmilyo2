"use client";
import { Circle, Phone, Video } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import MainSearch from './_components/MainSearch';
import ChatMessage from './_components/ChatMessage';
import { socket } from "@/lib/SocketClient";
import ChatForm from './_components/ChatFrom';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import VideoCall from './_components/VideoCall'; // Import the VideoCall component
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

function MessageDashboard() {
  const [messages, setMessages] = useState<{ sender: string; message: string, senderId: string }[]>([]);
  const [senderData, setSenderData] = useState<any>();
  const [roomId, setRoomId] = useState<string>("");
  const [receiverData, setReceiverData] = useState<any>("");
  const [selectReceiverId, setSelectReceiverId] = useState<any>("");
  const [checkRoomId, setCheckRoomId] = useState<string>("");
  const [selectItem, setSelectItem] = useState<any>("");
  const [searchItem, setSearchItem] = useState<any>("");
  const [checkMessage, setCheckMessage] = useState<any>("");
  const [defaultData, setDefaultData] = useState<any>([]);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false); // Track video call state
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [acceptCall, setAcceptCall] = useState<boolean>(false);
  const param = useSearchParams();
  const receiverId = param.get("id");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch receiver data
  const handlerReceiver = async (id: any) => {
    const receiver = (await axios.get("/api/user/user_type", { params: { id } })).data;
    setReceiverData(receiver?.receivers);
  };
  // audioRef.current?.play()

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
    socket.on("incomming_call", (data) => {
      console.log("Incoming call:", data);
      //handle audio play for incomming call
      // if(data?.receiverId!=senderData?._id){
      //   audioRef.current?.play();
      //   setIncomingCall(true);

      // }

      socket.emit("accept_video_call", { roomId: data.roomId, senderId: data.senderId, receiverId: data.receiverId });
      // setIsVideoCallOpen(true);
    });
    socket.on("user_join_for_video", (data) => {
      console.log("User joined for video:", data);
      audioRef.current?.pause();
      setIsVideoCallOpen(true);
    });

    socket.on("call_declined", (data) => {
      console.log("Call declined:", data);
      audioRef.current?.pause();
      setIncomingCall(false);
      setIsVideoCallOpen(false);
      // navigator.mediaDevices.getDisplayMedia({video:false,audio:false});
      // navigator.mediaDevices.getUserMedia({video:false,audio:false});
    });
  }, [socket]);

  const saveInitailUserMessage = async (roomId: any, sender: any, receiver: any, message: any) => {
    const send = (await axios.post("/api/messaging", { roomId, sender, receiver, message })).data;
    console.log(send);


  }
  // Handle sending a message
  const handleSendMessage = (message: any) => {
    if (message.trim() === "") return; // Prevent empty messages
    // Emit the message to the server
    saveInitailUserMessage(roomId, senderData?._id, selectItem?._id, message)
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
        // Add the message to the state
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

  return (
    <div>
      <audio loop={incomingCall} ref={audioRef} src="/message/incommingCall.mp3" />
      <AlertDialog open={incomingCall}>
        <AlertDialogTrigger asChild>
          {/* You can place a hidden button or trigger logic here */}
          <button className="hidden" />
        </AlertDialogTrigger>

        <AlertDialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="text-lg font-semibold text-gray-900">
              Incoming Video Call
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
              Are you sure you want to accept this video call?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="ghost"
              onClick={() => {
                setIncomingCall(false);
                audioRef.current?.pause();
                setAcceptCall(false);
                socket.emit("decline_call", { roomId, senderId: senderData?._id, receiverId: selectItem?._id });
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                setIncomingCall(false);
                setIsVideoCallOpen(true);
                audioRef.current?.pause();
                setAcceptCall(true);
                // socket.emit("accept_video_call", { roomId, senderId: senderData?._id, receiverId: selectItem?._id });

              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Accept

            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>


      <div className='flex-col py-2'>
        {/* Search Section */}
        <div className=' flex  max-h-screen'>
          <div className=' hidden lg:flex md:flex h-full  p-2'>
            <MainSearch setSearchItem={setSearchItem} setSelectItem={setSelectItem} setSelectReceiverId={setSelectReceiverId} searchItem={searchItem} results={receiverData} />
          </div>
          {/* Chat Header Section */}
          {selectItem && (
            <div className='w-full grid-cols-4 h-screen'> {/* Add h-screen to constrain height */}
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
                  <Video className='cursor-pointer' onClick={() => {
                    setIsVideoCallOpen(!isVideoCallOpen);
                    // alert("Allow video Calling ...")
                  }} /> {/* Video call button */}
                  <Phone className='cursor-pointer' />
                  <div className='flex gap-[1px]'>
                    <Circle fill='gray' size={12} />
                    <Circle fill='gray' size={12} />
                    <Circle fill='gray' size={12} />
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className='w-full relative border-l-2 h-[calc(100vh-80px)] flex flex-col'>
                {/* Messages Container */}
                <div className='flex-1 overflow-y-auto p-4 pb-20'> {/* Add pb-20 for padding-bottom */}
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      // sender={msg?.senderId === senderData?._id ? selectItem?.fullName : senderData?.fullName}
                      sender={msg?.senderId === senderData?._id ? senderData?.fullName : selectItem?.fullName}
                      message={msg.message}
                      isOwnMessage={msg.senderId === senderData?._id}
                    />
                  ))}
                </div>

                {/* Fixed Chat Form */}
                <div className='w-full rounded-md border-t lg:w-[60%] md:w-[50%] fixed bottom-0 bg-white dark:bg-[rgb(2,8,23)] dark:text-white'>
                  <ChatForm onSendMessage={handleSendMessage} />
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
                  <Sheet>
                    <SheetTrigger>Get Started</SheetTrigger>
                    <SheetContent className=' bg-white dark:bg-[rgb(17,24,39)] dark:text-white text-black' side={"left"}>
                      <SheetHeader>
                        <SheetTitle>Available Users </SheetTitle>
                        <SheetDescription>
                          <div className=' h-full  p-2'>
                            <MainSearch setSearchItem={setSearchItem} setSelectItem={setSelectItem} setSelectReceiverId={setSelectReceiverId} searchItem={searchItem} results={receiverData} />
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Call Component */}

      {
        isVideoCallOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl'>

            <VideoCall
              roomId={roomId}
              setAcceptCall={setAcceptCall}
              acceptCall={acceptCall}
              senderId={senderData?._id}
              receiverId={selectItem?._id}
              isvideoCallOpen={isVideoCallOpen}
              setIsVideoCallOpen={setIsVideoCallOpen}
              onClose={() => setIsVideoCallOpen(false)}
            />

          </div>
        )
      }

    </div>
  );
}

export default MessageDashboard;