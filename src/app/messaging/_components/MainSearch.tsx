"use client"
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { CheckCheck, ChevronDown, ListFilter, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function MainSearch({ setSelectReceiverId, setSearchItem, setSelectItem, results, searchItem }: any) {
  const [itemSelectOption, setItemSelectOption] = useState<string>("");

  const [filterData, setFilterData] = useState<any>();
  useEffect(() => {

    results && setFilterData(results?.filter((item: any) => item?.fullName?.toLowerCase().includes(searchItem?.toLowerCase())))
  }, [results, searchItem])

  console.log(itemSelectOption)

  const handlerUserArchived = async (userId: any) => {
    const send = (await axios.get("/api/messaging/archived", { params: { id: userId } })).data;
    console.log(send, "archive chat");

  }

  const handlerUserArchivedActivate = async (userId: any) => {
    const send = (await axios.put("/api/messaging/archived", { userId, archive: true })).data;
    console.log(send, "archive chat");
  }

  useEffect(() => {
     if(results?.length > 0){
      handlerUserArchived(results[0]?._id); // Pass the userId from results or another appropriate source
     };

     if(itemSelectOption=="archive" && results?.length > 0){
      handlerUserArchivedActivate(results[0]?._id);
     }
    
  }, [results,itemSelectOption]);
  
  return (
    <>
      <div >
        {/* top part */}
        <div className=' w-full flex justify-between  '>
          <h1>Messaging</h1>
          <span><ListFilter /></span>
        </div>
        {/* search part */}
        <div className=' '>
          <div className=' border-b-2 flex hover:outline-none focus:outline-none gap-1 outline-none  '>
            <Search />
            <Input
              placeholder='Search...'
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
              className=' 
                    border-none 
                    outline-none 
                    focus:outline-none 
                    focus:ring-0 
                    focus:border-none 
                    active:border-none 
                    hover:border-none 
                    focus-visible:outline-none 
                    focus-visible:ring-0 
                    bg-transparent'/>
          </div>

          <div>

          </div>
        </div>
        {/* UserData */}
        <div className=' overflow-hidden text-pretty border m-1 p-1 rounded-md '>
          {
            filterData && filterData?.map((item: any, index: any) => (
              <div onClick={() => {
                setSelectItem(item);
                setSelectReceiverId(item?._id);
              }} key={index} className=' cursor-pointer flex gap-1 text-wrap justify-start items-center '>
                <Image src={item?.color} className=' h-[40px] w-[40px] rounded-[20px] ' alt='image' height={40} width={40}></Image>
                <div>
                  <p>{item?.fullName}</p>
                  <p>{item?.email}</p>

                </div>
                <div className="relative bg-transparent inline-block w-14">
                  <label htmlFor="select" className=" bg-transparent sr-only">Options</label>
                  <select
                    id="select"
                    defaultValue=""
                    onChange={(e)=>{
                     setItemSelectOption(e.target.value);
                    }}
                    className="block appearance-none w-8 py-2 px-3 pr-10 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                  >
                    <option value="" disabled hidden>Select option</option>
                    <option className=' bg-black text-white ' value="archive">Archived</option>
                    <option className=' bg-black ' value="delete">Delete</option>
                    <option className=' bg-black' value="block">Block</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default MainSearch