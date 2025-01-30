"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function ChatForm({onSendMessage}:any) {
  const [message,setMessage]=useState<any>();
const handlerSubmit=(e:any)=>{
  e.preventDefault();
  onSendMessage(message);
  console.log(message,"this is from chatform")
}
  return (
    <div>
        <form onSubmit={handlerSubmit} action="">
            <input onChange={(e)=>{
                 setMessage(e.target.value)
            }} type='text' placeholder='Type your message here' />

           <Button type="submit">Submit</Button>
        </form>

    </div>
  )
}

export default ChatForm