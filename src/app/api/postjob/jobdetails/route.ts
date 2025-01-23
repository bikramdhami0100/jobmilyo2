import mongodbconn from "@/app/mongodb/connection";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: NextRequest) {
    await mongodbconn;
    const { id } = await req.json();
    const token = await req.cookies?.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
        const received = await UserPostedJob.findById(id).populate({ path: "user", select: "email color fullName" });

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}
