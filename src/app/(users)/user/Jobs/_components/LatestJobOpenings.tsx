"use client"
import { Button } from '@/components/ui/button';
import { BookmarkIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { IconCalculatorFilled, IconTimeDuration60 } from '@tabler/icons-react';
import { Calendar, MapPin, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { use, useContext, useEffect, useState } from 'react';
import axios from "axios"
import { useRouter } from 'next/navigation';
import CountDownTimer from '../../components/CountDownTimer';
import { MyPopUpContext } from '../../context/PopUpClose';

export interface USERPOSTEDJOB {
    _id: string;
    fullName: string;
    color: string;
    email: string;
}

export interface USERPOSTEDJOBDETAILS {
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

function LatestJobOpenings() {
    const { theme } = useTheme();
    const [jobs, setJobs] = useState<USERPOSTEDJOBDETAILS[]>([]);
    const [page, setPage] = useState(1);
    const {seekerId}=useContext<any>(MyPopUpContext);
    const router = useRouter();

    const handlerShowMore = async () => {
       if(seekerId){
        setPage(prevPage => prevPage + 1);
        const received = (await axios.post("/api/user/jobs", { page: page + 1, limit: 3,id: seekerId})).data;
        setJobs(prevJobs => [...prevJobs, ...received.search]);
       }
    }

    const jobPostedByUser = async (id:any) => {
        const received = (await axios.get("/api/user/jobs",{params:{id}})).data;
        setJobs(received.data);
    }

    useEffect(() => {
         seekerId&&jobPostedByUser(seekerId);
    }, [seekerId]);

  
    return (
        <div>
            <div className={` p-4 ${theme == "light" ? "bg-[#e7eaec]" : ""}`}><h1 className='text-center text-4xl underline font-bold'>Latest Job Openings</h1></div>
            <div className='flex flex-wrap gap-10 justify-center items-center my-10 w-[100%] m-auto'>
                {
                    jobs?.map((item: USERPOSTEDJOBDETAILS, index: number) => {
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
                            <div key={index} className={`  ${theme === "light" ? "bg-white" : ""} flex relative  flex-row  items-center justify-between gap-2 w-full h-full border p-4`}>
                                <div className=' w-full flex flex-col   flex-wrap gap-2'>
                                    <div className='flex gap-2'>
                                        <h1 className='text-xl font-bold '>{item?.user?.fullName || "Bikram dhami"}</h1>
                                        <span className='flex items-center w-[50px] gap-1 justify-center border cursor-pointer rounded-lg p-1 text-sm bg-yellow-100  ml-1 text-yellow-400'>{Math.floor(item.rating)} <StarFilledIcon className=' size-4' /></span>
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
                                           <span className=' flex flex-wrap'><CountDownTimer targetDate={item.last_date} /></span>
                                    </div>
                                </div>
                                <div className='flex w-[30vw] flex-wrap  justify-center   items-center gap-2 '>
                                    <BookmarkIcon className='  size-10 w-[50px]' />
                                    <Button onClick={() => {
                                        router.push(`/user/jobdetail/${item._id}`);
                                    }} className=' size-10 w-[100px] bg-[#0625c7]'>
                                        Details
                                        {/* <Link href={`/user/jobdetail/${item._id}`} rel="noopener noreferrer">Details</Link> */}
                                    </Button>
                                    <Button onClick={() => {
                                        router.push(`/user/apply/${item._id}`);
                                    }} className=' size-10 w-[100px] bg-[#00c136]'>
                                        Apply
                                        {/* <Link href={"/user/jobs/apply"} rel="noopener noreferrer">Apply</Link> */}
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='cursor-pointer h-[2px] flex justify-center items-center w-full mb-10 bg-gray-400'>
                <div onClick={()=>{
                    handlerShowMore();
                }} className='w-[25%] md:h-[30px] lg:h-[30px] h-[45px] bg-gray-400 rounded-full text-center'>
                    <div className='text-sm text-center p-1'>Show more &darr;</div>
                </div>
            </div>
        </div>
    );
}

export default LatestJobOpenings;
