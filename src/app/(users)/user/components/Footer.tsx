"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Mail, MapPinned, Phone, Twitter, Youtube } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
export interface SocialIconType{
name:string,
image:string,
link:string
}
function Footer() {
    const router=useRouter()
    const date = new Date();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const setbgfooter = theme == "light" ? "text-[rgb(255,255,255)]  h-full bg-[rgb(43,57,64)]" : "";
    const socialItem=[
        {
            name:"twitter",
            image:"/images/social/twitter.png",
            link:"https://www.twitter.com"
        },
        {
            name:"facebook",
            image:"/images/social/facebook.png",
            link:"https://www.facebook.com"
        },
        {
            name:"youtube",
            image:"/images/social/youtube2.png",
            link:"https://www.youtube.com"
        },
        {
            name:"linkedin",
            image:"/images/social/linkedin.png",
            link:"https://www.linkedin.com"
        }
    ]
    if (!mounted) return null;
    return (
        <div className={`  w-full  gap-2 ${setbgfooter} bottom-0 z-10  h-full`}>
            <div className=' w-full grid grid-cols-2 md:grid-flow-col lg:grid-flow-col gap-4 m-auto p-4 mb-4 text-md'>
                <div>
                    <h1 className=' text-xl font-bold mb-4'>Company</h1>
                    <div> <Link href='/user/About' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>About us</Link></div>
                    <div> <Link href='/user/Contact' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Contact us</Link></div>
                    <div> <Link href='/user/service' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Our Services</Link></div>
                    <div>   <Link href='/user/privacy' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Privacy Policy</Link></div>
                    <div>    <Link href='/user/condition' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Terms and Condition</Link></div>
                </div>
                <div>
                    <h1 className=' text-xl font-bold mb-4'>Quick links</h1>
                    <div> <Link href='/user/About' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>About us</Link></div>
                    <div> <Link href='/user/Contact' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Contact us</Link></div>
                    <div> <Link href='/user/service' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Our Services</Link></div>
                    <div>   <Link href='/user/privacy' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Privacy Policy</Link></div>
                    <div>    <Link href='/user/condition' className=' m-auto cursor-pointer gap-1 '> <span>&gt;</span>Terms and Condition</Link></div>
                </div>
                <div className=' flex flex-col gap-4'>
                    <h1 className=' text-xl font-bold mb-4'>Contact</h1>
                    <div className=''>
                        <div className=' m-auto mb-2 cursor-pointer gap-2 flex text-md  flex-row items-center '>
                            <div>
                                <MapPinned />
                            </div>
                            <div>
                                katan-18, Mahendranagar, Nepal
                            </div>
                        </div>
                        <div className=' m-auto mb-2 cursor-pointer gap-2 flex  flex-row items-center'><div>
                            <Phone /></div>
                            <div>9800000000</div>
                        </div>
                        <div className=' m-auto cursor-pointer gap-2 flex  flex-row items-center '><div>
                            <Mail /></div>
                            <div>
                                jobmilyo@gmail.com
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className=' flex flex-row gap-2 items-center'>
                            {socialItem.map((item:SocialIconType,index:number)=>{
                                return (<div key= {index}>
                                    <Link href={item.link}> <Image alt={item.name}  src={item.image} width={30} height={30} className='  object-fill ml-1 h-[26px] w-[26px] rounded-full' ></Image>
                                    </Link>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className=' w-[200px] flex flex-col flex-wrap'>
                    <h1 className=' text-xl font-bold mb-4'>Newsletter</h1>
                    <p>We value your privacy.</p>
                    <div className=' flex flex-row-reverse items-center p-4 gap-2 mt-8'>
                        <Input className='  absolute w-[150px] h-[50px] mr-4' placeholder='Email' />
                        <Button onClick={()=>{
                            router.push("/user/signup")
                        }} className=' bg-green-600  absolute mr-6 '>Sign Up</Button>
                    </div>
                </div>

            </div>
            {/* <div className='  '> */}
            <hr className=' shadow-2xl border w-[96%] m-auto' />
            {/* <div><Button className=' bg-green-600 h-[50px] absolute'>&uarr;</Button></div> */}
            {/* </div> */}
            <div className=' flex flex-row justify-around items-center flex-wrap h-[60px]'>
                 <div className=' font-bold'>
                     @ <span className=' text-blue-600'>Job <span className=' text-red-600 italic'>मिल्यो?</span> </span>
                 </div>
                <div>
                    Copyright © {date.getFullYear()} Bsc.CSIT Students of Far-western University. All rights reserved.
                </div>
                <div className=' flex flex-row gap-4'>
                    <Link href={"/user/"}>Home</Link>
                    <p>|</p>
                    <Link href={"/user/cookies"}>Cookies</Link>
                    <p>|</p>
                    <Link href={"/user/help"}>Help</Link>
                    <p>|</p>
                    <Link href={"/user/faq"}>FAQs</Link>
                </div>
            </div>
        </div>

    )
}

export default Footer
