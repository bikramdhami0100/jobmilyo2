import mongodbconn from "@/app/mongodb/connection";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await mongodbconn;

    const {jobId,resume,jobseeker,roomId}=await req.json();
     console.log(jobId,resume,jobseeker);
    try {
         const applyjob=new UserAppliedJob({job:jobId,user:jobseeker,resume:resume,chatEnabled:true,room:roomId});
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
         const applyjob=await UserAppliedJob.find({user:userId}).sort({_id:-1}).populate("job").limit(8);
        return NextResponse.json({message:"your data ",data:applyjob, status:200})
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

export async function PUT(req:NextRequest) {
    await mongodbconn;
    const {searchParams}=new URL(req.url);
    const jobId=searchParams.get("id");
    // console.log(userId)
    try {
         const applyjob=await UserAppliedJob.find({job:jobId}).populate("job").limit(8);
        return NextResponse.json({message:"your data ",data:applyjob, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}
