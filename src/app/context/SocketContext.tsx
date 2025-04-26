"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
interface iSocketContext{

}
export const SocketContext=createContext<iSocketContext|null>(null);

export const SocketContextProvider=({children}:{children:React.ReactNode})=>{
    const [user,setUser]=useState<any>(null);
    const [socket,setSocket]=useState<Socket | null>(null);
    const [isSocketConnected,setIsSocketConnected]=useState(false);
    console.log(user,"this is user")
    console.log(socket,"this is socket")
    console.log(isSocketConnected,"this is socket connected")
   const handlerUser=async()=>{
    const userId=localStorage.getItem("userId");
    const employerId=localStorage.getItem("employerId");
    console.log(employerId,"this is employer id")
        if(!userId){
            return null;
        }

        if(!employerId){
            return null;
        }

       if(userId){
        const send=(await axios.get("/api/user/apply",{params:{id:userId}})).data
        if(send.status==200){
           setUser(send?.data);
       
        } }

       if(employerId){
        const data = (await axios.get("/api/employer", {
            params: {
              id: employerId,
            }
          })).data;
          setUser(data?.results)
       }
   }
    useEffect(() => {
      const newSocket=io();
      setSocket(newSocket);
      handlerUser();
      return () => {
         newSocket.disconnect();
      }
    }, []);

    useEffect(() => {
      if(socket===null){
        return;
      }

      if(socket.connected){
         onConnect()
      }
      function onConnect() {
         setIsSocketConnected(true);
      }
      function onDisconnect() {
         setIsSocketConnected(false);
      }

       
       socket.on("connect",onConnect);
       socket.on("disconnect",onDisconnect);
    
      return () => {
         socket.off("connect",onConnect);
         socket.off("disconnect",onDisconnect);
      }
    }, [socket])
     
    // console.log(user,"this is user")
    
    return(
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}

export const userSocket=()=>{
    const context=useContext(SocketContext);
    if(!context){
        throw new Error("useSocket must be used within a SocketContextProvider")
    }
    return context;
}