import mongodbconn from "@/app/mongodb/connection";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
const jwt=require("jsonwebtoken");
export async function POST(req:NextRequest) {
    await mongodbconn;
    const {id}=await req.json();
    const usertoken=await req.cookies.get("token")?.value;
    const decoded = jwt.verify(usertoken, process.env.TOKEN_SECRETKEY);
    const user=decoded.encodeemail;
    const userId=user._id;
    try {
         const applyjob=await UserAppliedJob.findByIdAndDelete(id);
        //  await applyjob.save();
        return NextResponse.json({message:"your data ",data:applyjob, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}