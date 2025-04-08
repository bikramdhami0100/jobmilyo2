import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
    await mongodbconn;
    const {currentPage, limit,employerId}=await req.json();
    // console.log(first)

    const skip=(currentPage-1)*limit
    try {
        const user=await Usersignup.findById(employerId).select("-password");
        if (user.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
         const applyjob=await UserAppliedJob.find().populate({path:"job", select:"_id company company_logo phonenumber jobtitle email "}).populate({path:"user", select:"fullName email color"}).limit(limit).skip(skip);
         const totalapplydocument=await UserAppliedJob.countDocuments();
         const totalpage=Math.ceil(totalapplydocument/limit);
        //  await applyjob.save();
        return NextResponse.json({message:"your data ",data:applyjob,totalpage:totalpage, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }

    
}