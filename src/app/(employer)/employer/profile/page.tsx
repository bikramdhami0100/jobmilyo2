
"use client"
import { Button } from '@/components/ui/button';
import { IconCircleCheckFilled, IconLocation, IconStarFilled } from '@tabler/icons-react';
import { ArrowLeft, Edit, Eye, Facebook, Linkedin, Loader, Mail, MapPin, Phone, Twitter, View, X } from 'lucide-react';
import Image from 'next/image'
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
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,

    LinkedinIcon,
    LinkedinShareButton,

    TwitterShareButton,

} from "react-share";

const FileSaver = require("file-saver");
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Rating } from '@smastrom/react-rating'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import '@smastrom/react-rating/style.css'
import { BackpackIcon, ResumeIcon, Share1Icon } from '@radix-ui/react-icons';

import Link from 'next/link';
import { MyEmployerLogInContext } from '../../context/EmployerLogInContext';
import { useContext, useState } from 'react';
import EditOrganizationData from './_components/EditOrganizationData';

function EmployerProfile() {
    const { organizationData, employerData } = useContext<any>(MyEmployerLogInContext);
    console.log(organizationData, "orgai")
    const [isDownloading, setIsDownloading] = useState(false);
    const [shareUrl, setShareUrl] = useState<any>()
    const [ orgData, setOrgData] = useState<boolean>(false)
    const router = useRouter();


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


    const shareProfile = async () => {
        const data = await navigator.clipboard.writeText(window.location.href);
        const readdata = await navigator.clipboard.readText();
        console.log(readdata)
        setShareUrl(readdata)
    }

    const handlerEditOrganizationData = () => {

    }
    //    employerData={employerData}
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
            <div className='flex  flex-row flex-wrap justify-center items-start '>
                <div className='flex flex-col justify-center items-center  lg:border-r-2 border-b-2  md:border-b-0 lg:border-b-0 gap-2 shadow-md  m-2 p-4 w-[100%] md:w-[30%] lg:w-[40%]'>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <div className='flex flex-col justify-center items-center gap-2  p-4 w-[100%] md:w-[40%] lg:w-[40%]'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='relative group  m-auto w-[120px] h-[120px] p-3 overflow-hidden rounded-full   '>
                                    <Image src={organizationData?.logo} alt={"profile image"} width={100} height={100} className='rounded-full absolute left-1 right-1 top-1  p-2 m-auto  object-fill  cursor-pointer h-full w-full' />
                                </div>
                            </div>
                        </div>
                        <p className=' flex gap-1 '>{organizationData?.organizationName} <IconCircleCheckFilled className=' text-blue-700' /> </p>
                        <div className='cursor-pointer flex gap-2'>
                            <div className='flex gap-3 text-sm text-green-600 cursor-pointer'>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <h1 className=' flex gap-2'> {organizationData?.founded?.slice(0, 10)}</h1>
                            <h1 className=' flex gap-2'> <Phone />{organizationData?.contact?.phone}</h1>
                            <h1 className=' flex gap-2'><Mail /> {organizationData?.contact?.email}</h1>
                            <h1 className=' flex gap-2'> <MapPin /> {organizationData?.headquarters}</h1>
                            <Link href={organizationData?.contact?.website || ""} target="_blank" className=' flex gap-2'>Website</Link>
                        </div>
                        <div className='flex gap-2'>
                            <Link href={organizationData?.socialMedia?.facebook || ""}><Facebook /> </Link>
                            <Link href={organizationData?.socialMedia?.twitter || ""}><Twitter /> </Link>
                            <Link href={organizationData?.socialMedia?.linkedin || ""}><Linkedin /> </Link>
                        </div>
                    </div>
                    <hr />

                </div>
                {/* middle part */}
                <div className='flex flex-col justify-center items-center gap-2 shadow-md  m-2 p-4 w-[100%] md:w-[30%] lg:w-[40%]'>
                    <h1>Other Details</h1>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <h1 className=' flex gap-2'>  Industry: {organizationData?.industry}</h1>
                            <h1 className=' flex gap-2'>
                                Services
                            </h1>
                            <h1 className=' flex gap-2'>
                                {organizationData?.services?.map((item: string, index: number) => (<div key={index} >{item}</div>))}
                            </h1>
                            <AlertDialog>
                                <AlertDialogTrigger className=' flex gap-1'><Edit />Edit</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                         <div className=' flex justify-between items-center '>
                                         <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle> <AlertDialogCancel><X/></AlertDialogCancel>
                                         </div>
                                        <AlertDialogDescription>
                                            <EditOrganizationData  organizationData={organizationData} orgData={orgData} setOrgData={setOrgData} employerData={employerData}/>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>


                        </div>
                    </div>
                    <hr />

                </div>

            </div>
        </div >
    )
}

export default EmployerProfile;

