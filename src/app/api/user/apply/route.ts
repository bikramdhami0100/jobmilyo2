import mongodbconn from "@/app/mongodb/connection";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await mongodbconn;

    const {jobId,resume,seekerId}=await req.json();
  
    try {
         const applyjob=new UserAppliedJob({job:jobId,user:seekerId,resume:resume});
        const data= await applyjob.save();
       
        return NextResponse.json({message:"apply successfully ", status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}

export async function GET(req:NextRequest) {
    await mongodbconn;
    const {searchParams}=new URL(req.url);
    const userId=searchParams.get("id");
    // console.log(userId)
    try {
         const applyjob=await UserAppliedJob.find({user:userId}).populate("job").limit(8);
        //  await applyjob.save();
        // console.log(applyjob,"list")
        return NextResponse.json({message:"your data ",data:applyjob, status:200,userId})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}


export async function DELETE(req:NextRequest) {
    await mongodbconn;
 const {searchParams}=new URL(req.url);
const deleteItemId=searchParams.get("id");
// const seekerId=searchParams.get("seekerId");
    try {
         const applyjob=await UserAppliedJob.findByIdAndDelete(deleteItemId);
        //  await applyjob.save();
        return NextResponse.json({message:"your data ",data:applyjob, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}