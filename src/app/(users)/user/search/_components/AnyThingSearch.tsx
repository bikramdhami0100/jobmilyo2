"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

function AnyThingSearch({anyThingSearch,setAnyThingSearch}:any) {
  const [search,setSearch]=useState<any>(null);
  const handlerSearch=(e:any)=>{
        e.preventDefault();
        setAnyThingSearch(search)
  }
  return (
    <div className=' w-full h-full z-10 '>
            <div className={`dark:bg-[#020817] h-full flex flex-row shadow-md   w-full p-10 m-auto `} >
                <form className='  flex gap-2 flex-wrap justify-start items-center w-full'>
                   
                    <Input   placeholder='Search ' width={200} className={`w-[200px] `} onChange={(e)=>{
                      setSearch(e.target.value)
                    }}  />
                   
                    <Button type= "submit" onClick={handlerSearch} className='w-[200px] bg-green-600 flex gap-2'><Search /> Search</Button>
                </form>
            </div>
        </div>
  )
}

export default AnyThingSearch