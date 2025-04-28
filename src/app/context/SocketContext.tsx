"use client"
import { OngoingCall, Participants, PeerData, SocketUser } from "@/types";
import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
interface iSocketContext {
  onlineUsers: SocketUser[] | null,
  ongoingCall: OngoingCall | null,
  localStream:MediaStream|null,
  peer:PeerData|null,
  handleCall: (user: SocketUser) => void,
  handleJoinCall:(ongoingCall:OngoingCall)=>void,
  isVideoCallOpen:boolean,
  isCallEnded:boolean,
  handleHangup:(data:{ongoingCall?:OngoingCall|null,isEmitHangup?:boolean})=>void,
  setIsVideoCallOpen:(isOpen:boolean)=>void
}
export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
  const [ongoingCall, setOngoingCall] = useState<OngoingCall | null>(null);
  const [localStream,setLocalStream]=useState<MediaStream|null>(null);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false); 
  const [peer,setPeer]=useState<PeerData|null>(null);
  const [isCallEnded,setIsCallEnded]=useState<boolean>(false);
  const currentSocketUser = onlineUsers?.find(onlineUser => onlineUser.userId === user?._id);
  
  const getMediaStream=useCallback(async(faceMode?:string)=>{
    if(localStream)return localStream;
     try {
      const devices=await navigator.mediaDevices.enumerateDevices();
  
      const videoDevices=devices.filter(device=>device.kind==="videoinput");
      const audioDevices=devices.filter(device=>device.kind==="audioinput");
    
      const stream=await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:{
          width:{min:640,ideal:1280,max:1920},
          height:{min:360,ideal:720,max:1080},
          frameRate:{min:16,ideal:30,max:30},
          facingMode:videoDevices.length>0? faceMode:undefined
        }
      });
      setLocalStream(stream);
      return stream;
        
     } catch (error) {
       console.log(error,"this is error")
       return null;
     }
  },[localStream]);

  const handleCall = useCallback(async(user: SocketUser) => {
    setIsCallEnded(false);
    if (!currentSocketUser ||!socket) return;
     
    const stream=await getMediaStream();
     if(!stream)
      {
        console.log("No sstream in handleCall")
        return;
      };


    const participants = {
      caller: currentSocketUser,
      receiver: user
    }
    setOngoingCall({ participants, isRinging: true })
    //  socket?.emit("call",{userToCall:user.socketId,signalData:currentSocketUser?.socketId,from:currentSocketUser?.socketId,name:user?.userData?.fullName})
    socket?.emit("call", participants);

  }, [socket, currentSocketUser, ongoingCall]);

  const onIncomingCall=useCallback((participants:Participants) => {
    console.log(participants,"Incomming call")
      setOngoingCall({participants,isRinging:true})
    },[socket,user,ongoingCall])
  

  console.log(onlineUsers, "this is online users")

  const handlerUser = async () => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const send = (await axios.get("/api/user/socketUsers", { params: { id: userId } })).data
        if (send.status == 200) {
          setUser(send?.data);

        }
      }
    }

    if (typeof window !== "undefined") {
      const employerId = localStorage.getItem("employerId");
      if (employerId) {
        const data = (await axios.get("/api/employer", {
          params: {
            id: employerId,
          }
        })).data;
        setUser(data?.results)
      }
    }
  }

  const handleHangup=useCallback((data:{ongoingCall?:OngoingCall|null,isEmitHangup?:boolean})=>{
     if(socket&&user&&data?.ongoingCall&& data?.isEmitHangup){
      socket.emit("hangup",{
        ongoingCall:data?.ongoingCall,
        userHangingupId:user._id
      });
     }
    setPeer(null);
    setOngoingCall(null);
    if(localStream){
      localStream.getTracks().forEach(track=>track.stop());
      setLocalStream(null);
    }
    setIsCallEnded(true);
    setIsVideoCallOpen(false);
  },[socket,user,localStream])

const creatPeer=useCallback((stream:MediaStream,initiator:boolean)=>{

  const iceServers: RTCIceServer[] = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun3.l.google.com:19302', 'stun:stun4.l.google.com:19302', 'stun:stun5.l.google.com:19302'] }];
  
  const peer=new Peer({
              initiator,
              stream,
              trickle:true,
              config: {
                iceServers,
              },
  });
 
  peer.on("stream",(stream)=>{
    setPeer(prev=>{
      if(prev){
        return {...prev,stream}
      }
      return prev;
    })
    console.log(stream,"this is stream")
  });

 peer.on("error",(err)=>{
  console.log(err,"this is error")
});

peer.on("close",()=>{
  handleHangup({});
});

const rtcPeerConnection:RTCPeerConnection = (peer as any)._pc;
  // return peer;
  rtcPeerConnection.oniceconnectionstatechange = async(event) => {
     if(rtcPeerConnection.iceConnectionState === "disconnected" || rtcPeerConnection.iceConnectionState === "failed"){
      handleHangup({});
    }
    // console.log("ICE connection state changed:", event.target.iceConnectionState);
  };

  return peer;

},[ongoingCall,setPeer])

const completePeerConnection=useCallback(async(connectionData:{sdp:SignalData,ongoingCall:OngoingCall,isCaller:boolean})=>{
         if(!localStream){
           console.log("Missing the local stream");
           return;
         }
         if(peer){
          peer.peerConnection?.signal(connectionData.sdp);
          return
         }

        const newPeer=creatPeer(localStream,true);
    setPeer({
      peerConnection:newPeer,
      participantUser:connectionData.ongoingCall.participants.receiver,
      // initiator:true,
      stream:undefined,
      // trickle:true,
      // config:{}
    });

    newPeer.on("signal",async(data:SignalData)=>{
   
      if(socket){
        // console.log("emit offer")
        socket.emit("webrtcSignal",{
          sdp:data,
          ongoingCall,
          isCaller:true,
        })
      }

    })
         

},[localStream,creatPeer,peer,ongoingCall]);

  const handleJoinCall=useCallback(async(ongoingCall:OngoingCall) => {
        // join-call
        setIsCallEnded(false);
        setOngoingCall((prev)=>{
           if(prev){
            return {...prev,isRinging:false}
           }
           return prev;
        });
        const stream=await getMediaStream();
        if(!stream){
          console.log("No stream in handleJoinCall")
          return;
        };

    const newPeer=creatPeer(stream,true);
    setPeer({
      peerConnection:newPeer,
      participantUser:ongoingCall.participants.receiver,
      stream:undefined,
    });

    newPeer.on("signal",async(data:SignalData)=>{
   
      if(socket){
        // console.log("emit offer")
        socket.emit("webrtcSignal",{
          sdp:data,
          ongoingCall,
          isCaller:false,
        })
      }

    })
        // console.log(ongoingCall,"this is ongoing call inside socketContext component")
    },
    [socket,currentSocketUser])
  
  // initialize socket
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    handlerUser();
    return () => {
      newSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket === null) {
      return;
    }

    if (socket.connected) {
      onConnect()
    }
    function onConnect() {
      setIsSocketConnected(true);
    }
    function onDisconnect() {
      setIsSocketConnected(false);
    }


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  }, [socket])

  useEffect(() => {

    if (!socket || !isSocketConnected || !user) return;

    socket.emit("addNewUsers", { userId: user?._id, userData: user });
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [socket, isSocketConnected, user])

//calls
useEffect(() => {
  if(!socket||!isSocketConnected)return;
  
  socket.on("incomingCall",onIncomingCall);
  socket.on("webrtcSignal",completePeerConnection)
  socket.on("hangup",handleHangup)
  return ()=>{
    socket.off("incomingCall",onIncomingCall);
    socket.off("webrtcSignal",completePeerConnection)
    socket.off("hangup",handleHangup)
  }
}, [socket,isSocketConnected,user,onIncomingCall,completePeerConnection])

  console.log(user, "this is user")
  console.log(onlineUsers, "this is online users")

  useEffect(()=>{
        let timeout:ReturnType<typeof setTimeout>;
        if(isCallEnded){
          timeout=setTimeout(() => {
                setIsCallEnded(false);
          }, 3000);
        }
        return ()=>{
          clearTimeout(timeout);
        }
  },[isCallEnded])
  return (
    <SocketContext.Provider value={{isCallEnded, handleHangup, peer, onlineUsers,handleCall,ongoingCall ,localStream,handleJoinCall,isVideoCallOpen,setIsVideoCallOpen}}>
      {children}
    </SocketContext.Provider>
  )
}

export const userSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketContextProvider")
  }
  return context;
}