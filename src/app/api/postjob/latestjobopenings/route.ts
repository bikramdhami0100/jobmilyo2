
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const { searchText, page,limit } = await req.json();
    const skip = (page - 1) * limit;

    if (!searchText) {
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    try {

        const searchRegex = new RegExp(searchText, 'i');  // Case-insensitive search
        const jobs = await UserPostedJob.find( ).sort({ jobupload: -1 }).populate({ path: "user", select: "fullName  email color" }).skip(skip).limit(limit);
        const totalJobs = await UserPostedJob.countDocuments();

        return NextResponse.json({
            message: "Successfully inserted job", status: 200, search: jobs, totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}