"use client"
import { CheckCheck, Circle, Dot, DotIcon, ListFilter, Phone, Search, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
import MainSearch from './_components/MainSearch'

function MessageDashboard() {
  const [searchItem, setSearchItem] = useState<any>("");
  const [itemsById, setItemsById] = useState<any>();
  const results = [
    {
      name: "Bikki Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: true,
      time: "4m Ago",
      id: "676513d79d209b4d2fc600db"
    },
    {
      name: "Sunita Joc",
      image: "/images/social/google.png",
      last_message: "Thank you very much. I'm glad",
      seen: true,
      online: false,
      time: "4m Ago",
      id: "676513d79d209b4d2fc600dc"
    }
  ]
  const handlerSubmitId = (id: string) => {
    console.log(id);
    if (id) {
      let onlineUserData = results.filter((item, index) => {
        return id === item.id;
      })
      setItemsById(onlineUserData);
    }
    if (!id) {
      alert("Select User")
    }

  }


  return (
    <div>
      <div className=' flex  py-2  '>
        {/* search Section */}
        <div className='  min-h-screen border-r-2 p-2'>

          <MainSearch handlerSubmitId={handlerSubmitId} setSearchItem={setSearchItem} searchItem={searchItem} results={results} />
        </div>
        {/* chating section */}
        <div className='w-full   '>

          <div className=' flex justify-between border-b-2 p-2'>
            <div>
              {itemsById &&
                <div className=' flex gap-2 mx-1'>
                  <div>
                    <Image src={itemsById[0]?.image} alt='image' width={40} height={40} />
                  </div>
                  <div className=' '>
                    <div>{itemsById[0]?.name}</div>
                    <div className=' flex gap-1 justify-center items-center'>
                      {itemsById[0]?.online == true ? (<>
                        <Circle color=' green' fill='green' size={8}></Circle> Online
                      </>) : (<> Offline</>)}

                    </div>
                  </div>
                </div>
              }
            </div>
            <div className=' flex gap-2 items-center' >
              <Video/>
              <Phone/>
               <div className='flex gap-[1px]' >
               <Circle fill='gray' size={12} />
               <Circle fill='gray' size={12} />
               <Circle fill='gray' size={12} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDashboard