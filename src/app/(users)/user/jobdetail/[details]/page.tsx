"use client"

import { Button } from '@/components/ui/button';
import { IconCalendarTime, IconMail, IconMailCheck } from '@tabler/icons-react';
import { Bookmark, CalendarDays, Clock10, Clock7, DollarSign, Locate, Mail, MapPin, MessageSquare, Rocket } from 'lucide-react';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
interface USERPOSTEDJOB {
  _id: string;
  fullName: string;
  color: string;
  email: string;
}
interface USERPOSTEDJOBDETAILS {
  address: string;
  company: string;
  company_logo: string;
  country: string;
  createdAt: string;
  description: string;
  email: string;
  experience: string;
  industry: string;
  interestedEmploymentTypes: string;
  category: string;
  jobtitle: string;
  jobupload: string;
  last_date: string;
  no_of_office: number;
  no_of_workingemployee: number;
  no_vacancy: number;
  number_of_post: number | null;
  qualification: string;
  rating: number;
  salary: string;
  site: string;
  specialization_req: string;
  state: string;
  updatedAt: string;
  user: USERPOSTEDJOB;
  website_url: string;
  __v: number;
  _id: string;
}
// similarjobs
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import CountDownTimer from '../../components/CountDownTimer';
import { MyPopUpContext } from '../../context/PopUpClose';
function SingleJobDetails({ params }: any) {
  
  const [jobdetails, setJobDetails] = useState<USERPOSTEDJOBDETAILS | undefined>()
  const [OtherJobs, setOtherJobs] = useState<any>();
  const {seekerId}=useContext<any>(MyPopUpContext);
  const router=useRouter();
  const fetchJobDetailsData = () => {
    const send = axios.post(`/api/user/jobdetails`, { id: params.details,seekerId }).then(({ data }: any) => {
      setJobDetails(data.respondata)
      setTimeout(() => {
        fetchOtherJobOpening(data.respondata.jobtitle)
      }, 100);
    }).catch((error: any) => {
      console.log(error.message)
    })
  }
  const fetchOtherJobOpening = (jobtitle: string) => {
   if(seekerId){
    const send = axios.put(`/api/user/jobdetails`, { seekerId ,id: params.details,jobtitle }).then(({ data }: any) => {
      setOtherJobs(data.respondata)

    }).catch((error: any) => {
      console.log(error.message)
    })
   }
  }

  useEffect(() => {
   seekerId&& fetchJobDetailsData();

  }, [seekerId])
  const createdAt: any = jobdetails?.createdAt; // Assuming this is your createdAt time in UTC
  const createdAtDate = new Date(createdAt);
  const now = Date.now(); // Current timestamp in milliseconds

  // Calculate the difference in milliseconds
  const differenceMs = now - createdAtDate.getTime();

  // Function to convert milliseconds to a readable time ago format
  function formatTimeDifference(differenceMs: number): string {
    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }

  // Get the formatted time difference message
  const timeAgoMessage = formatTimeDifference(differenceMs);

  return (
    <div>
      <div className='flex flex-row flex-wrap justify-center items-start '>
        {/*  jobs short details */}
        <div className=' flex flex-col  justify-center items-center  gap-2 shadow-md border m-2 p-4 w-[100%] md:w-[19%] lg:w-[19%] '>
          <Image alt='images' src={jobdetails?.company_logo || ""} height={100} width={100} className='w-[200px] h-[200px] ' />
          <p>{jobdetails?.company}</p>
          <p>Industry - {jobdetails?.industry}</p>
          <p>No of Employees - {jobdetails?.no_of_workingemployee ? jobdetails?.no_of_workingemployee + "+" : "No data"} </p>
          <p>Overall Offices  - {jobdetails?.no_of_office}</p>

        </div>
        {/* middle part */}
        <div className=' p-6  flex flex-row flex-wrap lg:flex-nowrap md:flex-nowrap justify-between  items-start mt-2 gap-4 w-[100%] md:w-[60%] lg:w-[60%] shadow-md   '>

          <div className=' w-[100px]'>

            <Image alt="item image" src={jobdetails?.company_logo || ""} height={100} width={100} />
          </div>
          <div className='w-full '>
            <p>{jobdetails?.company}</p>
            <div className=' flex gap-4 '>
              <h1 >{jobdetails?.jobtitle} <Button className=' h-[28px] text-green-600 bg-green-200'>{jobdetails?.site}</Button></h1>
              <div className=' flex gap-2'><Bookmark className=' h-[30px]' /> <Button onClick={()=>{
                router.push(`/user/apply/${jobdetails?._id}`)
              }} className=' h-[30px] bg-green-600'>Apply</Button></div>
            </div>
            <div className=' flex items-center justify-between'>
              <p className=' flex gap-2 justify-center items-center'><MapPin />{jobdetails?.address}</p>
              <p className=' flex gap-2 justify-center items-center'><Clock10 />{jobdetails?.interestedEmploymentTypes}</p>
              <p className=' flex gap-2 justify-center items-center'><DollarSign />{jobdetails?.salary}</p>
              <p className=' flex gap-2 justify-center items-center'><IconCalendarTime />{timeAgoMessage}</p>
               <p>
                 <CountDownTimer targetDate={jobdetails?.last_date}/>
               </p>
            </div>
            <p>
              {jobdetails?.description}
            </p>
            {/* other jobs  */}
            <h1 className='text-3xl mt-6 font-extrabold'>
              <span className='underline decoration-blue-600'>Other job Openings</span>
            </h1>
            {/* item 1 and i have to setup for using map further backend working */}
            <div className=' flex flex-col flex-wrap  gap-4 mt-4'>
              {
              OtherJobs?  OtherJobs?.map((item: USERPOSTEDJOBDETAILS, index: number) => {
                  const createdAt: any = item?.createdAt; // Assuming this is your createdAt time in UTC
                  const createdAtDate = new Date(createdAt);
                  const now = Date.now(); // Current timestamp in milliseconds

                  // Calculate the difference in milliseconds
                  const differenceMs = now - createdAtDate.getTime();

                  // Function to convert milliseconds to a readable time ago format
                  function formatTimeDifference(differenceMs: number): string {
                    const seconds = Math.floor(differenceMs / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);

                    if (days > 0) {
                      return `${days} day${days !== 1 ? 's' : ''} ago`;
                    } else if (hours > 0) {
                      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
                    } else if (minutes > 0) {
                      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
                    } else {
                      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
                    }
                  }

                  // Get the formatted time difference message
                  const otheragomessage = formatTimeDifference(differenceMs);
                  return (
                    <div className=' flex  flex-col  gap-2 p-1 border-b-2 '>
                      <div className=' flex gap-4  '>
                        <h1 >{item?.jobtitle} <Button className=' h-[30px] text-green-600 bg-green-200'>{item.site}</Button></h1>
                      </div>
                      <div className=' flex items-center justify-between'>
                        <p className=' flex gap-2 justify-center items-center'><MapPin />{item.address}</p>
                        <p className=' flex gap-2 justify-center items-center'><Clock10 />{item.interestedEmploymentTypes}</p>
                        <p className=' flex gap-2 justify-center items-center'><DollarSign />{item.salary}</p>
                        <p className=' flex gap-2 justify-center items-center'><IconCalendarTime />{otheragomessage}</p>
                      </div>
                    </div>
                  )
                }):`No any data !!!`
              }
            </div>


          </div>
        </div>
        {/* last part */}
        <div className=' mt-2 flex flex-col flex-wrap w-full shadow-md border m-auto md:w-[19%] lg:w-[19%] justify-center items-start p-2'>
          <div className=' flex flex-col items-center justify-center mb-4  gap-4 border p-4'>
            <h1 className=' gap-3 text-xl font-bold'> 📧 Email me for jobs</h1>
            <p>Are you ready to take your career to the next level? Look no further than {jobdetails?.company} ! We are thrilled to announce several exciting job openings that could be the perfect fit for you.</p>
            <Input defaultValue={jobdetails?.email} placeholder=' Enter Email' />

            {/* <span className=' flex gap-2'>  <IconMail /> {jobdetails?.email}</span> */}
            <Button className=' w-full bg-red-400'>Subscribe</Button>

          </div>
          <div className=' flex flex-col items-center justify-center mb-4 border  p-4 '>
            <h1 className=' text-xl font-bold '>🚀 Get noticed faster</h1>
            <p>Are you ready to take your career to the next level? Look no further than {jobdetails?.company}! We are thrilled to announce several exciting job openings that could be the perfect fit for you.</p>

            <Button disabled className=' w-full bg-green-600'>Upload your resume</Button>
          </div>
          <div className=' flex flex-col items-center justify-center mb-4 border  p-4 '>
            <h1 className=' text-xl font-bold '>😎 Freelance gigs</h1>
            <p>Are you ready to take your career to the next level? Look no further than {jobdetails?.company}! We are thrilled to announce several exciting job openings that could be the perfect fit for you.</p>

            <Button className=' w-full bg-green-600'>Visit Freelance site</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleJobDetails