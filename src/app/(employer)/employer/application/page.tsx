"use client"
import React, { use, useContext, useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Delete, Eye, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { MyEmployerLogInContext } from '../../context/EmployerLogInContext'
interface JobType {
  _id: string,
  company: string,
  company_logo: string,
  email: string,
  jobtitle: string,
  phonenumber: number,

}
interface UserType {
  color: string,
  email: string,
  fullName: string,
  _id: string
}
interface ResumeType {
  Sr_No: number;
  job: JobType
  user: UserType
  createdAt: string,
  resume: string;
  status: string,
  _id: string,
  Delete: string;
}
function Application() {
  const router = useRouter();
  const [resumData, setResumeData] = useState<ResumeType[]>();
  const [totalpage, setTotalPage] = useState<any>(1);
  // 
  const [pagination, setPaganatation] = useState<any>(1)
  const { theme } = useTheme();
  const { employerData }: any = useContext(MyEmployerLogInContext);

  let limit: number = 4;
  const fetchApplicationData = async (page: any, employerId: string | null) => {
    const resume = (await axios.get("/api/employer/application/", { params:{ currentPage: page, limit: limit, employerId }})).data;
    setResumeData(resume?.data);
    setTotalPage(resume?.totalpage);
  }
  useEffect(() => {
     employerData&& fetchApplicationData(pagination, employerData?._id);
  }, [employerData,pagination]);
  const handlerStatus = async (text: any, id: any) => {
    // console.log(text,id);
    const send = (await axios.post("/api/employer/application/status", {status: text, id: id, employerId: employerData?._id  })).data;
    if (send) {
      setTimeout(() => {
        if(employerData)fetchApplicationData(pagination, employerData?._id);
      }, 100);
    }

  }
  const handlerDeleteItem = async (id: any) => {
    const send = (await axios.post("/api/employer/application/delete", { id })).data;
    console.log(send);
    if (send.status == 200) {
      setTimeout(() => {
      employerData&&  fetchApplicationData(pagination, employerData?._id);
      }, 100);
    }
  };
// console.log(employerData,"employer Data")

  return (
    <div>
      <div>
        <h1 className=' font-bold text-4xl text-center my-10 underline'> Application</h1>
      </div>
      <div className=' flex flex-col gap-4 min-h-screen overflow-hidden'>
        {/* table */}
        <div className=' overflow-x-scroll  '>
          <table border={2} className=' border-2'>
            <tr className={`${theme == "light" ? "bg-blue-400" : null}`}>
              <th className="border-2  p-2" > Sr.No</th>
              <th className="border-2  p-2" >Company name</th>
              <th className="border-2  p-2" >Job Title</th>
              <th className="border-2  p-2" >User Name</th>
              <th className="border-2  p-2" >User Email</th>
              <th className="border-2  p-2" >Mobile no.</th>
              <th className="border-2  p-2" >Resume</th>
              <th className="border-2  p-2" >status</th>
              <th className="border-2  p-2" >Delete</th>
            </tr>

            {
              resumData?.map((item: ResumeType, index: any) => {
                // console.log(item.status, "data of items");
                return (
                  <tr key={index} className={`${theme == "light" ? "bg-gray-300" : null} border-2  `}>

                    <td className=" border-2   p-2 ">{index + 1 + (pagination - 1) * limit}</td>
                    <td className=" border-2   p-2 ">{item?.job?.company}</td>
                    <td className=" border-2   p-2 ">{item?.job?.jobtitle}</td>
                    <td className=" border-2   p-2 ">{item?.user?.fullName}</td>
                    <td className=" border-2   p-2 ">{item?.user?.email}</td>
                    <td className=" border-2   p-2 ">{item?.job?.phonenumber}</td>
                    <td className=" border-2   p-2 "><Link href={item?.resume || "https://facebook.com"} target="_blank" className=' flex items-center justify-center' ><Eye /> </Link></td>
                    <td className=" border-2   p-2 ">{<div>
                      <RadioGroup onValueChange={(e) => {
                        // console.log('first',e);
                        handlerStatus(e, item._id);
                      }}
                        //  defaultValue={item.status}
                        value={item.status}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Applied" id="Applied" />
                          <Label htmlFor="Applied">Applied</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Hired" id="Hired" />
                          <Label htmlFor="Hired">Hired</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Rejected" id="Rejected" />
                          <Label htmlFor="Rejected">Rejected</Label>
                        </div>
                      </RadioGroup>
                    </div>}</td>
                    <td onClick={() => {
                      handlerDeleteItem(item._id);
                    }} className=" border-2   p-2  cursor-pointer text-blue-600 underline underline-offset-2">  <Trash2 /></td>

                  </tr>)
              })
            }

          </table>

        </div>
        {/* paganization */}
        <div className=''>
          <Pagination className=' flex justify-start items-start'>
            <PaginationContent key={pagination}>
              <PaginationItem >
                <PaginationPrevious href="#" onClick={() => {
                  if (pagination != 1) {
                    setPaganatation(pagination - 1)
                  }
                }} />
              </PaginationItem>
              {
                Array(totalpage).fill(null).map((item: any, index: any) => {
                  return (
                    <>
                      <PaginationItem key={index}>
                        <PaginationLink href="#" isActive={pagination == index + 1 ? true : false} onClick={() => {
                          setPaganatation(index + 1)
                        }}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>

                    </>



                  )
                })
              }
              <PaginationItem >
                <PaginationNext href="#" onClick={() => {
                  if (pagination !== totalpage) {
                    setPaganatation(pagination + 1)
                  }
                }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default Application

