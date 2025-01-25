import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

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
    const { seekerId ,id,jobtitle } = await req.json();
 
    if (!seekerId) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }
    // jobtitle: string;

    try {
        const received = await UserPostedJob.find({_id:{$ne:id},}).limit(5);

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}

