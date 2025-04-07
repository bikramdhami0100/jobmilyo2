
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: any) {
    await mongodbconn;
    const { page, limit, email } = await req.json();
    console.log(page, limit)
    const skip = (page - 1) * limit;


    try {
        const user = await Usersignup.findOne({ email: email }).select("-password");
        if (user.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
        const jobs = await UserPostedJob.find().sort({ jobupload: -1 }).populate({ path: "user", select: "fullName  email color" }).skip(skip).limit(limit);


        const totalJobs = await UserPostedJob.countDocuments();

        return NextResponse.json({
            message: "Successfully inserted job", status: 200, joblist: jobs, totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


