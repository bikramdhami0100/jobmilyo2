import Usersignup from '@/app/mongodb/SignUpSchema';
import mongodbconn from '@/app/mongodb/connection';
import { NextResponse, NextRequest } from 'next/server';
const nodemailer = require("nodemailer");


export async function POST(req: any) {
    await mongodbconn;
   const {password,id}=await req.json();


    try {
        const user = await Usersignup.findByIdAndUpdate(id, { password: password }, { new: true });
        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
        return NextResponse.json({ message: "User is verified", status: 200, success:true });

    } catch (error) {
        return NextResponse.json({ message: "Invalid token", status: 401 });
    }
}
