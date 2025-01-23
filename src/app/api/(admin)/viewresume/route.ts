import mongodbconn from "@/app/mongodb/connection";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
const jwt=require("jsonwebtoken");
export async function POST(req:NextRequest) {
    await mongodbconn;
    const {currentPage, limit}=await req.json();
    // console.log(first)
    const usertoken=await req.cookies.get("token")?.value;
    const decoded = jwt.verify(usertoken, process.env.TOKEN_SECRETKEY);
    const user=decoded.encodeemail;
    const userId=user._id;
    const skip=(currentPage-1)*limit
    try {
         const applyjob=await UserAppliedJob.find().populate({path:"job", select:"_id company company_logo phonenumber jobtitle email "}).populate({path:"user", select:"fullName email color"}).limit(limit).skip(skip);
         const totalapplydocument=await UserAppliedJob.countDocuments();
         const totalpage=Math.ceil(totalapplydocument/limit);
        //  await applyjob.save();
        return NextResponse.json({message:"your data ",data:applyjob,totalpage:totalpage, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }

    
}