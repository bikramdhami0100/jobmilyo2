"use client"
import { Input } from '@/components/ui/input';
import { CheckCheck, ListFilter, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function MainSearch({setSearchItem,results,searchItem,handlerSubmitId,userCallBackHandler}:any) {
  return (
    <>
       <div >
          {/* top part */}
          <div className=' w-full flex justify-between '>
            <h1>Messaging</h1>
            <span><ListFilter /></span>
          </div>
          {/* search part */}
          <div className=' '>
            <div className=' border-b-2 flex gap-1 '>
              <Search /> 
              <Input 
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }} 
                className=' 
                  outline-none 
                  hover:outline-none 
                  focus:outline-none 
                  focus:border-none 
                  hover:border-none 
                  active:border-none 
                  border-b-2 
                  border-0 
                ' 
              />
            </div>
            <div>
              {results.filter((item:any) => {
                return searchItem?.length > 2 ?  searchItem.toLowerCase().trim()==item?.name?.toLowerCase().trim() : item;
              }).map((item:any, index:any) => {
                return (
                  <div 
                    key={index} 
                    onClick={() => {
                      handlerSubmitId(item?.id);
                    }} 
                    className=' 
                      flex 
                      border 
                      mt-2 
                      p-2 
                      rounded-md 
                      gap-2 
                      justify-center 
                      cursor-pointer 
                      items-center
                    '
                  >
                    {/* image part */}
                    <div>
                      <Image 
                        src={item?.image} 
                        alt={item?.name + index} 
                        width={80} 
                        height={80} 
                        className=' w-[24px] h-[24px] rounded-[12px] ' 
                      />
                    </div>
                    {/* content part */}
                    <div className=''>
                      <h1>{item?.name}</h1>
                      <p className=' text-ellipsis'>{item.last_message}</p>
                    </div>
                    {/* last part */}
                    <div>
                      <p>{item?.time}</p>
                      <p>{item.seen && <CheckCheck color='blue' />} {!item?.seen && <CheckCheck color='gray' />} </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    </>
  )
}

export default MainSearch