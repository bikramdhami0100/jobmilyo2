
import UserContact from "@/app/mongodb/UserContacts";

import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: any) {
    await mongodbconn;
    const { pages,limit } = await req.json();
    console.log(pages, limit)
    const skip = (pages - 1) * limit;
    const token = req.cookies.get("token")?.value;
    // console.log(token)

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;
    if (!token) {
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    try {

    
        const jobs = await  UserContact.find().sort({ jobupload: -1 }).populate({ path: "user", select: "fullName  email color" }).skip(skip).limit(limit);

        
        const totalJobs = await UserContact.countDocuments();

        return NextResponse.json({
            message: "Successfully inserted job", status: 200, contactlist: jobs, totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: pages
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


