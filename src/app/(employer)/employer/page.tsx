"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ResponChart } from './components/ResponChart';
import Image from 'next/image';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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


function EDashboard() {
  const [totaldata, setTotalData] = useState<any>()


  const dataSummary = [
    {
      name: "Job Posts",
      number: "2,456",
      emoji: "",
    },
    {
      name: "Total Application",
      number: totaldata?.totaljob || null,
      emoji: "💼"
    },
    {
      name: "No of Meetings",
      number: totaldata?.totalAppliedjob || 0,
      emoji: "📄"
    },
    {
      name: "No of Hirings",
      number: totaldata?.totalContactuser || 0,
      emoji: "📞"
    }
  ];


const handlerGetEmployerDetails=async(id:any)=>{
  const data=(await axios.get("/api/employer",{
    params:{
      id:id,
    }
  })).data;
  
}
  useEffect(() => {
    if(typeof window!=="undefined"){
     const id= localStorage.getItem("employerId");
       handlerGetEmployerDetails(id);
    }
  }, [])

  const invoices = [
    {
    
      jobtitle: "UI UX Designer",
      position_level: "Full Time",
      openings: "12",
      application: "135",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      status: "Active",
    },
    {
      
      jobtitle: "Software Engineer",
      position_level: "Part Time",
      openings: "5",
      application: "80",
      paymentStatus: "Pending",
      paymentMethod: "PayPal",
      status: "Active",
    },
    {
      
      jobtitle: "Data Analyst",
      position_level: "Contract",
      openings: "8",
      application: "110",
      paymentStatus: "Overdue",
      paymentMethod: "Bank Transfer",
      status: "Inactive",
    },
    {
      
      jobtitle: "Project Manager",
      position_level: "Full Time",
      openings: "3",
      application: "50",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      status: "Active",
    },
    {
     
      jobtitle: "Graphic Designer",
      position_level: "Freelance",
      openings: "10",
      application: "70",
      paymentStatus: "Pending",
      paymentMethod: "PayPal",
      status: "Active",
    },
  ];
  return (
    <div className=' p-4'>
      {/* welcome section */}
      <div className='  flex border p-4 rounded-md justify-between  gap-4'>
        <div className=' '>
          <div className=' w-full text-3xl tracking-wider'>Welcom To <span className=' font-bold'>Job</span> <span className=' font-bold'>मिल्यो ?</span></div>
          <h1 className=' font-bold italic  text-2xl mt-2'>K_DBMS Teams</h1>
        </div>
        <div>
          <Image src={"/employer/employer.jpg"} width={100} height={100} alt='image' className=' w-full h-full'></Image>
        </div>
      </div>
      {/* box part */}
      <div className=' flex flex-wrap  justify-around m-4 gap-6'>
        {
          dataSummary.map((item: any, index: any) => {
            return (<div key={index} className=' cursor-pointer hover:shadow-md lg:w-[20%] sm:w-[40%] font-bold border rounded-xl px-4 py-1'>
              <h1 className=' text-xl italic '>{item.name}</h1>
              <span className=' text-4xl my-2 mx-4'>{item.emoji}</span>
              <span>{item.number}</span>
            </div>)
          })
        }

      </div>
      {/* main part */}
      <div className=' grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {/* Application Respone chart */}
        <div>
          <ResponChart />
        </div>
        {/* Recent Job Posts */}
        <div className=' border p-1 rounded-md'>
          <Tabs defaultValue="today" className="w-full   relative">
            <TabsList className=" text-end  absolute right-2 top-2  items-end">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
            </TabsList>

            <TabsContent className=' ' value="monthly">
              <Card className=' border-none'>
                <CardHeader>
                  <CardTitle>Recent Job Posts</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Job Title</TableHead>
                        <TableHead>Position Level</TableHead>
                        <TableHead>Opening</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {invoices.map((invoice,index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{invoice?.jobtitle}</TableCell>
                          <TableCell>{invoice?.position_level}</TableCell>
                          <TableCell>{invoice?.openings}</TableCell>
                          <TableCell>{invoice?.application}</TableCell>
                          <TableCell className="text-right">
                            <Button>{invoice?.status}</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      {/* <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                      </TableRow> */}
                    </TableFooter>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter> */}
              </Card>
            </TabsContent>

            <TabsContent className=' ' value="weekly">
              <Card className=' border-none'>
                <CardHeader>
                  <CardTitle>Recent Job Posts</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Job Title</TableHead>
                        <TableHead>Position Level</TableHead>
                        <TableHead>Opening</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {invoices.map((invoice,index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{invoice?.jobtitle}</TableCell>
                          <TableCell>{invoice?.position_level}</TableCell>
                          <TableCell>{invoice?.openings}</TableCell>
                          <TableCell>{invoice?.application}</TableCell>
                          <TableCell className="text-right">
                            <Button>{invoice?.status}</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      {/* <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                      </TableRow> */}
                    </TableFooter>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter> */}
              </Card>
            </TabsContent>

            <TabsContent className=' ' value="today">
              <Card className=' border-none'>
                <CardHeader>
                  <CardTitle>Recent Job Posts</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Job Title</TableHead>
                        <TableHead>Position Level</TableHead>
                        <TableHead>Opening</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {invoices.map((invoice,index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{invoice?.jobtitle}</TableCell>
                          <TableCell>{invoice?.position_level}</TableCell>
                          <TableCell>{invoice?.openings}</TableCell>
                          <TableCell>{invoice?.application}</TableCell>
                          <TableCell className="text-right">
                            <Button>{invoice?.status}</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      {/* <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                      </TableRow> */}
                    </TableFooter>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter> */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  )
}

export default EDashboard
