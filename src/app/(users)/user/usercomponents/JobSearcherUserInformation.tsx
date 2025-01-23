"use client"
import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux";
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CldUploadButton } from 'next-cloudinary';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';

// import { profile } from 'console';
function userInformation() {
    interface PrecompanyDetailsType {
        companyname: string,
        ctc: string,
        workingtime: string,
        previousrole: string,
        yearofexcellence: string

    }
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const { toast } = useToast()
    const [preCompanyForm, setPreCompanyForm] = useState<PrecompanyDetailsType>({
        companyname: "",
        ctc: "",
        workingtime: "",
        previousrole: "",
        yearofexcellence: ""
    })
    const [existpreCompany, setexistpreCompany] = useState<string>("no")

    const [cv, setcv] = useState(false);
    const [marksheet, setmarksheet] = useState(false);

    const [formData, setFormData] = useState<any>({
        fname: '',
        gender: '',
        phone: '',
        skils: '',
        PermanentAddress: '',
        CurrentAddress: '',
        profile: "",
        // personal information
        boardName: '',
        level: '',
        faculity: '',
        educationtype: '',
        gpaorpercentage: '',
        passedDate: '',
        marksheet: ""
        // employement information
        ,
        previouscompany: existpreCompany,
        previousrole: '',
        interestedCategory: '',
        interestedFiels: '',
        interestedEmploymentType: '',
        expectedPositionLevel: '',
        uploadCV: "",

    });


    const uploadMarksheet = (result: any) => {

        // setmarksheet(result.info.secure_url);
        setFormData((prevState: any) => ({
            ...prevState,
            marksheet: result.info.secure_url
        }))
        if (result.info.secure_url) {
            setmarksheet(true);
            toast({
                title: "Upload successfully ",
                description: "Marksheet upload successfully ",
            })
        }
        // Handle successful upload, e.g., save the URL to state
    };
    //upload  cv
    const uploadCV = (result: any) => {
        setFormData((prevState: any) => ({
            ...prevState,
            uploadCV: result.info.secure_url
        }))
        // setcv(result.info.secure_url);
        if (result.info.secure_url) {
            setcv(true)
            toast({
                title: "Upload successfully ",
                description: "CV upload",
            })
        }
        // Handle successful upload, e.g., save the URL to state
    };

    const router = useRouter();
    const selector: any = useSelector((state: any) => {

        return state.signupinfo.Users;
    });

    if (selector[0] == undefined) {
        // router.push("/user/signup");
    }

    const { theme } = useTheme();



    const Gender = ["Selcet Gender", "Male", "Female", "Other"];
    const boardNames = ["Select Board", "Nepal Board", "Higher Secondary Education Board", "Tribhuvan University", "Kathmandu University", "Pokhara University ", "Council for Technical Education and Vocational Training", "Nepal Medical Council", "Nepal Bar Council", "Farwestern University"];
    const levelNames = ["Select Level", "Undergraduate", "Primary Education", "Lower Secondary Education", "Secondary Education", "Higher Secondary Education", "Bachelor's Degree", "Master's Degree", "SEE", "Phd", "+2/PCL"];
    const facultyNames = ["Select Faculty", "Humanities", "Science and Technology", "Management", "Engineering", "Medicine", "Law", "Education", "Agriculture", "Fine Arts",];

    const interestedFields = ["Select Field", "Software Development", "Marketing", "Medicine", "Teaching", "Finance", "Public Service", "Graphic Design", "Research", "Social Work", /* Add more fields as needed */];

    const interestedEmploymentTypes = ["Select Employment Type", "Full-time", "Part-time", "Contract", "Freelance", "Internship", "Remote", "Temporary", /* Add more employment types as needed */];

    const expectedPositionLevels = ["Select Position Level", "Entry Level", "Mid Level", "Senior Level", "Executive", /* Add more position levels as needed */];

    // fetch data from database
    const SubmitData = async () => {


        const data = (await axios.post("/api/userinfo/", formData)).data;
        console.log("data", data)
        if (data.message?.errors) {
            toast({
                variant: "destructive",
                title: data.message._message,
                description: "सबै क्षेत्रहरू आवश्यक छन् कृपया भर्नुहोस् (all fields are required please fillup )",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } else if (data.status === 200) {
            router.push("/user/profile")
        }

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // Validation

    };
    const PreviousCompanyFormData = (e: any) => {
        const { name, value } = e.target;
        setPreCompanyForm({
            ...preCompanyForm,
            [name]: value
        });
        if (existpreCompany == "yes") {
            setFormData((prevState: any) => ({
                ...prevState,
                previouscompany: [preCompanyForm]
            }))
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                previouscompany: existpreCompany
            }))
        }
    }
    const submitPrecompanyData = async () => {
        console.log(preCompanyForm)
    }
  
    useEffect(()=>{
       
    },[])
    if (!mounted) return null;
    return (
        <div className=' flex  flex-col justify-around items-center gap-10 '>

            <h1>Complete your Information</h1>

            <div className=' gap-10 flex flex-col justify-evenly items-center  md:flex-row lg:flex-row w-full '>
                {/* Personal Data */}
                <div className=' w-full'>
                    <div className="flex flex-col shadow-lg border p-4 m-auto gap-4 w-[80%]">
                        <h1 className="">Personal Information</h1>
                        <div>
                            <label htmlFor="fname">Full Name</label>
                            <Input
                                onChange={handleChange}
                                name="fname"
                                placeholder="full Name"
                                value={formData.fname}
                            ></Input>

                        </div>

                        <div>
                            <label htmlFor="Gender">Gender</label>
                            <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="gender" value={formData.gender} id="" onChange={handleChange}>

                                {
                                    Gender.map((item, index) => {
                                        return (<option className=' '>{item}</option>)
                                    })
                                }
                            </select>


                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <Input
                                onChange={handleChange}
                                name="phone"
                                type='number'
                                placeholder="Enter your phone number"
                                value={formData.phone}
                            ></Input>

                        </div>
                        <div>
                            <label htmlFor="PermanentAddress">Permanent Address</label>
                            <Input
                                onChange={handleChange}
                                name="PermanentAddress"
                                placeholder="Permanent Address"
                                value={formData.PermanentAddress}
                            ></Input>

                        </div>
                        <div>
                            <label htmlFor="CurrentAddress">Current Address</label>
                            <Input
                                onChange={handleChange}
                                name="CurrentAddress"
                                placeholder="Current Address"
                                value={formData.CurrentAddress}
                            ></Input>

                        </div>
                        <div>
                            <label htmlFor="dateofBirth">Date of birth</label>
                            <Input
                                onChange={handleChange}
                                name="dateofBirth"
                                type='date'
                                placeholder="Date of birth "
                                value={formData.dateofBirth}
                            ></Input>
                          
                        </div>


                    </div>
                </div>
                {/* Education */}
                <div className=' flex flex-col shadow-lg border p-4  m-auto gap-4 w-[80%]'>
                    <h1 className=' '> Education Information</h1>
                    <div>
                        <label htmlFor="boardName">Board Name</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="boardName" value={formData.boardName} id="" onChange={handleChange}>

                            {
                                boardNames.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <div>
                        <label htmlFor="level">Level</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="level" value={formData.level} id="" onChange={handleChange}>

                            {
                                levelNames.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <div>
                        <label htmlFor="faculity">Faculity</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="faculity" value={formData.faculity} id="" onChange={handleChange}>

                            {
                                facultyNames.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>

                    <div>
                        <label htmlFor="edutype">Education Type</label>
                        <Input name='educationtype' placeholder='Government or Private' onChange={handleChange} value={formData.educationtype}></Input>
                    </div>

                    <div className="grid w-[100%] max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture"  >Marksheet/Transcript/Grade Sheet</Label>
                        <CldUploadButton
                            className=' w-full text-left border-2 p-1 rounded-md '
                            onSuccess={uploadMarksheet}
                            uploadPreset="wyyzhuyo"
                        />
                        {
                            marksheet ? <p className=' text-green-600 text-left'>upload successfully</p> : <p className=' text-red-700 text-left '>please upload marksheet (.jpg/.png) </p>
                        }
                    </div>
                    {/* <p>Further requirement are apply in our major project e.g marksheet, character certificate etc</p> */}
                </div>
                {/* Employment  */}
                <div className=' flex flex-col shadow-lg border p-4  m-auto gap-4 w-[80%]'>
                    <h1 className=' '> Employment Information</h1>
                    <div>
                        <label htmlFor="previouscompany">Previour Company</label>
                        <RadioGroup defaultValue={existpreCompany} onValueChange={(e) => {
                            setexistpreCompany(e)
                        }} >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">No</Label>
                            </div>
                        </RadioGroup>
                        {
                            existpreCompany.toLowerCase() === "yes" ? <>
                                <Dialog >
                                    <DialogTrigger>
                                        <Button className=' mt-2 '>Add Details</Button> </DialogTrigger>
                                    <DialogContent className=' bg-white text-black '>
                                        <DialogHeader>
                                            <DialogTitle>Some Company Details ?</DialogTitle>
                                            <DialogDescription>
                                                <div className=' w-full h-full text-black '>

                                                    <div className=' flex flex-col justify-start items-start gap-2'>
                                                        <div className=' w-full h-full '>
                                                            <h1>Company name</h1>
                                                            <Input onChange={PreviousCompanyFormData} name='companyname' value={preCompanyForm.companyname} type='text' className='' ></Input>
                                                        </div>
                                                        <div className=' w-full h-full '>
                                                            <h1>CTC (cost-to-company)</h1>
                                                            <Input onChange={PreviousCompanyFormData} name='ctc' value={preCompanyForm.ctc} placeholder=' Enter salary per year in $' type='number' className='' ></Input>
                                                        </div>
                                                        <div className=' w-full h-full '>
                                                            <h1>Working time</h1>
                                                            <Input onChange={PreviousCompanyFormData} name='workingtime' value={preCompanyForm.workingtime} type='text' className='' ></Input>
                                                        </div>
                                                        <div className=' w-full h-full '>
                                                            <h1>Previous role</h1>
                                                            <Input onChange={PreviousCompanyFormData} name='previousrole' value={preCompanyForm.previousrole} type='text' className='' ></Input>
                                                        </div>
                                                        <div className=' w-full h-full '>
                                                            <h1>Year of excellence</h1>
                                                            <Input onChange={PreviousCompanyFormData} name='yearofexcellence' value={preCompanyForm.yearofexcellence} type='text' className='' ></Input>
                                                        </div>
                                                        <DialogClose>
                                                            <Button onClick={submitPrecompanyData} className=' w-full h-full'>Submit</Button>
                                                        </DialogClose>
                                                    </div>

                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                            </> : ""
                        }
                        {/* <Input type="checkbox" name='previouscompany' placeholder='Optional' value={formData.previouscompany} onChange={handleChange}  ></Input>
                        <Input type="checkbox" name='previouscompany' placeholder='Optional' value={formData.previouscompany} onChange={handleChange}  ></Input> */}
                    </div>

                    <div>
                        <label htmlFor="interestedFiels">Interested Field</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="interestedFiels" value={formData.interestedFiels} id="" onChange={handleChange}>

                            {
                                interestedFields.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <div>
                        <label htmlFor="interestedEmploymentType">Interested Employement Type</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="interestedEmploymentType" value={formData.interestedEmploymentType} id="" onChange={handleChange}>

                            {
                                interestedEmploymentTypes.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <div>
                        <label htmlFor="expectedPositionLevel">Expected Position Level</label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="expectedPositionLevel" value={formData.expectedPositionLevel} id="" onChange={handleChange}>

                            {
                                expectedPositionLevels.map((item, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="picture">Upload CV</Label>
                        <CldUploadButton
                            className=' w-full text-left border-2 p-1 rounded-md '
                            onSuccess={uploadCV}
                            uploadPreset="wyyzhuyo"

                        />
                        {
                            cv ? <p className=' text-green-600 text-left'>upload successfully</p> : <p className=' text-red-700 text-left '>please upload cv in (.jpg/png) </p>
                        }
                    </div>
                    <div>
                        <Button onClick={() => { SubmitData() }}>  Continue ⏩ 🚀⏩</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default userInformation