import AddJob from "@/app/(users)/user/components/AddJobSchema";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { Schema } from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req:any) {

    await mongodbconn; 
     const data=new URL(req.url);
     const id = data.searchParams.get("jobId");
     console.log("this is id ",id); 

    try {
        const result=await UserPostedJob.findById(id);
        console.log(result);
        return NextResponse.json({message:"success",status:200,data:result});
    } catch (error) {
        
        return NextResponse.json({message:error});
    }
    
  }