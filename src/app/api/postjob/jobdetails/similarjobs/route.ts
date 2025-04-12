import mongodbconn from "@/app/mongodb/connection";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await mongodbconn;
    const { jobtitle ,id } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "unauthorized user", status: 401 });
    }
    // jobtitle: string;

    try {

        const received = await UserPostedJob.find({_id:{$ne:id}}).limit(5);

        return NextResponse.json({ message: "Request successful", respondata: received, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 400 });
    }
}
