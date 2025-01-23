
import mongodbconn from "@/app/mongodb/connection";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: NextRequest) {
    await mongodbconn;

    try {
        const { status,id } = await req.json();
        const usertoken = req.cookies.get("token")?.value;
           console.log(status,id);
        if (!usertoken) {
            return NextResponse.json({ message: "Token not found", status: 401 });
        }

        const decoded = jwt.verify(usertoken, process.env.TOKEN_SECRETKEY);
        
        if (!decoded || !decoded.encodeemail) {
            return NextResponse.json({ message: "Invalid token", status: 401 });
        }

        const user = decoded.encodeemail;
        const userId = user._id;
        console.log(userId,user)
        if (!userId) {
            return NextResponse.json({ message: "Invalid user data", status: 400 });
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
