"use client"

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ResponChart } from '../components/ResponChart';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Users, CheckCircle } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { MyEmployerLogInContext } from '../../context/EmployerLogInContext';

interface SectionFirstDash {
  numberOfHirings: number,
  numberOfMeetings: number,
  totalApplication: number,
  totalPostJob: string,
  numberOfRejected: number,
  results: {
    color: string,
    email: string,
    fullName: string,
    userType: string,
    _id: string
  }
}

interface DataSummary {
  name: string,
  number: number | undefined | string,
  icon: React.ReactNode,
}

function EDashboard() {
  const [totaldata, setTotalData] = useState<SectionFirstDash>()
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

  const [jobslist, setJobList] = useState<any>();
  const {employerData}=useContext(MyEmployerLogInContext);
  const HandlerUserPostedJob = async () => {
    const userposted = (await axios.get("/api/employer/postlist",{params:{id:employerData?._id}})).data;
    setJobList(userposted?.data);
   
  }
 
  useEffect(() => {
    employerData&&HandlerUserPostedJob();
  }, [employerData])

  const dataSummary: DataSummary[] = [
    {
      name: "Job Posts",
      number: totaldata?.totalPostJob,
      icon: <Briefcase className="h-8 w-8 text-blue-600" />
    },
    {
      name: "Total Applications",
      number: totaldata?.totalApplication,
      icon: <FileText className="h-8 w-8 text-purple-600" />
    },
    {
      name: "Meetings",
      number: totaldata?.numberOfMeetings || 0,
      icon: <Users className="h-8 w-8 text-orange-600" />
    },
    {
      name: "Hirings",
      number: totaldata?.numberOfHirings || 0,
      icon: <CheckCircle className="h-8 w-8 text-green-600" />
    }
  ];

  const handlerGetEmployerDetails = async (id: any) => {
    const data = (await axios.get("/api/employer", {
      params: { id: id }
    })).data;
    setTotalData(data);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("employerId");
      handlerGetEmployerDetails(id);
    }
  }, [])



  return (
    <div className='p-4'>
      {/* Welcome section */}
      <div className='flex justify-between items-center border p-6 rounded-xl shadow-md bg-gradient-to-r '>
        <div>
          <h1 className='text-4xl font-bold tracking-wide'>Welcome to <span className='text-blue-600'>Job</span> <span className='text-green-600'>मिल्यो?</span></h1>
          <p className='mt-2 text-xl italic font-semibold text-gray-600'>K_DBMS Teams</p>
        </div>
      </div>

      {/* Summary Boxes */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
        {dataSummary.map((item, index) => (
          <motion.div
            key={index}
            className=' cursor-pointer border rounded-2xl p-5 shadow hover:shadow-xl transition duration-300 flex flex-col items-start gap-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className=''>{item.icon}</div>
            <h2 className='text-lg font-semibold'>{item.name}</h2>
            <span className='text-2xl font-bold text-gray-800'>{item.number}</span>
          </motion.div>
        ))}
      </div>

      {/* Chart and Job Posts */}
      <div className='grid md:grid-cols-2 gap-6 mt-10'>
        <ResponChart
          numberOfHirings={totaldata?.numberOfHirings || 0}
          numberOfRejected={totaldata?.numberOfRejected || 0}
          totalApplication={totaldata?.totalApplication || 0}
        />

        <Card>
          <CardHeader>
            <CardTitle>Recent Job Posts</CardTitle>
            <CardDescription>Here are your latest job listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Openings</TableHead>
                  <TableHead>Last Date</TableHead>
                  <TableHead className="text-right">Number of Vacancy
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobslist?.map((job:JobsType, index:number) => (
                  <TableRow key={index}>
                    <TableCell>{job.jobtitle}</TableCell>
                    <TableCell>{job.site}</TableCell>
                    <TableCell>{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(job?.last_date).toLocaleDateString()}</TableCell>
                    <TableCell className='text-right'>
                      {job?.no_vacancy.toString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EDashboard;
