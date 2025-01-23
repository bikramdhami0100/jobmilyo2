import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    await mongodbconn;
    // const {name,email}=await req.json()
    // const user =new Usersignup({
    //     fullName:name,
    //     email:email,
    //     color:
    // })

     return NextResponse.json({message:"hello world"})
}