"use client"
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function JobsTopSearchCategory() {
    const router = useRouter();
    const [selectsubpart, setSelectedSubpart] = useState("");
    const JobsItems = [
        {
            name: "WEB DEVELOPMENT",
            image: "/images/jobsimages/webdevelopment.jpg",
            subparts: [
                "Front-End Development",
                "Back-End Development",
                "Full-Stack Development",
                "Web Design",
                "Web Performance Optimization"
            ]
        },
        {
            name: "QUALITY ASSURANCE ENGINEER",
            image: "/images/jobsimages/qualityassuranceengineer.jpg",
            subparts: [
                "Manual Testing",
                "Automated Testing",
                "Performance Testing",
                "Security Testing",
                "User Acceptance Testing"
            ]
        },
        {
            name: "SOFTWARE INTEGRATION ENGINEER",
            image: "/images/jobsimages/softwareintegrationengineer.jpg",
            subparts: [
                "System Integration",
                "Continuous Integration (CI)",
                "API Integration",
                "Middleware Development",
                "Deployment Automation"
            ]
        },
        {
            name: "DATA SCIENCE",
            image: "/images/jobsimages/datascience.jpg",
            subparts: [
                "Data Analysis",
                "Machine Learning",
                "Data Visualization",
                "Statistical Modeling",
                "Big Data Technologies"
            ]
        },
        {
            name: "CONTENT CREATORS",
            image: "/images/jobsimages/contactcreators.jpg",
            subparts: [
                "Blog Writing",
                "Video Production",
                "Graphic Design",
                "Social Media Management",
                "Podcasting"
            ]
        },
        {
            name: "PROJECT MANAGEMENT",
            image: "/images/jobsimages/programmanagement.jpg",
            subparts: [
                "Agile Project Management",
                "Waterfall Project Management",
                "Risk Management",
                "Budget Management",
                "Team Leadership"
            ]
        },
        {
            name: "VIDEO EDITING",
            image: "/images/jobsimages/videoediting.jpg",
            subparts: [
                "Cutting and Trimming",
                "Color Grading",
                "Audio Editing",
                "Visual Effects",
                "Motion Graphics"
            ]
        },
        {
            name: "DIGITAL MARKETING",
            image: "/images/jobsimages/digitalmarketing.jpg",
            subparts: [
                "SEO (Search Engine Optimization)",
                "Content Marketing",
                "Social Media Marketing",
                "Email Marketing",
                "Pay-Per-Click (PPC) Advertising"
            ]
        }
    ];

    const { theme }: any = useTheme();
    return (

        <div>
            <div className={` rounded-lg p-4 ${theme == "light" ? "bg-[#e7eaec]" : ""}`}> <h1 className=' text-center text-4xl underline font-bold  '> Top Search Category</h1></div>
            <div className=' flex flex-wrap gap-10 justify-center items-center my-10 w-[90%] m-auto'>
                {
                    JobsItems.map((item, index) => {
                        return (
                            <div>

                                <Dialog >
                                    <DialogTrigger asChild>
                                        <Button className=' w-[200px]  h-[200px]' variant="link">

                                            <div className=' cursor-pointer border w-[200px]  shadow-sm  hover:shadow-lg ring-2 ring-gray-400 rounded-md' key={index}>
                                                <Image className=' w-[200px] h-[200px] ' alt='image' src={item.image} width={200} height={100}></Image>

                                            </div>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className=" dark:text-black bg-white s">
                                        <DialogHeader>
                                            <DialogTitle className=' underline  '>{item.name}</DialogTitle>
                                          
                                        </DialogHeader>
                                        <div>
                                           {
                                            item.subparts.map((item:string,index:number)=>{
                                                return(
                                                    <>
                                                     <ol className=' m-1  cursor-pointer  hover:text-blue-800' onClick={()=>{
                                                        router.push(`/user/search/${item.toLowerCase()}`)
                                                     }} >
                                                        {index+1}. {item}
                                                     </ol>
                                    
                                                    </>
                                                )
                                            })
                                           }
                                        </div>
                                        
                                        
                                    </DialogContent>
                                </Dialog>

                            </div>
                        )
                    })
                }
            </div>
            <div className={` cursor-pointer h-[2px]  flex justify-center items-center  w-[100%] mb-10 bg-gray-400`}>
                <div className=' w-[25%] h-[30px] bg-gray-400 rounded-full text-center '> <div className=' text-sm text-center p-1'>Show more &darr;</div></div>
            </div>
        </div>
    )
}

export default JobsTopSearchCategory