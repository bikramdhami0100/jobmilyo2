
import mongodbconn from "@/app/mongodb/connection";
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: NextRequest) {
    await mongodbconn;

    try {
        const { status,id ,email} = await req.json();
        
      const realUser=await  Usersignup.findOne({ email: email }).select("-password");
        if (realUser.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }



        const applyjob = await UserAppliedJob.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );
       await applyjob.save()
        console.log(applyjob)

        if (!applyjob) {
            return NextResponse.json({ message: "Job application not found", status: 404 });
        }

        return NextResponse.json({ message: "Update successfully", data: applyjob, status: 200 });
    } catch (error:any) {
        if (error.name === "JsonWebTokenError") {
            return NextResponse.json({ message: "Invalid token", status: 401 });
        }
        return NextResponse.json({ message: error.message, status: 500 });
    }
}
