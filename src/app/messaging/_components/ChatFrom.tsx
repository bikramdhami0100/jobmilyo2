
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { DashboardIcon } from '@radix-ui/react-icons';
import { Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

function ChatForm({ onSendMessage }: any) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    // setOpenDialog(false); // close picker after selection (optional)
  }

  return (
    <div className='w-full rounded-md p-1 dark:bg-[rgb(2,8,23)] dark:text-white bg-white border-t'>
      <form onSubmit={handlerSubmit} className='flex mb-2 w-full justify-stretch items-center gap-2'>

        {/* Emoji Picker Button */}
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger asChild>
            <DashboardIcon 
              onClick={() => setOpenDialog(true)}
              className="cursor-pointer hover:text-blue-600" 
              width={32} 
              height={32} 
            />
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-sm hide-scrollbar w-[350px] bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl border">
            <div className="flex flex-col gap-4">
              <p className="text-center font-semibold text-gray-800 dark:text-white">Pick an Emoji</p>
              <div className="max-h-80 overflow-y-auto custom-scrollbar hide-scrollbar">
                <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" className=' hide-scrollbar' />
              </div>
              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md mt-2">
                Cancel
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        {/* Input Field */}
        <Input
          className='w-full border-none focus:outline-none rounded-md dark:bg-gray-800 dark:text-white'
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          value={message}
          placeholder='Type your message here'
        />

        {/* Attach & Send Button */}
        <div className='flex items-center gap-1'>
          <Paperclip className="cursor-pointer hover:text-blue-600" size={32} />
          <Button className='p-2' type="submit">
            <Send size={24} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatForm;
