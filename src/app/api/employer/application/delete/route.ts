import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
    await mongodbconn;
    const {id,employerId}=await req.json();
    try {
        const existUser=await Usersignup.findById(employerId).select("-password");
        if (existUser.userType != "admin") {    
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
        const data=await UserAppliedJob.findByIdAndDelete(id);
        return NextResponse.json({message:"your data ",data:data,status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    } 
}