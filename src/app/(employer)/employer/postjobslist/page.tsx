"use client"
import { Button } from '@/components/ui/button'
import { IconTimeDuration60 } from '@tabler/icons-react'
import axios from 'axios'
import { BookmarkIcon, Calendar, Delete, DeleteIcon, Edit, MapPin } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import CountDownTimer from '@/app/(users)/user/components/CountDownTimer'
import { MyEmployerLogInContext } from '../../context/EmployerLogInContext'

function UserPostJobLists() {
 
  interface JobsType {
    address: String,
    category: String,
    company: String,
    company_logo: String,
    country: String,
    createdAt: Date,
    description: String
    email: String,
    experience: String
    industry: String,
    interestedEmploymentTypes: String,
    jobtitle: String,
    jobupload: Date,
    last_date: Date,
    no_of_office: Number,
    no_of_workingemployee: Number,
    no_vacancy: Number,
    number_of_post: Number,
    qualification: String,
    rating: Number,
    salary: String,
    site: String,
    specialization_req: String,
    state: String,
    updatedAt: Date,
    user: String,
    website_url: String,
    __v: Number,
    _id: String,
  
  }

  const {theme}=useTheme();
  const router=useRouter();
  const [userPost,setUserPost]=useState<any>();
  const [jobslist, setJobList] = useState<any>();
  const {employerData}=useContext(MyEmployerLogInContext);
  const HandlerUserPostedJob = async () => {
    const userposted = (await axios.get("/api/employer/postlist",{params:{id:employerData?._id}})).data;
    setJobList(userposted?.data);
    setUserPost(userposted?.user);
  }
 
  useEffect(() => {
    employerData&&HandlerUserPostedJob();
  }, [employerData])
  const handlerDeletePostedJobbyUser=async(itemId:any)=>{

    try {
      // Assuming you have an API route to update the job information
      const response = await fetch(`/api/employer/postlist?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Job delete successfully');
         setTimeout(() => {
          HandlerUserPostedJob();
         }, 100);
         } else {
        alert('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  }
  return (
    <div>

      {
          jobslist?.map((item: JobsType, index: number) => {
            // Example data
            const createdAt = item.createdAt; // Assuming this is your createdAt time in UTC
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
                <div key={index} className={`  ${theme === "light" ? "bg-white" : ""} flex relative  flex-row  items-center justify-between gap-2 w-full h-full border p-4 mb-4 shadow-md `}>
                    <div className=' w-full flex flex-col   flex-wrap gap-2'>
                        <div className='flex gap-2'>
                            <h1 className='text-2xl font-bold '> Posted by <span className=' text-blue-600 font-bold text-2xl  underline'>{userPost?.fullName || "admin "}</span></h1>
                            {/* <span className='flex items-center w-[50px] gap-1 justify-center border cursor-pointer rounded-lg p-1 text-sm bg-yellow-100  ml-1 text-yellow-400'>{Math.floor(item.rating)} <StarFilledIcon className=' size-4' /></span> */}
                        </div>
                        <div className=' flex-wrap flex gap-2'>
                            <h1 className='text-lg font-semibold'>{item.category}</h1>
                            <span className=' bg-green-100 text-green-600 p-1 border rounded-lg text-sm'>{item.site.toLocaleLowerCase() ? 'remote' : 'on-site'}</span>
                        </div>
                        {/*  location and book mark */}
                        <div className=' flex-wrap  flex justify-between w-full items-center gap-5'>
                            <span className='flex items-center'><MapPin className='mr-1' /> {item.address}</span>
                            <span className='flex items-center'><IconTimeDuration60 className='mr-1' /> {item.interestedEmploymentTypes}</span>
                            <span> ${item.salary}</span>
                            <span className='flex items-center'><Calendar className='mr-1' />{timeAgoMessage}</span>
                            <span><CountDownTimer targetDate={item.last_date} /></span>
                        </div>
                    </div>
                    <div className='flex w-[30vw] flex-wrap  justify-center   items-center gap-2 '>
                      <Button className='w-[100px] bg-blue-600 flex gap-2 ' onClick={()=>{
                        router.push(`/employer/postjobslist/${item._id}`)
                      }}><Edit/> Edit</Button>
                       <Button className='w-[100px] bg-blue-600 flex gap-2 ' onClick={()=>{
                         const con=confirm("Are you sure delete this item ?");
                         if(con){
                            handlerDeletePostedJobbyUser(item._id);
                         }
                      }}><DeleteIcon/> Delete</Button>
                     
                    </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default UserPostJobLists