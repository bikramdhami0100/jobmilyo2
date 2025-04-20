
"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

function ArchiveChat() {
  const handlerFetchArchivedChat = async (userId:string) => {
    const send = (await axios.get("/api/messaging/archived",{params:{id:userId}})).data;
    console.log(send, "archive chat");

  }
  useEffect(() => {
    if (typeof window !== undefined) {
      const userId = localStorage.getItem("userId") || localStorage.getItem("employerId");
      userId && handlerFetchArchivedChat(userId);
    }
  }, [])
  return (
    <div>ArchiveChat</div>
  )
}

export default ArchiveChat