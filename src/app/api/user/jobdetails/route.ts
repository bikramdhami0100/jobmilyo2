import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await mongodbconn;
    const { id,seekerId } = await req.json();
  
    if (!seekerId) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }
       const userRegiser=await Usersignup.findById(seekerId);
    try {
        const received = await UserPostedJob.findById(id).populate({ path: "user", select: "email color fullName" });

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    await mongodbconn;
    const { id,jobtitle } = await req.json();
 
    if (!id) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }
    try {
        const received = await UserPostedJob.find({_id:{$ne:id},}).limit(5);

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}

export async function GET(req: NextRequest) {
    await mongodbconn;
const {searchParams}=new URL(req.url);
const  postedId=searchParams.get("id")
    if (!postedId) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }
      
    try {
        const received = await UserPostedJob.findById(postedId).populate({ path: "user", select: "email color fullName" });

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}

