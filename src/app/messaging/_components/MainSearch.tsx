"use client"
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { CheckCheck, ChevronDown, ListFilter, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function MainSearch({ setSelectReceiverId, setSearchItem, setSelectItem, results, searchItem }: any) {

  const [filterData, setFilterData] = useState<any>();
  useEffect(() => {

    results && setFilterData(results?.filter((item: any) => item?.fullName?.toLowerCase().includes(searchItem?.toLowerCase())))
  }, [results, searchItem])


  
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
             
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default MainSearch