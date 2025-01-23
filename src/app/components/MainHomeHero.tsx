"use client"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import React from 'react'
import { ReactTyped } from "react-typed";
function MainHomeHero() {
  const router = useRouter();

  return (
    <div className=' flex flex-col gap-10 w-[100%] md:w-[100%] lg:w-[100%] '>
      <div className=' flex flex-col  w-[100%] p-2 gap-6'>
        <div>
          <h1 className=' font-extrabold text-[50px]'> Let us find your </h1>

          <h1 className=' text-[30px]'>Job from <span className=' text-blue-600 font-extrabold'>
            <ReactTyped
              backSpeed={50}
              onBegin={function noRefCheck() { }}
              onComplete={function noRefCheck() { }}
              onDestroy={function noRefCheck() { }}
              onLastStringBackspaced={function noRefCheck() { }}
              onReset={function noRefCheck() { }}
              onStart={function noRefCheck() { }}
              onStop={function noRefCheck() { }}
              onStringTyped={function noRefCheck() { }}
              onTypingPaused={function noRefCheck() { }}
              onTypingResumed={function noRefCheck() { }}
              strings={[
                "Anywhere",
                "for example",
                'Home',
                'College',
                'Office',

              ]}
              loop
              typeSpeed={50}
              typedRef={function noRefCheck() { }}
            >

            </ReactTyped>

          </span></h1>
        </div>
        <p><span className=' font-extrabold text-blue-700'>Job</span> <span className=' text-rose-700 font-extrabold '>मिल्यो?</span> is a user-friendly platform that connects job seekers with a wide range of career opportunities across various industries. With personalized job recommendations, comprehensive job profiles, and efficient application processes, Jobmilyo streamlines the job search experience, helping you find your dream job effortlessly. Join Jobmilyo today and take the next step towards a fulfilling career!</p>

      </div>
      <div className='w-full justify-start items-center flex flex-wrap p-2 gap-2 md:flex-row lg:flex-row '>
        <Button className=' w-[90%] md:w-[40%] lg:w-[40%] bg-blue-600 h-[50px] font-extrabold text-[20px]' onClick={() => {
          router.push("/user")
        }}>Get Started</Button>
        <Button className=' w-[90%] md:w-[40%] lg:w-[40%] bg-blue-600 h-[50px] font-extrabold text-[20px]' onClick={() => {
          router.push("/user")
        }}>Learn More...</Button>
      </div>
    </div>
  )
}

export default MainHomeHero
