import { ChatSchema } from "@/app/mongodb/ChatSchema";
import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await mongodbconn;

    const {sender,receiver,message,roomId}=await req.json();
    try {
         const chat=new ChatSchema({sender,receiver,message,room:roomId});
         const data= await chat.save();
       
        return NextResponse.json({message:"apply successfully ", status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}

export async function GET(req:NextRequest) {
    await mongodbconn;
    const {searchParams}=new URL(req?.url);
    const roomId=searchParams.get("id");
    
    try {
        const userSignup=await Usersignup.find();
         const newMessage=await ChatSchema.find({room:roomId}).populate("sender");
        return NextResponse.json({message:"your data ",new_message:newMessage, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}


