"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MyPopUpContext } from '../../context/PopUpClose';

function TotalApplyJobByUser() {
  interface Job {
    _id: string;
    company: string;
    company_logo: string;
    jobtitle: string;
    description: string;
    qualification: string;
    last_date: string; // Using string to represent ISO date string
  }

  interface JobApplication {
    applicationDate: string; // Using string to represent ISO date string
    createdAt: string; // Using string to represent ISO date string
    job: Job;
    resume: string;
    status: string;
    updatedAt: string; // Using string to represent ISO date string
    user: string;
    __v: number;
    _id: string;
  }

  const [applyjobList, setApplyJobList] = useState<JobApplication[]>([]);
  const {seekerId}=useContext<any>(MyPopUpContext);
  const totalJobApply = async () => {
      if(seekerId){
        // console.log(seekerId,"inside")
        const send = (await axios.get("/api/user/apply",{params:{id:seekerId}})).data;
        // console.log(send)
        if (send.status == 200) {
          setApplyJobList(send.data)
        }
      }

  }
 
  useEffect(() => {
   seekerId&& totalJobApply();
  }, [seekerId])

  // console.log(applyjobList)
 const HandlerCancelApplyJob=async(id:any)=>{
  if(seekerId){
    const send = (await axios.delete("/api/user/apply",{params:{id,seekerId}})).data;
    if(send.status==200){
      setTimeout(() => {
        totalJobApply();
      }, 100);
    }
  }
 }
  return (
    <div className="container mx-auto p-4 mt-10">
      {applyjobList.length >= 1 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {applyjobList.map((item: JobApplication, index: number) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              
              <div className="flex items-center">
                <Image alt="company logo" src={item.job?.company_logo} height={50} width={50} className="rounded-full" />
                <div className="ml-4">
                  {/* <p className={`text-lg font-semibold ${item.status === "Applied" ? " text-blue-600" : ""}`}>{item.status}</p> */}
                  <p
                    className={`text-lg font-semibold 
                       ${item.status === "Applied" ? "text-yellow-600" : ""}
                       ${item.status === "Hired" ? "text-green-600" : ""}
                       ${item.status === "Rejected" ? "text-red-600" : ""}
                       ${item.status === "Pending" ? "text-yellow-600" : ""}
                       ${item.status === "Interview" ? "text-purple-600" : ""}
                      `}
                  >
                    {item.status === "Applied" ? "Pending" : item.status}
                  </p>

                  <p className="text-sm text-gray-500">{ item?.job?.company}</p>
                </div>
              </div>
              <p className="mt-2 text-xl font-bold">{item?.job?.jobtitle}</p>
             <div className=' flex justify-between'>
             <Link href={item.resume || "https://examples.com"} target="_blank" className="text-blue-500 hover:underline mt-2 block">View Resume</Link>
             <Button onClick={()=>{
               HandlerCancelApplyJob(item._id);
             }} className=' bg-red-400 ' >Delete</Button>
             </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          {/* <Image className="bg-transparent rounded-[100px] shadow-md h-[200px] w-[200px] " alt="No job applications" src="/applynow.jpg" height={100} width={100} /> */}
          <p className="mt-4 text-lg text-gray-600">You have not applied for any jobs yet. Start applying now!</p>
        </div>
      )}
    </div>
  )
}

export default TotalApplyJobByUser
