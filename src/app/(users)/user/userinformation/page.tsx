"use client"
import React, { useEffect, useState } from 'react'
import JobSearcherUserInformation from "../usercomponents/JobSearcherUserInformation"
import axios from 'axios'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import EmployerSection from '../usercomponents/EmployerSection'


function UserInformation() {
 interface UserType {
    color:String,
    email:String,
    fullName:String,
    userType:String,
    userVerify:boolean
 }
//   const [user,setUser]=useState<UserType>();
 const [uservalueType,setUserValueType]=useState <any>("seeker");
 console.log(uservalueType)
  const defaultUserType=async()=>{
      const user=(await axios.put("/api/usertype", {userType:uservalueType})).data
      //  setUser(user?.result);
      console.log(user)
  }
  // console.log(user?.userType)
 useEffect(()=>{
  
   
 uservalueType&&defaultUserType();
 },[uservalueType])
  return (
    <div>
      <Alert>
  {/* <Terminal className="h-4 w-4" /> */}
  <AlertTitle>How are you ?</AlertTitle>
  <AlertDescription>
  <RadioGroup  onValueChange={(value:any)=>{
      setUserValueType(value);
  }} defaultValue={`seeker`}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="seeker" id="seeker" />
    <Label htmlFor="seeker">Job Seeker</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="employer" id="employer" />
    <Label htmlFor="employer">Employer</Label>
  </div>
</RadioGroup>

  </AlertDescription>
</Alert>
    {
      uservalueType === "seeker" || null || undefined? <JobSearcherUserInformation/> : <div>
        <EmployerSection/>
      </div> 
    }
        
      {/* <JobSearcherUserInformation /> */}
    </div>
  )
}

export default UserInformation