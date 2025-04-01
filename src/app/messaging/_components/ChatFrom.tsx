"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { DashboardIcon } from '@radix-ui/react-icons';
import { Paperclip, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function ChatForm({onSendMessage,inputEmpty,setInputEmpty}:any) {
  const [message,setMessage]=useState<string>();
  
  const handlerSubmit=(e:any)=>{
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <div className='w-full rounded-md p-1 dark:bg-[rgb(2,8,23)] dark:text-white  bg-white border-t'>
        <form onSubmit={handlerSubmit} className=' flex mb-2 w-full justify-stretch items-center'>
          <DashboardIcon className='w-[50px]'/>
            <Input 
              className='w-full hover:border-none hover:outline-none rounded-none border-none focus:outline-none outline-none' 
              onChange={(e) => setMessage(e.target.value)} 
              type='text' 
              value={message} 
              placeholder='Type your message here' 
            />

          <div className='flex items-center gap-1'>
            <Paperclip size={40}/>
            <Button className='w-full' type="submit"><Send /></Button>
          </div>
        </form>
    </div>
  )
}

export default ChatForm