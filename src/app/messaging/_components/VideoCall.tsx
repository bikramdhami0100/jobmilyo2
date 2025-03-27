"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { socket } from "@/lib/SocketClient";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Shadcn Dialog

interface VideoCallProps {
  roomId: string;
  senderId: string;
  receiverId: string;
  onClose: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, senderId, receiverId, onClose }) => {
  const [isCalling, setIsCalling] = useState(false); // Track if a call is in progress
  const [incomingCall, setIncomingCall] = useState<any>(null); // Track incoming call
  const localVideoRef = useRef<HTMLVideoElement>(null); // Local video element
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // Remote video element
  const peerInstance = useRef<any>(null); // Peer instance

  useEffect(() => {
    if (socket) {
      socket.on("callSignal", (data) => {
        if (data.senderId !== senderId) {
          setIncomingCall(data);
        }
      });

      socket.on("callAccepted", (signal) => {
        if (peerInstance.current) {
          peerInstance.current.signal(signal);
        }
      });

      return () => {
        socket.off("callSignal");
        socket.off("callAccepted");
      };
    }
  }, [senderId]);

  const handleVideoCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
          socket.emit("callSignal", { signal: data, senderId, receiverId, room: roomId });
        });

        peer.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        peerInstance.current = peer;
        setIsCalling(true);
      })
      .catch((err) => console.error("Failed to get local stream:", err));
  };

  const handleAcceptCall = () => {
    if (incomingCall) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          const peer = new Peer({ initiator: false, trickle: false, stream });

          peer.on("signal", (data) => {
            socket.emit("callAccepted", { signal: data, receiverId: senderId, senderId: incomingCall.senderId, room: roomId });
          });

          peer.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });

          peer.signal(incomingCall.signal);
          peerInstance.current = peer;
          setIsCalling(true);
          setIncomingCall(null);
        })
        .catch((err) => console.error("Failed to get local stream:", err));
    }
  };

  const endCall = () => {
    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
    [localVideoRef, remoteVideoRef].forEach(ref => {
      if (ref.current?.srcObject) {
        (ref.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    });
    setIsCalling(false);
    onClose();
  };
//  handleVideoCall();
  return (
    <Dialog open={isCalling || !!incomingCall} onOpenChange={(open) => !open && endCall()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{incomingCall ? 'Incoming Call' : 'Ongoing Call'}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <video ref={localVideoRef} autoPlay muted className="w-1/2 border rounded-lg" />
          <video ref={remoteVideoRef} autoPlay className="w-1/2 border rounded-lg" />
        </div>
        {incomingCall && (
          <Button onClick={handleAcceptCall} className="mt-4">
            Answer Call
          </Button>
        )}
        <Button onClick={endCall} className="mt-4 bg-red-500 text-white">End Call</Button>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCall;
