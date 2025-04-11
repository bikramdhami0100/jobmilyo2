"use client"

import React, { useEffect, useState } from 'react'
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

  const invoices = [
    { jobtitle: "UI UX Designer", position_level: "Full Time", openings: "12", application: "135", status: "Active" },
    { jobtitle: "Software Engineer", position_level: "Part Time", openings: "5", application: "80", status: "Active" },
    { jobtitle: "Data Analyst", position_level: "Contract", openings: "8", application: "110", status: "Inactive" },
    { jobtitle: "Project Manager", position_level: "Full Time", openings: "3", application: "50", status: "Active" },
    { jobtitle: "Graphic Designer", position_level: "Freelance", openings: "10", application: "70", status: "Active" }
  ];

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
                  <TableHead>Applications</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{job.jobtitle}</TableCell>
                    <TableCell>{job.position_level}</TableCell>
                    <TableCell>{job.openings}</TableCell>
                    <TableCell>{job.application}</TableCell>
                    <TableCell className='text-right'>
                      <Button>{job.status}</Button>
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
