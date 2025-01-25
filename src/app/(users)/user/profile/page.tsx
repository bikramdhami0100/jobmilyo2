"use client"
import { Button } from '@/components/ui/button';
import { IconCircleCheckFilled, IconStarFilled } from '@tabler/icons-react';
import { ArrowLeft, ArrowRightLeft, Bookmark, Download, Eye, Loader, PencilLine, Phone, PhoneCall, Plus, Rocket, SendHorizonal, Share, Star, View } from 'lucide-react';
import Image from 'next/image'
import React, { use, useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
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

const FileSaver = require("file-saver");
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { BackpackIcon, ResumeIcon, Share1Icon } from '@radix-ui/react-icons';
import SimilarProfile from '../usercomponents/userprofile/SimilarProfile';
import Link from 'next/link';
import { MyPopUpContext } from '../context/PopUpClose';

function UserProfile() {
    const [skillrating, setSkillRating] = useState<number>(0)

    const [skillloader, setSkillLoader] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false);
    const [rating, setRating] = useState(4);
    const [shareUrl, setShareUrl] = useState<any>()
    const [signup, setSignUp] = useState<any>();
    const [userInformation, setuserInformation] = useState<any>([]);
    const { seekerId ,validUser, setValidUser} = useContext<any>(MyPopUpContext);
    console.log(seekerId, "Seeker")

    const session = useSession()
    const router = useRouter();
    interface ADDSKILLLISTTYPE {
        name: string,
        rating: number,
    }
    const [AddSkillList, setAddSkillList] = useState<ADDSKILLLISTTYPE[]>([{ name: "", rating: 0 }])

    const handleChange = (index: any, name: any, value: any) => {
        const updatedSkills: any = [...AddSkillList];
        updatedSkills[index][name] = value;
        setAddSkillList(updatedSkills)

    }
    const AddNewSkills = () => {

        setAddSkillList([...AddSkillList, { name: "", rating: skillrating }])
    }
    const RemoveSkills = () => {
        setAddSkillList((skillList: any) => skillList.slice(0, -1))
    }


    const dataFromDatabase = async (id: any) => {
        const result = (await axios.get("/api/user/profile", { params: { id } })).data;
        console.log(result)
        if (result) {
            setuserInformation(result?.data?.userInfos);
            setSignUp(result?.data?.user);
             setValidUser(result?.data?.user)
        }
    }


    const downloadCV = async (imageURL: any, username: any) => {
        setIsDownloading(true);
        try {
            const response = await axios({
                url: imageURL,
                method: 'GET',
                responseType: 'blob', // important
            });
            FileSaver.saveAs(response.data, `${username}cv${Date.now()}.jpg`);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
        setIsDownloading(false);
    };


    let userItem: any = {
        fullName: signup?.fullname || "bikram",
        email: signup?.email || session.data?.user?.email || "bikram@example.com",
        image: session.data?.user?.image || "/images/logo.png",
        rating: rating,
        salary: "$60/hr",
        workingIn: "ABC Corporation",
        work: userInformation[0]?.interestedFiels || "Graphic Designer",
        skills: userInformation[0]?.skills || ["JavaScript", "HTML", "CSS", "python"],
        basicInformation: [{
            age: 22,
            yearOfExperience: "4 years",
            phone: userInformation[0]?.phone || "98000000000",
            ctc: "$ 40/hr",
            location: userInformation[0]?.CurrentAddress || "mahendranagar",
            mail: signup?.email || session.data?.user?.email || "jobmilyo@gmail.com",
            cv: "",
        }],
        experience: ["Software Engineer at XYZ Corp", "Internship at ABC Inc"],
        education: ["Bachelor's Degree in Computer Science"],
        certification: ["AWS Certified Developer"]
    };



    const shareProfile = async () => {
        const data = await navigator.clipboard.writeText(window.location.href);
        const readdata = await navigator.clipboard.readText();
        console.log(readdata)
        setShareUrl(readdata)
    }

    const skillUpdate = async () => {
        setSkillLoader(true)

        axios.post('/api/user/profile/skillupdate', {AddSkillList,id:seekerId})
            .then(function (response) {

                // setSkillLoader(false)
                setTimeout(() => {
                     dataFromDatabase(seekerId)
                }, 100);
                router.push("/user/profile")
            })
            .catch(function (error) {

            });
    }
    const CallingToUser = (phonenumber: any) => {
        return (
            <a href={`tel:${phonenumber}`} style={{ textDecoration: 'none', color: 'blue' }}>
                Call {phonenumber}
            </a>
        )

    }
    const userAge = (dob: any) => {
        const birthdateinyear = new Date(dob).getFullYear();
        const currentdateinyear = new Date().getFullYear();
        const age = currentdateinyear - birthdateinyear;
        return age;

    }
    useEffect(() => {
        seekerId && dataFromDatabase(seekerId);
    }, [seekerId]);

    return (
        <div>
            {/*  back button and share profile */}
            <div className=' flex items-center justify-between m-auto p-4'>
                <span onClick={() => {
                    router.back()
                }} className='  cursor-pointer flex justify-center items-center gap-1 text-sm'>  <ArrowLeft /> back</span>
                <Dialog>
                    <DialogTrigger onClick={shareProfile}>
                        <span
                            // onClick={shareProfile}
                            className="cursor-pointer flex justify-center items-center gap-1 text-sm"
                        >
                            <Share1Icon /> share profile
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
            {/* main part */}
            <div className='flex bg-[] flex-row flex-wrap justify-center items-start '>
                {/*  first part of user profile*/}
                {
                    signup ? (
                        <div className='flex flex-col justify-center items-center gap-2 shadow-md border m-2 p-4 w-[100%] md:w-[19%] lg:w-[19%]'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                {
                                    <div className='flex flex-col justify-center items-center gap-2  p-4 w-[100%] md:w-[19%] lg:w-[19%]'>
                                        <div className='flex flex-col justify-center items-center'>
                                            {
                                                <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                                    <Image src={signup?.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }

                                <p className=' flex gap-1 '>{signup?.fullName} <IconCircleCheckFilled className=' text-blue-700' /> </p>
                                <div className='cursor-pointer flex gap-2'>
                                    <p className='flex gap-1'>
                                        {userInformation && userInformation[0]?.useroverallskillrating}
                                        <IconStarFilled className={`${userInformation[0]?.useroverallskillrating >= 1 ? "text-yellow-500 " : ""}`} />

                                    </p>
                                    {/* <p>{signup?.email}</p> */}
                                    <div className='flex gap-3 text-sm text-green-600 cursor-pointer'>

                                    {/* {userInformation&&<p>{"$ " + Math.floor(parseInt(`${ userInformation[0]?.ctc}`) / 12) + "/month"}</p>} */}
                                    </div>
                                </div>

                                <h1>{userItem.work}</h1>
                                <div className='flex'>
                                    <Input className='rounded-r-none' placeholder='Message' />
                                    <Button onClick={() => {

                                    }} className='rounded-l-none gap-2 bg-green-600'>Send <SendHorizonal /></Button>
                                </div>
                            </div>
                            <hr />
                            {/* add skill */}
                            <div className=' flex   justify-center items-center '>Skills
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className='border-none hover:bg-auto'><Plus /></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-gray-200 text-black">
                                        <DialogHeader>
                                            <DialogTitle className='border-none shadow-none rounded-none decoration-black'>Skills</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <div className="w-full flex flex-col justify-center items-start bg-white text-black">
                                            <div className="p-4 w-full flex flex-col">
                                                {AddSkillList.map((item, index) => (
                                                    <div key={index} className='flex flex-col justify-start items-start'>
                                                        <h1>Name</h1>
                                                        <div className='flex justify-between items-center gap-2'>
                                                            <Input name='skills' value={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                                            <Rating className='h-[24px]' value={item.rating} onChange={(value: any) => handleChange(index, 'rating', value)} />
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className=' flex flex-wrap justify-between  gap-2 my-2'>
                                                    <Button onClick={AddNewSkills}>+ Add more skills</Button>
                                                    <Button onClick={RemoveSkills}>- Remove skills</Button>
                                                    <Button onClick={skillUpdate} className=' '>

                                                        <DialogClose>
                                                            {skillloader && <Loader className='animate-spin mr-2' />} Save changes
                                                        </DialogClose>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {/* show skill */}
                            <div>
                                <div className='flex gap-2 flex-wrap items-center justify-center'>
                                    {
                                        userItem.skills.map((item: any, index: any) => (
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
                    ) : (
                        // loading
                        <div className='flex flex-col justify-center items-center gap-2 shadow-md border m-2 p-4 w-[100%] md:w-[19%] lg:w-[19%] animate-pulse'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-[200px] h-[200px] rounded-full bg-gray-300'></div>
                                <div className='h-4 w-3/4 bg-gray-300 mt-2 rounded'></div>
                                <div className='h-4 w-1/2 bg-gray-300 mt-2 rounded'></div>
                                <div className='flex gap-3 mt-2'>
                                    <div className='h-4 w-10 bg-gray-300 rounded'></div>
                                    <div className='h-4 w-16 bg-gray-300 rounded'></div>
                                </div>
                                <div className='h-4 w-1/4 bg-gray-300 mt-2 rounded'></div>
                                <div className='flex w-full mt-2'>
                                    <div className='h-10 w-3/4 bg-gray-300 rounded-r-none'></div>
                                    <div className='h-10 w-1/4 bg-gray-300 rounded-l-none'></div>
                                </div>
                            </div>
                            <hr />
                            <div className='h-4 w-1/4 bg-gray-300 mt-2 rounded'></div>
                            <div className='flex gap-2 flex-wrap mt-2'>
                                {
                                    Array(4).fill('').map((_, index) => (
                                        <div key={index} className='border p-2 rounded-3xl w-[100px] text-center bg-gray-300'></div>
                                    ))
                                }
                            </div>
                            <div className='mt-2'>
                                <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
                                <div className='h-4 w-3/4 bg-gray-300 mt-2 rounded'></div>
                            </div>
                        </div>
                    )
                }

                {/* middle part */}
                {
                    signup ? (<div className=' flex flex-col  justify-between  items-start mt-2 gap-4 w-[100%] md:w-[60%] lg:w-[60%] shadow-md border  p-2'>
                        <div className=' w-full h-full flex flex-col  justify-center items-start border shadow-lg p-6 m-auto'>
                            <h1>Basic Information</h1>
                            <div className=' flex flex-wrap w-full h-full '>
                                {
                                    userInformation && userInformation?.map((item: any, index: any) => {

                                        return (<div key={index} className=' grid grid-cols-2  w-full h-full  md:grid-cols-3 lg:grid-cols-3'>
                                            <div>
                                                <h1>Age</h1>
                                                <p>{userAge(item?.dateofBirth)}</p>

                                            </div>
                                           
                                            <div>
                                                <h1>Phone</h1>
                                                <p>{item?.phone}</p>

                                            </div>
                                          
                                            <div>
                                                <h1>Location</h1>
                                                <p>{item?.CurrentAddress}</p>

                                            </div>
                                            <div>
                                                <h1>Mail</h1>
                                                <p>{signup?.email}</p>

                                            </div>

                                            <Button onClick={() => {
                                                downloadCV(item?.uploadCV, item?.fname);
                                            }} className=' mt-2 font-bold w-[50%]  p-4 bg-blue-600'> {isDownloading && <Loader className=' animate-spin' />}Download CV</Button>
                                            <Link  href={item?.uploadCV} target="_blank" className=' font-bold mt-2 w-[50%] flex  transition-colors rounded-md duration-500 bg-green-500 items-center justify-center'><ResumeIcon className='  mx-2   size-6' /> CV
                                            
                                            </Link>

                                        </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className=' shadow-xl border w-full'>
                            {/* tabs is used */}
                            <Tabs defaultValue="Experience" className="">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="Experience">Experience</TabsTrigger>
                                    <TabsTrigger value="Education">Education</TabsTrigger>
                                    <TabsTrigger value="Certification">Certification</TabsTrigger>
                                </TabsList>
                                <TabsContent value="Experience">

                                    <CardContent>
                                        <CardDescription>
                                            <hr />
                                            <div className='flex   items-start justify-center p-2  border'>
                                                {userInformation.map((item: any, index: number) => (
                                                    <div key={index} className='flex flex-row justify-between m-atuo items-center w-full'>
                                                        <div className=' flex justify-center items-center  '>
                                                            {
                                                                signup?.color.startsWith("#") ? (
                                                                    <div className='w-[100px] flex justify-center items-center  relative group'>
                                                                        <div style={{ backgroundColor: signup?.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                                                            <div className='text-center'>{signup.fullName.charAt(0).toUpperCase()}</div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                                                        <Image src={signup?.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                                                    </div>
                                                                )


                                                            }
                                                            <div className='flex flex-col justify-center items-start ml-4  '>
                                                                <h1>{signup?.fullName}</h1>
                                                                <p>{item?.previouscompany?.map((item: any, index: any) => {

                                                                    return (<> {item?.companyname || "No any company"}</>)
                                                                })}</p>
                                                                <p>{item.yearofexcellence || "No any excellence "}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h1 className=' underline cursor-pointer'>View Project</h1>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </CardDescription>
                                    </CardContent>
                                </TabsContent>
                                <TabsContent value="Education">
                                    <Card>
                                        {/* <CardHeader>
                                            <CardTitle>Education</CardTitle>

                                        </CardHeader> */}
                                        <CardContent className="space-y-2">
                                            <CardDescription>
                                                <hr />
                                                <div className='flex   items-start justify-center p-2  border'>
                                                    {userInformation.map((item: any, index: number) => (
                                                        <div key={index} className='flex flex-row justify-between m-atuo items-center w-full'>
                                                            <div className=' flex justify-center items-center  '>
                                                                {
                                                                    signup?.color.startsWith("#") ? (
                                                                        <div className='w-[100px] flex justify-center items-center  relative group'>
                                                                            <div style={{ backgroundColor: signup?.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                                                                <div className='text-center'>{signup.fullName.charAt(0).toUpperCase()}</div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                                                            <Image src={signup?.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                                                        </div>
                                                                    )


                                                                }
                                                                <div className='flex flex-col justify-center items-start ml-4  '>
                                                                    <h1>{signup?.fullName}</h1>
                                                                    <p>{item.educationtype}</p>
                                                                    <h1>{item.boardName}</h1>
                                                                    <p>{item.level}</p>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Link className=' flex gap-1' href={item.marksheet} target="_blank">Marksheet <Download /></Link>

                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </CardDescription>
                                        </CardContent>

                                    </Card>
                                </TabsContent>
                                <TabsContent value="Certification">
                                    <Card>

                                        <CardContent>
                                            <CardDescription>
                                                <hr />
                                                <div className='flex   items-start justify-center p-2  border'>
                                                    {userInformation.map((item: any, index: number) => (
                                                        <div key={index} className='flex flex-row justify-between m-atuo items-center w-full'>
                                                            <div className=' flex justify-center items-center  '>
                                                                {
                                                                    signup?.color.startsWith("#") ? (
                                                                        <div className='w-[100px] flex justify-center items-center  relative group'>
                                                                            <div style={{ backgroundColor: signup?.color }} className='flex justify-center items-center w-[100px] h-[100px] rounded-full'>
                                                                                <div className='text-center'>{signup.fullName.charAt(0).toUpperCase()}</div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                                                            <Image src={signup?.color} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />

                                                                        </div>
                                                                    )


                                                                }
                                                                <div className='flex flex-col justify-center items-start ml-4  '>
                                                                    <h1>{signup?.fullName}</h1>
                                                                    <p>{item.educationtype}</p>
                                                                    <h1>{item.boardName}</h1>
                                                                    <p>{item.level}</p>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Link className=' flex gap-1' href={item.marksheet} target="_blank">Marksheet <Download /></Link>

                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </CardDescription>
                                        </CardContent>

                                    </Card>
                                </TabsContent>
                            </Tabs>

                        </div>
                    </div>) : (<div className=' flex flex-col  justify-between  items-start mt-2 gap-4 w-[100%] md:w-[60%] lg:w-[60%] shadow-md border  p-2'>
                        <div className='border shadow-md p-4 mb-4  w-full'>
                            <div className='animate-pulse flex flex-col space-y-4'>

                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                            </div>
                        </div>
                        <div className='shadow-xl border p-4 w-full '>
                            <div className='animate-pulse space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='h-6 w-1/2 bg-gray-300 rounded'></div>
                                    <div className='h-6 w-1/4 bg-gray-300 rounded'></div>
                                    <div className='h-6 w-1/4 bg-gray-300 rounded'></div>
                                </div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded'></div>
                            </div>
                        </div>
                    </div>)
                }
                {/* last part */}
                {
                    signup ? (<SimilarProfile interestedFiels={userInformation[0]?.interestedFiels} seekerId={seekerId} />) : (<div className="mt-2 flex flex-col flex-wrap w-[100%] shadow-md border m-auto md:w-[19%] lg:w-[19%] justify-center items-start p-2">
                        <div className="flex justify-center items-center h-[200px] shadow-lg border p-6 w-full animate-pulse">
                            <div className="h-8 w-32 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-full shadow-md border mt-4 flex flex-col justify-center items-start animate-pulse">
                            <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
                            <hr className="w-full" />
                            <ScrollArea className="h-72 w-full rounded-md border">

                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="flex flex-row justify-start items-center shadow-xl border p-2 w-full">
                                        <div className="h-[80px] w-[80px] bg-gray-300 rounded-full"></div>
                                        <div className="flex flex-col justify-center items-start ml-4">
                                            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                    )
                }
            </div>
        </div >
    )
}

export default UserProfile

