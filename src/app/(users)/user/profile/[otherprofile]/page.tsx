
"use client"
import { Button } from '@/components/ui/button';
import { IconArrowBack, IconArrowBackUp, IconCalendarTime, IconCircleCheckFilled, IconEdit, IconEditCircle, IconEyeStar, IconPhoneCall, IconPhotoEdit, IconSignRightFilled, IconStar, IconStarFilled, IconStarOff, IconUpload } from '@tabler/icons-react';
import { ArrowLeft, ArrowRightLeft, Bookmark, Download, Loader, PencilLine, Phone, PhoneCall, Plus, Rocket, SendHorizonal, Share, Star } from 'lucide-react';
import Image from 'next/image'
import React, { use, useContext, useEffect, useState } from 'react'
// import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,

} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,

    LinkedinIcon,
    LinkedinShareButton,

    TwitterShareButton,

} from "react-share";

import { Input } from '@/components/ui/input';

import '@smastrom/react-rating/style.css'
import { BackpackIcon, ResumeIcon, Share1Icon } from '@radix-ui/react-icons';

import { MyPopUpContext } from '../../context/PopUpClose';

import '@smastrom/react-rating/style.css'
import { useRouter } from 'next/navigation';

export interface PreviousCompany {
  companyname: string | null;
  ctc: number;
  previousrole: string | null;
  workingtime: string | null;
  yearofexcellence: string | null;
}
export interface User {
  color: string,
  email: string,
  fullName: string,
  _id: string
}
export interface OtherUserInfo {
  currentAddress: string;
  PermanentAddress: string;
  boardName: string;
  dateofBirth: Date;
  educationType: string;
  expectedPositionLevel: string;
  faculty: string;
  firstName: string;
  gender: string;
  interestedCategory: string;
  interestedEmploymentType: string;
  interestedField: string;
  level: string;
  marksheet: string;
  phone: string;
  previouscompany: PreviousCompany[];
  skills: string[];
  uploadCV: string;
  userId: User;

  useroverallskillrating: number | undefined;

}

function OtherUserProfile({ params }: any) {
      const [shareUrl, setShareUrl] = useState<any>()
      const router=useRouter();
  const otherInfoId = params?.otherprofile;
  const {seekerId}:any=useContext(MyPopUpContext);
  const [otherProfile, setOtherProfile] = useState<OtherUserInfo>();
  const dataFromDatabase = async () => {
    const send = (await axios.post("/api/user/profile/other_profile", { otherInfoId,seekerId })).data
    setOtherProfile(send?.data)
  }
  useEffect(() => {
    dataFromDatabase();
  }, []);

  const userAge = (dob: any) => {
    const birthdateinyear = new Date(dob).getFullYear();
    const currentdateinyear = new Date().getFullYear();
    const age = currentdateinyear - birthdateinyear;
    return age;

  }

  const shareProfile = async () => {
    const data = await navigator.clipboard.writeText(window.location.href);
    const readdata = await navigator.clipboard.readText();
    console.log(readdata)
    setShareUrl(readdata)
}
  // console.log(otherProfile)
  return (
    <>
      {
       otherProfile &&otherProfile ? (<div>
           
          {/* main part */}
          <div className=' flex flex-wrap justify-center items-start  w-full h-full '>
            {/* header */}
            <div className=' flex items-center justify-between m-auto p-4 w-full'>
                <span onClick={() => {
                    router.back()
                }} className='  cursor-pointer flex justify-center items-center gap-1 text-sm'>  <ArrowLeft /> back</span>
                <Dialog>
                    <DialogTrigger onClick={shareProfile}>
                        <span
                            // onClick={shareProfile}
                            className="cursor-pointer flex font-semibold justify-center items-center gap-1 text-sm"
                        >
                            <Share1Icon /> share
                        </span>
                    </DialogTrigger>
                    <DialogContent className="text-black bg-gray-300">
                        <DialogHeader>
                            <DialogTitle>share in your post</DialogTitle>
                            <DialogDescription className=' text-black '>
                                <div className=' text-start font-bold gap-2 m-1 '>
                                    share
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Input
                                        type="text"
                                        defaultValue={shareUrl}
                                        // readOnly
                                        placeholder={shareUrl}
                                        className="p-2 border  text-black rounded w-full"
                                    />
                                    <div className=' flex gap-2 items-center justify-center'>
                                        {
                                            shareUrl && <FacebookShareButton url={`${shareUrl}`}>
                                                <FacebookIcon size={40} round={true}></FacebookIcon>
                                            </FacebookShareButton>
                                        }
                                        {
                                            shareUrl && <LinkedinShareButton url={`${shareUrl}`}>
                                                <LinkedinIcon size={40} round={true} />
                                            </LinkedinShareButton>
                                        }
                                        {
                                            shareUrl && <TwitterShareButton url={`${shareUrl}`}>
                                                <Image alt='image' src={"/images/social/twitter.png"} width={40} height={4} className=' rounded-full'></Image>
                                            </TwitterShareButton>
                                        }
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            {/*  first part of user profile*/}
            <div className=' w-full md:w-[50%] lg:w-[50%] h-full '>
              {

                <div className='flex flex-col justify-center items-center gap-2 shadow-md border m-2 p-4 w-[100%] '>
                  <div className='flex flex-col justify-center items-center gap-1'>
                    {
                      <div className='flex flex-col justify-center items-center gap-2  p-4 w-[100%] md:w-[19%] lg:w-[19%]'>
                        <div className='flex flex-col justify-center items-center'>
                          {
                            otherProfile?.userId?.color.startsWith("#") ? (
                              <div className='w-[100px] flex justify-center items-center -mb-4 relative group'>
                                <div style={{ background: otherProfile?.userId.color }} className='flex justify-center items-center  w-[100px] h-[100px] rounded-full'>
                                  <div className='text-center'>{otherProfile?.userId.fullName.charAt(0).toUpperCase()}</div>
                                </div>
                              </div>
                            ) : (
                              <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                <Image src={otherProfile?.userId?.color || ""} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                              </div>
                            )


                          }


                        </div>
                      </div>
                    }

                    <p className=' flex gap-1 '>{otherProfile?.userId.fullName} <IconCircleCheckFilled className=' text-blue-700' /> </p>
                    <div className='cursor-pointer flex gap-2'>
                      <p className='flex gap-1'>
                        {otherProfile && otherProfile?.useroverallskillrating &&
                          <IconStarFilled className={`${otherProfile?.useroverallskillrating >= 1 ? "text-yellow-500 " : ""}`} />
                        }

                      </p>
                      {/* <p>{otherprofile?.email}</p> */}
                      <div className='flex gap-3 text-sm text-green-600 cursor-pointer'>
                        {
                          otherProfile?.previouscompany?.map((item: PreviousCompany, index: number) => {
                            return (
                              <>
                                <p>{"$ " + Math.floor(parseInt(`${item?.ctc}`) / 12) + "/month"}</p>
                              </>
                            )
                          })
                        }
                      </div>
                    </div>

                    <h1>{ }</h1>
                    <div className='flex'>
                      <Input className='rounded-r-none' placeholder='Message' />
                      <Button onClick={() => {

                      }} className='rounded-l-none gap-2 bg-green-600'>Send <SendHorizonal /></Button>
                    </div>
                  </div>
                  <hr />

                  {/* show skill */}
                  <div>
                    <div className='flex gap-2 flex-wrap items-center justify-center'>
                      {
                        otherProfile?.skills.map((item: any, index: any) => (
                          <div key={index} className='border flex items-center m-auto  justify-center p-2 rounded-3xl w-[48%] text-ellipsis   text-center'>
                            <p>{item}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div>
                    <h1>Recents</h1>
                    <p>No data Available</p>
                  </div>
                </div>
              }

            </div>
            {/* last part */}
            <div className=' w-full md:w-[50%] lg:w-[50%] h-full '>

              <div className=' flex flex-col  justify-between  items-start mt-2 gap-4 w-[100%] shadow-md border  p-2'>
                <div className=' w-full h-full flex flex-col  justify-center items-start border shadow-lg p-6 m-auto'>
                  <h1>Basic Information</h1>
                  <div className=' flex flex-wrap w-full h-full '>



                    <div className='  w-full h-full  flex flex-wrap justify-between items-center gap-12'>
                      <div>
                        <h1>Age</h1>
                        <p>{userAge(otherProfile?.dateofBirth)}</p>

                      </div>
                      <div>
                        <h1>Phone</h1>
                        <p>{otherProfile?.phone}</p>
                      </div>
                     
                      <div>
                        <h1>Location</h1>
                        <p>{otherProfile?.PermanentAddress}</p>

                      </div>
                      <div>
                        <h1>Mail</h1>
                        <p className=' '>{otherProfile?.userId?.email}</p>

                      </div>
                    </div>

                  </div>

                </div>
                {/*  tab information */}
                <div className=' shadow-xl border w-full'>
                  {/* tabs is used */}
                  <Tabs defaultValue="Experience" className="">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="Experience">Experience</TabsTrigger>
                      <TabsTrigger value="Education">Education</TabsTrigger>
                      <TabsTrigger value="Certification">Certification</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Experience">
                      <Card>
                        <div className='flex   items-start justify-center p-2  border'>

                          <div className='flex flex-row justify-between m-atuo items-center w-full'>
                            <div className=' flex justify-center items-center  '>
                              {
                                otherProfile?.userId?.color.startsWith("#") ? (
                                  <div className='w-[100px] flex justify-center items-center  relative group'>
                                    <div style={{ backgroundColor: otherProfile?.userId.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                      <div className='text-center'>{otherProfile?.userId?.fullName.charAt(0).toUpperCase()}</div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                    <Image src={otherProfile?.userId.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                  </div>
                                )


                              }
                              <div className='flex flex-col justify-center items-start ml-4  '>
                                <h1>{otherProfile?.userId.fullName}</h1>
                                <p>{otherProfile?.previouscompany?.map((item: any, index: any) => {

                                  return (<div>
                                    <p>
                                      {item?.companyname || "No any company"}
                                    </p>

                                    <p>{item.yearofexcellence || "No any excellence "}</p>
                                  </div>)
                                })}</p>
                              </div>
                            </div>
                            <div>

                            </div>

                          </div>

                        </div>
                      </Card>
                      <CardContent>
                        <CardDescription>
                          <hr />

                        </CardDescription>
                      </CardContent>
                    </TabsContent>
                    <TabsContent value="Education">
                      <Card>
                        <hr />
                        <div className='flex   items-start justify-center p-2  border'>

                          <div className='flex flex-row justify-between m-atuo items-center w-full'>
                            <div className=' flex justify-center items-center  '>
                              {
                                otherProfile?.userId?.color.startsWith("#") ? (
                                  <div className='w-[100px] flex justify-center items-center  relative group'>
                                    <div style={{ backgroundColor: otherProfile?.userId.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                      <div className='text-center'>{otherProfile?.userId?.fullName.charAt(0).toUpperCase()}</div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                    <Image src={otherProfile?.userId.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                  </div>
                                )


                              }
                              <div className='flex flex-col justify-center items-start ml-4  '>
                                <h1>{otherProfile?.userId.fullName}</h1>
                                <p>{otherProfile?.educationType}</p>
                                <h1>{otherProfile?.boardName}</h1>
                                <p>{otherProfile?.level}</p>
                              </div>
                            </div>
                            <div>

                            </div>

                          </div>

                        </div>
                        <CardContent className="space-y-2">
                          <CardDescription>

                          </CardDescription>
                        </CardContent>

                      </Card>
                    </TabsContent>
                    <TabsContent value="Certification">
                      <Card>
                        <hr />
                        <div className='flex   items-start justify-center p-2  border'>

                          <div className='flex flex-row justify-between m-atuo items-center w-full'>
                            <div className=' flex justify-center items-center  '>
                              {
                                otherProfile?.userId?.color.startsWith("#") ? (
                                  <div className='w-[100px] flex justify-center items-center  relative group'>
                                    <div style={{ backgroundColor: otherProfile?.userId.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                      <div className='text-center'>{otherProfile?.userId?.fullName.charAt(0).toUpperCase()}</div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                    <Image src={otherProfile?.userId.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                  </div>
                                )


                              }
                              <div className='flex flex-col justify-center items-start ml-4  '>
                                <h1>{otherProfile?.userId.fullName}</h1>
                                <p>{otherProfile?.educationType}</p>
                                <h1>{otherProfile?.boardName}</h1>
                                <p>{otherProfile?.level}</p>
                              </div>
                            </div>
                            <div>

                            </div>

                          </div>

                        </div>
                        <CardContent>
                          <CardDescription>

                          </CardDescription>
                        </CardContent>

                      </Card>
                    </TabsContent>
                  </Tabs>


                </div>
              </div>

            </div>


          </div>
        </div >) : (<div className='flex flex-wrap justify-center items-start w-full h-full'>
        
          {/*  first part of user profile*/}
          <div className='w-full md:w-[50%] lg:w-[50%] h-full'>
            <div className='flex flex-col justify-center items-center gap-2 shadow-md border m-2 p-4 w-[100%]'>
              <div className='flex flex-col justify-center items-center gap-1'>
                <div className='flex flex-col justify-center items-center gap-2 p-4 w-[100%] md:w-[19%] lg:w-[19%]'>
                  <div className='flex flex-col justify-center items-center'>
                    <div className='w-[100px] flex justify-center items-center -mb-4 relative group'>
                      <div className='flex justify-center items-center w-[100px] h-[100px] rounded-full bg-gray-300 animate-pulse'></div>
                    </div>
                  </div>
                </div>
                <p className='flex gap-1'>
                  <span className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></span>
                </p>
                <div className='cursor-pointer flex gap-2'>
                  <p className='flex gap-1'>
                    <span className='bg-gray-300 w-6 h-6 rounded-full animate-pulse'></span>
                  </p>
                  <div className='flex gap-3 text-sm text-green-600 cursor-pointer'>
                    <span className='bg-gray-300 w-24  rounded-md animate-pulse'></span>
                  </div>

                </div>
             
                
              </div>
              <hr />
              {/* show skill */}
              <div className=' w-full '>
                <div className='flex gap-2 flex-wrap items-center justify-center w-full'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className='border  w-[100px] flex items-center justify-center p-2 rounded-3xl  text-ellipsis text-center bg-gray-300 animate-pulse  h-10'></div>
                  ))}
                </div>
              </div>
            
            </div>
          </div>

          {/* last part */}
          <div className='w-full md:w-[50%] lg:w-[50%] h-full'>
            <div className='flex flex-col justify-between items-start mt-2 gap-4 w-[100%] shadow-md border p-2'>
              <div className='w-full h-full flex flex-col justify-center items-start border shadow-lg p-6 m-auto'>

                <div className='flex flex-wrap w-full h-full'>
                  <div className='w-full h-full flex flex-wrap justify-between items-center gap-12'>
                    <div>
                    
                      <p className='bg-gray-300 w-12 h-6 rounded-md animate-pulse'></p>
                    </div>
                    <div>
                  
                      <p className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></p>
                    </div>
                    <div>
                     
                      <p className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></p>
                    </div>
                    <div>
                    
                      <p className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></p>
                    </div>
                    <div>
                      
                      <p className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></p>
                    </div>
                    <div>
                     
                      <p className='bg-gray-300 w-36 h-6 rounded-md animate-pulse'></p>
                    </div>
                  </div>
                </div>
              </div>
              {/*  tab information */}
              <div className='shadow-xl border w-full'>
                <div className="tabs">

                  <div className="tabs-content">
                    <div className='flex items-start justify-center p-2 border'>
                      <div className='flex flex-row justify-between m-auto items-center w-full'>
                        <div className='flex justify-center items-center'>
                          <div className='w-[100px] flex justify-center items-center relative group'>
                            <div className='flex justify-center items-center w-[100px] h-[100px] rounded-full bg-gray-300 animate-pulse'></div>
                          </div>
                          <div className='flex flex-col  gap-2 justify-center items-start ml-4'>
                            <h1 className='bg-gray-300 w-24 h-6 rounded-md animate-pulse'></h1>
                            <p className='bg-gray-300 w-36 h-6 rounded-md animate-pulse'></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tabs-content mt-4">
                      <div className='bg-gray-300 w-full h-40 rounded-md animate-pulse'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }

    </>
  )
}

export default OtherUserProfile















