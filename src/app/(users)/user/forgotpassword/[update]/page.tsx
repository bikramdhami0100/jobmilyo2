"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

import { Button } from '@/components/ui/button'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import ResetPassword from '../../components/ResetPassword'
function HanderResetPassword({params}:any) {
//  console.log(params?.update);
  return (
    <div className='flex  flex-col justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>
           

    <div className=' grid-cols-2 justify-center items-center'>
        <div className=' flex flex-col justify-center '>

            <div>
                <Image alt='login image' src={"/images/forget.svg"} height={400} width={400} className=' h-full'></Image>
            </div>
        </div>
    </div>
   {
     <ResetPassword id={params?.update}/>
   }
</div>
  )
}

export default HanderResetPassword