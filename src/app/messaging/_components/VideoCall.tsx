"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { socket } from "@/lib/SocketClient";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Shadcn Dialog

interface VideoCallProps {
  roomId: string;
  senderId: string;
  isvideoCallOpen: boolean;
  setIsVideoCallOpen: (isOpen: boolean) => void;
  receiverId: string;
  onClose: () => void;
  acceptCall: boolean;
  setAcceptCall: (acceptCall: boolean) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, isvideoCallOpen,setIsVideoCallOpen, senderId, receiverId, onClose,acceptCall,setAcceptCall }) => {
  
  const [isCalling, setIsCalling] = useState(false); // Track if a call is in progress
  const [incomingCall, setIncomingCall] = useState<any>(null); // Track incoming call
  const localVideoRef = useRef<HTMLVideoElement>(null); // Local video element
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // Remote video element
  const pcRef = useRef<RTCPeerConnection>(null);
  const [offerCreated, setOfferCreated] = useState(false);
 
  console.log(roomId,senderId,receiverId,"isvideoCallOpen",isvideoCallOpen);
  useEffect(() => {

    socket.emit('join_video_room', { roomId, senderId,receiverId });

    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        pcRef.current = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice-candidate', {
              candidate: event.candidate,
              roomId
            });
          }
        };

        pc.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        socket.on('offer', async (offer) => {
          if (!pcRef.current) return;
          await pcRef.current.setRemoteDescription(offer);
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          socket.emit('answer', { answer, roomId,senderId,receiverId });
        });

        socket.on('answer', async (answer) => {
          if (!pcRef.current) return;
          await pcRef.current.setRemoteDescription(answer);
        });

        socket.on('ice-candidate', async (candidate) => {
          if (!pcRef.current) return;
          try {
            await pcRef.current.addIceCandidate(candidate);
          } catch (e) {
            console.error('Error adding ICE candidate:', e);
          }
        });

      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    socket.on('user_join', (email) => {
      console.log(`User ${email} joined, creating offer...`);
      createOffer();
    });

    
    setupMedia();

    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('user_join');
    };
  }, [socket, roomId]);

  const createOffer = async () => {
    if (!pcRef.current) return;
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit('offer', { offer, roomId });
    setOfferCreated(true);
  };
  const handleEndCall = async() => {
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
    socket.emit('end-call', { roomId });
    setIsVideoCallOpen(false);
    setOfferCreated(false);
    localVideoRef.current!.srcObject = null;
    remoteVideoRef.current!.srcObject = null;


  }

  useEffect(()=>{
      acceptCall&&createOffer();
  },[acceptCall]);
  return (
    <div className=" w-full h-full">

      <div className="flex gap-4 h-full w-full m-auto border border-green-600 justify-center items-center">

        {
          roomId && (
            <>
              <div className=" flex flex-col justify-between items-center ">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={()=>{
                  
                    createOffer()
                  }}
                  // disabled={offerCreated}

                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                  Start Call
                </button>
                <button
                  onClick={()=>{
                 
                    socket.emit('end-call', { roomId });
                     handleEndCall()
                    
                  }}
                  
                  // disabled={offerCreated}
                  className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                 End Call
                </button>
              </div>
              <div className="flex gap-4">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-1/2 h-1/2 border rounded-lg"
                />
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-1/2 h-1/2 border rounded-lg"
                />
              </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default VideoCall;
