import { ChatSchema } from "@/app/mongodb/ChatSchema";
import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
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
    const receiverId=searchParams.get("id");
    const senderId = searchParams.get("senderId"); // Get senderId from query params

    try {
        const userSignup=await Usersignup.find();
         const newMessage=await ChatSchema.find({$or:[
            {sender:senderId,receiver:receiverId},
            {sender:receiverId,receiver:senderId}
         ]}).populate("sender").populate("receiver");
         console.log(newMessage,"reveiver");

        return NextResponse.json({message:"your data ",new_message:newMessage, status:200})
    } catch (error) {
        return NextResponse.json({message:error, status:404})
    }
}


