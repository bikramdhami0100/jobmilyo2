"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { Loader } from 'lucide-react'
function Contact() {

  const { theme } = useTheme();
  const [loader,setLoader]=useState<any>(false)
  const [contactError, setContactError] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const HandleContactFun = (e: any) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    switch (name) {
      case 'name':
        setContactError({
          ...contactError,
          [name]: nameRegex.test(value) ? '' : 'Invalid input'
        });
        break;
      case 'email':
        setContactError({
          ...contactError,
          [name]: emailRegex.test(value) ? '' : 'Invalid Email'
        });
        break;
      default:
        break;
    }
  }

  const UserDetail = async () => {
    try {
      const user = (await axios.get("/api/contact/")).data;
      console.log("this is clg",user)
      setContact({
        name: user?.data?.fullName || '',
        email: user?.data?.email || '',
        message: ''
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    UserDetail()
  }, []);
  const handleSubmit=async()=>{
    setLoader(true)
    const send =(await axios.post("/api/contact/",contact)).data
    console.log("send data",send)
    if(send){
      setLoader(false)
          toast({
          title: "Data submit successfully ",

        })
    }
  }
  // console.log("clg contact " ,contact)
  return (
    <div>
      <div>

        <div className=' w-[98%] flex mb-20  flex-row flex-wrap m-auto justify-around items-center  p-4 h-full'>
          <div className=' w-screen absolute -z-10'>

          </div>
          {/* message section */}
          <div className=' flex flex-col justify-center items-center border w-full md:w-[40%] lg:w-[40%] h-full' >
            <h1 className=' text-3xl font-bold p-2 '>Contact <span className=' text-blue-600'>Us</span></h1>
            <div className=' flex flex-col  gap-2 p-2  w-[70%] '>
              <Input name='name' value={contact.name} placeholder='Name' onChange={HandleContactFun}></Input>
              {contactError.name && <span className="text-red-500">{contactError.name}</span>}
              <Input name='email' value={contact.email} placeholder='Email' onChange={HandleContactFun}></Input>
              {contactError.email && <span className="text-red-500">{contactError.email}</span>}
              <Textarea name='message' value={contact.message} rows={8} placeholder='Message' onChange={HandleContactFun}></Textarea>

              <Button className="  bg-transparent bg-blue-600 w-[70%] m-auto   font-extrabold text-2xl hover:bg-blue-600" onClick={() => {
              handleSubmit()
              }}> { loader&&<Loader className=' animate-spin'/> } Submit</Button>
            </div>
          </div>
          {/* image section */}
          <div>
            <Image src={"/images/contactone.png"} alt="contact image" width={400} height={400} className=' w-[100%] h-[100%] ' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
