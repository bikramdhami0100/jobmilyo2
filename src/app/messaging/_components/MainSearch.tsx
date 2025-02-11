"use client"
import { Input } from '@/components/ui/input';
import { CheckCheck, ListFilter, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function MainSearch({setSearchItem,setSelectItem ,results,searchItem}:any) {
  console.log(results,"data")
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
                
            </div>
          </div>
          {/* UserData */}
          <div className=' overflow-hidden text-pretty border m-1 p-1 rounded-md '>
              {
                results&& results?.map((item:any,index:any)=>(
                  <div onClick={()=>{
                    setSelectItem(item);
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