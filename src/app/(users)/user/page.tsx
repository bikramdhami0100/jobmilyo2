import React from 'react'

import TreandingJob from './usercomponents/TreandingJob'
import { CompanySlider } from './usercomponents/CompanySlider'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function UserHome() {
  
  return (
    <div className=' w-full h-full'>
     
      <div className=' w-full h-full'>
        <div className=' w-full h-full flex  flex-col items-center justify-center'>
          <div className=" absolute z-10 flex flex-col  gap-1 lg:gap-2 m-auto justify-center items-center">
            <p className=" text-xl font-bold text-white lg:text-5xl ">Land The <span className=" text-blue-600">Job</span> You <span className=" text-red-600">Love</span></p>
            <p className=" text-sm text-white font-bold lg:text-xl">Your Next <span className=' text-red-700'>Opportunities</span> Awaits Here !!</p>
            <Button className=" self-center bg-blue-600 text-sm font-bold  p-2 rounded-md text-center">Explore More...</Button>
          </div>
          <Image alt="image" style={{}} src={"/banner2.jpeg"} width={500} height={200} className=" object-fill w-full h-full"></Image>
        </div>
      </div>
      
      <TreandingJob />
      <CompanySlider />
    </div>
  )
}

export default UserHome;
