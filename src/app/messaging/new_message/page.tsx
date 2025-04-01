"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function NewMessages() {
    const [senderData,setSenderData]=useState<any>("");
    const [todayDate,setTodayDate]=useState<any>();
    const handlerCheckNewMessage=async(id:string,todayDate:any)=>{
        const send=(await axios.get("/api/messaging/new_message",{params:{id}})).data;
        setSenderData(send?.new_message);
        console.log("any Data for message",send?.new_message)
        console.log(send,"New message available")
    }
    
    useEffect(() => {
        if (typeof window !== undefined) {
            const senderId = localStorage.getItem("employerId") || localStorage.getItem("userId");
            const date=new Date()
            const todayDate=date.getTime();
             setTodayDate(todayDate);
            senderId&&handlerCheckNewMessage(senderId,todayDate)
        } 

        return () => {

        }
    }, [])
    function formatTimeDifference(differenceMs: number): string {
        const seconds = Math.floor(differenceMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hrs${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
        }
      }
    return (
        <div>
             {senderData&& senderData?.map((item:any,index:number)=>{
                const date=new Date(item?.timestamp)
                console.log(date.getTime());
                return(
                    <div key={index} className='gap-2 items-center justify-center mt-2 flex-wrap  relative border  rounded-md p-2 w-[40%]'>
                         <div  className=' flex gap-2 items-center  flex-wrap '>
                         <img alt='image' src={item?.sender?.color} height={40}  width={40} className=' h-[40px]  w-[40px] rounded-[20px] ' />
                         <div>
                         <h1 className=' '>{item?.sender?.fullName}</h1>
                         <p>{item?.message||"Hey 👋👋👋"}</p>
                         </div>
                         </div>
                          <p className=' text-end  self-end '>{formatTimeDifference(todayDate-date.getTime())}</p>
                    </div>
                )
             })}
        </div>
    )
}

export default NewMessages