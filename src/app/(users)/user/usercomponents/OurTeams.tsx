"use client"

import { CircleCheckBig, Facebook, Link2, Star, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { IconCircleCheckFilled } from '@tabler/icons-react'

export interface ourTeamType {
    name: string,
    image: string,
    contribute: string,
    flink: string,
    tlink: string,
    llink: string,
    rating: number
}

function OurTeams() {
    const initialTeamData: ourTeamType[] = [
        {
            name: "Deepa joshi",
            image: "/images/teams/deepa.jpg",
            contribute: "UI/UX Designer",
            flink: "https://www.facebook.com/profile.php?id=100025886561101",
            tlink: "https://www.twitter.com/deepa",
            llink: "https://www.linkedin.com/deepa",
            rating: 5
        },
        {
            name: "Kalpana bhandari",
            image: "/images/teams/kalpana.jpg",
            contribute: "Frontend Developer",
            flink: "https://www.facebook.com/profile.php?id=100071784674406",
            tlink: "https://www.twitter.com/bikram_dhami",
            llink: "https://www.linkedin.com/bikram_dhami",
            rating: 5
        },
        {
            name: "Saraswati",
            image: "/images/teams/saru.jpg",
            contribute: "Graphical Designer",
            flink: "https://www.facebook.com/sarswati.paneru.5",
            tlink: "https://www.twitter.com/saraswati",
            llink: "https://www.linkedin.com/saraswati",
            rating: 5
        },
        {
            name: "Menuka Bhatt",
            image: "/images/teams/menuks.jpg",
            contribute: "Frontend Developer",
            flink: "https://www.facebook.com/menukabhatt01",
            tlink: "https://www.twitter.com/menuka_kalpana",
            llink: "https://www.linkedin.com/menuka_kalpana",
            rating: 5
        },
        {
            name: "Bikram Dhami",
            image: "/images/teams/bikram.jpg",
            contribute: "Backend Developer",
            flink: "https://www.facebook.com/profile.php?id=61553832104490",
            tlink: "https://www.twitter.com/bikram_dhami",
            llink: "https://www.linkedin.com/bikram_dhami",
            rating: 5
        }
    ]

    const [teamData, setTeamData] = useState<ourTeamType[]>(initialTeamData)

    const handleRatingChange = (index: number, value: number) => {
        const updatedTeamData = teamData.map((member, i) => 
            i === index ? { ...member, rating: value } : member
        )
        setTeamData(updatedTeamData)
    }

    return (
        <div>
            <hr className='shadow-lg border w-full'></hr>
            <div className="flex flex-col justify-center items-center flex-wrap m-auto gap-3 w-[90%] mt-4 mb-4">
                <h1 className='font-extrabold text-4xl underline text-blue-600'>Meet our Team</h1>
                <div>
                    <p>
                        The "Meet Our Team" section highlights the talented individuals behind the Job Milyo website. Deepa, our UI/UX Designer, ensures an intuitive user experience. Menuka and Kalpana, our Frontend Developers, create responsive and visually appealing web pages. Saraswati, our Graphical Designer, adds creative flair with stunning graphics. Bikram Dhami, our Backend Developer, keeps everything running smoothly behind the scenes. Together, our team is dedicated to delivering an exceptional user experience for job seekers.
                    </p>
                </div>
            </div>
            <div className='flex border flex-row flex-wrap gap-4 justify-center items-center p-2'>
                {
                    teamData.map((item, index) => (
                        <div key={index} className='flex flex-col hover:shadow-xl shadow-md border w-[300px] justify-center items-center h-[300px] gap-1'>
                            <div>
                                <Image src={item.image} alt='our team' width={100} height={100} className='rounded-full h-[100px] w-[100px]' />
                            </div>
                            <div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <p>{item.name}</p>
                                    <IconCircleCheckFilled className=' text-blue-700' />
                                </div>
                                <div className='flex gap-2 flex-row justify-center items-center'>
                                    <div className='flex h-[18px]'>
                                        <Rating 
                                            style={{ maxWidth: 120 }} 
                                            value={item.rating} 
                                            onChange={(value:any) => handleRatingChange(index, value)} 
                                        />
                                    </div>
                                    {item.rating}
                                </div>
                                <p className='self-center text-center'>{item.contribute}</p>
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center mt-3'>
                                <Link href={item.flink} className='rounded-full h-[40px] self-center p-[6px] m-auto w-[40px] text-center shadow-md border hover:shadow-2xl hover:border'> <Image src={"/images/social/facebook.png"} alt='image' width={40} height={40} /> </Link>
                                <Link href={item.tlink} className='rounded-full h-[40px] self-center p-[6px] m-auto w-[40px] text-center shadow-md border hover:shadow-2xl hover:border'> <Image src={"/images/social/twitter.png"} alt='image' width={40} height={40} /> </Link>
                                <Link href={item.llink} className='rounded-full h-[40px] self-center p-[6px] m-auto w-[40px] text-center shadow-md border hover:shadow-2xl hover:border'> <Image src={"/images/social/linkedin.png"} alt='image' width={40} height={40} /> </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OurTeams
