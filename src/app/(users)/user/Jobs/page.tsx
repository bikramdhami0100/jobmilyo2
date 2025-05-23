"use client"
import Image from 'next/image'
import React from 'react'
import { useTheme } from 'next-themes'
import JobsTopSearchCategory from './_components/JobsTopSearchCategory';
import LatestJobOpenings from './_components/LatestJobOpenings';

function Jobs() {
  const {theme}=useTheme();
  return (
    <div className={` ${theme=="light"?"bg-[#f3f7fb]":""}`}>
      <div>
         <Image alt='image' src={"/images/jobsimages/hiring.jpg"} width={400} height={400}  className=' w-[90vw] m-auto pt-10 mb-10 h-[70vh]'></Image>
      </div>
      {/* top search category */}
        <div>
          <JobsTopSearchCategory/>
        </div>
      {/* latest job openings */}
      <div>
         <LatestJobOpenings/>
      </div>
    </div>
  )
}

export default Jobs
