import Image from 'next/image'
import React from 'react'

function AboutExpert() {
    return (
        <div className='flex flex-col gap-1 mt-6'>
            <h1 className=' font-extrabold text-4xl text-center text-blue-600 underline decoration-clone'>Our Experties</h1>
            <div className=' flex flex-wrap flex-col  md:flex-row lg:flex-row '>
                
                <div className=' flex  flex-col  p-3 m-auto w-[98%] md:w-[45%] lg:w-[45%]'>
                    <p>Our job portal website offers a comprehensive solution for both job seekers and employers alike. With a user-friendly interface and advanced search functionality, users can effortlessly navigate through job listings and find the perfect opportunity or candidate. Our platform prioritizes security and privacy, ensuring a safe environment for job posting and application management. Additionally, our personalized recommendation system and interactive features enhance user engagement and streamline the recruitment process. Whether you're a job seeker looking for your next career move or an employer seeking top talent, our job portal provides the tools and resources needed to succeed in today's competitive job market.</p>
                    <h1>Our Job Portal Website</h1>
                    <ol>
                        <li>
                            User-Friendly Interface
                        </li>
                        <li>
                        Advanced Search Functionality
                        </li>
                        <li>Responsive Design</li>
                        <li>Secure Job Posting</li>
                        <li>Personalized Recommendations</li>
                        <li>Interactive Features</li>
                        <li>Comprehensive Candidate Profiles</li>
                        <li>Analytics and Insights</li>
                    </ol>
                </div>
                <div className='flex w-[98%] h-[460px] m-auto md:w-[45%] lg:w-[45%] p-2'>
                  <Image src={"/images/herothree.jpg"}  alt='one image' width={400} height={400} className=' w-full h-full sm:object-fill object-cover rounded-md shadow-md  '/>
                </div>

            </div>
        </div>
    )
}

export default AboutExpert
