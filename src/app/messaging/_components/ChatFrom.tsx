"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { DashboardIcon } from '@radix-ui/react-icons';
import { Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react'

function ChatForm({onSendMessage}:any) {
  const [message,setMessage]=useState<any>();
const handlerSubmit=(e:any)=>{
  e.preventDefault();
  onSendMessage(message);
}
  return (
    <div className=' w-full'>
        <form onSubmit={handlerSubmit} className=' border flex w-full justify-stretch items-center' action="">
          <DashboardIcon className=' w-[50px]'/>
            <Input className='w-full rounded-none border-none   focus:outline-none outline-none' onChange={(e)=>{
                 setMessage(e.target.value)
            }} type='text' placeholder='Type your message here' />

          <div className='flex items-center gap-1'>
          <Paperclip size={40}/>
          <Button className=' w-full' type="submit"><Send /></Button>
          </div>
        </form>

    </div>
  )
}

export default ChatForm