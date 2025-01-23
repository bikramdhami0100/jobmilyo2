"use client";
import { Input } from "@/components/ui/input";
import { CldUploadButton } from "next-cloudinary";
import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";



const UserProfileSetting: React.FC = () => {
  const [user, setUser] = useState<any>();
  // const [editProfile,setEditProfile]=useState();
  const router=useRouter()
  const [editName,setEditName]=useState<any>()
  const [editImage,seteditImage]=useState<string>()
  const [checkImageUpload,setCheckImageUpload]=useState<boolean>(false)

  const handleUploadImage = (result: any) => {
 
    // setcv(result.info.secure_url);
    if (result.info.secure_url) {
       seteditImage(result.info.secure_url);
       setCheckImageUpload(false)
        // toast({
        //     title: "Upload successfully ",
        //     description: "Image upload successfully",
        // })
    }
    // Handle successful upload, e.g., save the URL to state
};

  const fetchUser = async () => {
    const send = (await axios.get("/api/profiledata/signup")).data;
    setUser(send.data.user);
    setEditName(send.data.user.fullName);
      seteditImage(send.data.user.color);
    // console.log(send);
  };
  console.log(editImage)
  useEffect(() => {
    fetchUser();
  }, []);
 const HandlerEditProfile=async()=>{
  const send=(await axios.post("/api/profiledata/signup",{fullName:editName,color:editImage})).data;
  console.log(send)
  if(send.status==200){
    router.push("/user/profile")
  }
 }


  return (
    <div>
      {/* edit profile */}
      <div className="h-full mb-2 w-full md:w-[30%] lg:w-[30%] border shadow-md m-2 p-4">
        <h1 className="text-center">Edit Profile</h1>
        <div className="flex flex-col mb-3 m-auto items-center">
          <p className="text-start self-start ml-[10%] my-1">Full Name</p>
          <Input
            name="fullName"
         
            defaultValue={user?.fullName}
            onChange={(e)=>{
              setEditName(e.target.value)
            }}
            type="text"
            className="w-[80%]"
          />
        </div>

        <div className="flex flex-col mb-3 m-auto mx-[10%]">
          <p className="text-start self-start my-1">Profile Image</p>
           {checkImageUpload&&  <Loader2 className=" animate-spin"/> }
          <CldUploadButton
           onClose={()=>{
            setCheckImageUpload(false)
           }}
           onClick={()=>{
            setCheckImageUpload(true)
           }}
            className="bg-green-600 left-0 w-full text-left border-2 p-1 rounded-md"
            uploadPreset="wyyzhuyo"
            
            onSuccess={handleUploadImage}
          />
        </div>
        <div className="flex flex-col mb-3 m-auto mx-[10%]">
           <Button onClick={HandlerEditProfile}>Submit</Button>
        </div>
      </div>
      {/* 3d animation */}
      <div className="" >
        <div className="canvas"></div>
      </div>
    </div>
  );
};

export default UserProfileSetting;
