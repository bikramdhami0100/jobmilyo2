"use client"

import { Button } from '@/components/ui/button';
import { IconCalendarTime, IconMail, IconMailCheck } from '@tabler/icons-react';
import { Bookmark, CalendarDays, Clock10, Clock7, DollarSign, Loader, Locate, Mail, MapPin, MessageSquare, PlusSquare, Rocket } from 'lucide-react';
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
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
import { Label } from '@/components/ui/label';
import { CldUploadButton } from 'next-cloudinary';
import { toast } from '@/components/ui/use-toast';
import { Toast } from '@/components/ui/toast';
import CountDownTimer from '../../components/CountDownTimer';
function ApplyForJob({ params }: any) {

  const [jobdetails, setJobDetails] = useState<USERPOSTEDJOBDETAILS | undefined>()
  const [applyloader,setApplyLoader] = useState<any>()
  
  const [resume, setResume] = useState<any>();
  const [loadresume, setloadresume] = useState<boolean>(false)
  const fetchJobDetailsData = () => {
    const send = axios.post(`/api/postjob/jobdetails`, { id: params.jobs }).then(({ data }: any) => {
      setJobDetails(data.respondata)
    }).catch((error: any) => {
      console.log(error.message)
    })
  }


  useEffect(() => {
    fetchJobDetailsData();
  }, [])
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
  const uploadResume = (result: any) => {

    // setmarksheet(result.info.secure_url);
    setResume(
      result.info.secure_url
    )
    if (result.info.secure_url) {
      setloadresume(true);
      toast({
        title: "Upload successfully ",
        description: "Marksheet upload successfully ",
      })
    }
    // Handle successful upload, e.g., save the URL to state
  };
  // Get the formatted time difference message
  const timeAgoMessage = formatTimeDifference(differenceMs);
  const handlerJobApply=async()=>{
    setApplyLoader(true)
 const send=(await axios.post("/api/apply",{jobId:params.jobs,resume:resume})).data
  console.log(send);
  setApplyLoader(false);
  if(send.status===200){
    toast({title:"Apply successfully",className:"bg-white text-black border-green-600 border-[2px]"})
  }
  }
  return (
    <div>
      <div className='flex  flex-wrap gap-4 justify-center'>
        {/*  jobs short details */}
        <div className=' flex flex-col  justify-center items-center  gap-2 shadow-md border m-2 p-4 w-[100%] md:w-[20%] lg:w-[20%] '>
          <Image alt='images' src={jobdetails?.company_logo || ""} height={100} width={100} className='w-[200px] h-[200px] ' />
          <p>{jobdetails?.company}</p>
          <p>Industry - {jobdetails?.industry}</p>
          <p>No of Employees - {jobdetails?.no_of_workingemployee ? jobdetails?.no_of_workingemployee + "+" : "No data"} </p>
          <p>Overall Offices  - {jobdetails?.no_of_office}</p>

        </div>
        {/* middle part */}
        <div className=' p-6  flex flex-row flex-wrap lg:flex-nowrap md:flex-nowrap justify-between  items-start mt-2 gap-4 w-[100%] md:w-[40%] lg:w-[40%]  shadow-md   '>

          <div className=' w-[100px]'>

            <Image alt="item image" src={jobdetails?.company_logo || ""} height={100} width={100} />
          </div>
          <div className='w-full '>
            <p>{jobdetails?.company}</p>
            <div className=' flex gap-4 '>
              <h1 >{jobdetails?.jobtitle} <Button className=' h-[28px] text-green-600 bg-green-200'>{jobdetails?.site}</Button></h1>
              {/* <div className=' flex gap-2'><Bookmark className=' h-[30px]' /> <Button className=' h-[30px] bg-green-600'>Apply</Button></div> */}
            </div>
            <div className=' flex items-center justify-between'>
              <p className=' flex gap-2 justify-center items-center'><MapPin />{jobdetails?.address}</p>
              <p className=' flex gap-2 justify-center items-center'><Clock10 />{jobdetails?.interestedEmploymentTypes}</p>
              <p className=' flex gap-2 justify-center items-center'><DollarSign />{jobdetails?.salary}</p>
              <p className=' flex gap-2 justify-center items-center'><IconCalendarTime />{timeAgoMessage}</p>
              <p><CountDownTimer  targetDate={jobdetails?.last_date}/></p>
            </div>
            <p>
              {jobdetails?.description}
            </p>




          </div>
        </div>
        <div>
          {/* form submit for apply */}
          <div className="grid w-[100%] max-w-sm items-center gap-1.5">
            <Label htmlFor="picture" className=' text-2xl font-semibold underline' >Your resume</Label>
            <CldUploadButton
              className=' w-full text-left border-2 p-1 rounded-md '
              onSuccess={uploadResume}
              uploadPreset="wyyzhuyo"
            />
            {
              loadresume ? <p className=' text-green-600 text-left'>upload successfully</p> : <p className=' text-red-700 text-left '>please upload your resume (.jpg/.png) </p>
            }
          </div>
          <div>
            <h1>Create Resume (implement in upcoming project)</h1>
            <div className=' border w-full h-[150px] items-center text-center flex justify-center'>
              <PlusSquare />

            </div>
          </div>
          <Button onClick={()=>{
            handlerJobApply()
          }} className=' bg-blue-600 w-full  mt-4'>
          {applyloader&&<Loader className=' mr-2 animate-spin'/>}   Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApplyForJob
