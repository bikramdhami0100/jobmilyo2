"use client"
import { userSocket } from "@/app/context/SocketContext"
import { useEffect, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import VideoCall from "./VideoCall";

const CallNotification = () => {
    const  {ongoingCall,handleJoinCall,isVideoCallOpen,setIsVideoCallOpen,handleHangup}=userSocket();
    const [availableId,setAvailableId]=useState<string|null>("");
      const audioRef = useRef<HTMLAudioElement>(null);
    
   useEffect(()=>{
     if(typeof window !== "undefined"){
       const availableId=localStorage.getItem("userId")||localStorage.getItem("employerId");
       setAvailableId(availableId);
       if(availableId!=ongoingCall?.participants?.receiver?.userData?._id){
        console.log("this is not your call")
       }
     } 
     ongoingCall&& audioRef.current?.play();
   },[ongoingCall]);
    if(!ongoingCall?.isRinging )return ;
    if(availableId==ongoingCall?.participants?.caller?.userData?._id)return;
   console.log(ongoingCall,"this is ongoing  inside notification component" )
  return (
    <div className=" absolute  bg-opacity-70  w-full min-h-screen bg-slate-300 bottom-0 right-0 left-0 top-0 z-20">
      <audio loop={ongoingCall?.isRinging} ref={audioRef} src="/message/incommingCall.mp3" />
      <AlertDialog open={ongoingCall?.isRinging}>
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
                // setIncomingCall(false);
                // audioRef.current?.pause();
                // setAcceptCall(false);
                // socket.emit("decline_call", { roomId, senderId: senderData?._id, receiverId: selectItem?._id });
                handleHangup({ ongoingCall: ongoingCall ? ongoingCall : undefined, isEmitHangup: true })
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                // setIncomingCall(false);
                // setIsVideoCallOpen(true);
                // audioRef.current?.pause();
                // setAcceptCall(true);
                // socket.emit("accept_video_call", { roomId, senderId: senderData?._id, receiverId: selectItem?._id });
                  handleJoinCall(ongoingCall);
                  audioRef.current?.pause();
                  setIsVideoCallOpen(true);

              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Accept

            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  )
}

export default CallNotification