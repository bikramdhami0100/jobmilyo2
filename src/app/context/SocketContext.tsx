"use client"
import { OngoingCall, SocketUser } from "@/types";
import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
interface iSocketContext {
onlineUsers:SocketUser[]|null
}
export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
  const [ongoingCall, setOngoingCall] = useState<OngoingCall| null>(null);

  const currentSocketUser=onlineUsers?.find(onlineUser=>onlineUser.userId===user?._id);
  const handlCall=useCallback((user:SocketUser)=>{
if(!currentSocketUser)return;

     const participants={
      caller:currentSocketUser,
      // receiver:ongoingCall?.partcipants.receiver
      receiver:user
     }
     setOngoingCall({participants,isRinging:true})
    //  socket?.emit("call",{userToCall:user.socketId,signalData:currentSocketUser?.socketId,from:currentSocketUser?.socketId,name:user?.userData?.fullName})
    socket?.emit("call",participants)
  },[socket,currentSocketUser,ongoingCall]);
  // console.log(user, "this is user")
  // console.log(socket, "this is socket")
  // console.log(isSocketConnected, "this is socket connected")
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


  console.log(user,"this is user")
 console.log(onlineUsers,"this is online users")
  return (
    <SocketContext.Provider value={{onlineUsers}}>
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