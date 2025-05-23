import { ChatSchema } from '@/app/mongodb/ChatSchema';
import Usersignup from '@/app/mongodb/SignUpSchema';
import UserAppliedJob from '@/app/mongodb/UserAppliedJobSchema';
import UserPostedJob from '@/app/mongodb/UserPostedJob';
import mongodbconn from '@/app/mongodb/connection';
import { NextResponse, NextRequest } from 'next/server';
// Secret key should be stored in environment variable
const SECRET_KEY = process.env.NEXT_PUBLIC_TOKEN_SECRETKEY || 'secretkeybikramdhami';

export async function GET(req: NextRequest) {
    await mongodbconn;

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID is required", status: 400 });
        }

        const registerJob = await UserPostedJob.find({ user: id });
        // console.log(registerJob, "Registerjob");

        const userApplyList = await UserAppliedJob.find({ user: id }).populate("job");
        const receiverId = userApplyList.map((item) => item?.job);
        const validuser = await Usersignup.findById(id).select("-password");
        const applicationId: any = [];

        const data = await Promise.all(
            receiverId.map(async (item) => {
                applicationId.push(item?._id);
                return await Usersignup.findById(item?.user).select("-password");
            })
        );

        if (userApplyList?.length === 0) {
            const receiverId = registerJob?.map((item) => item?._id);
            const data = await Promise.all(
                receiverId.map(async (item) => {

                    return await UserAppliedJob.find({ job: item });
                })
            );

            const ActualReceiverId = await Promise.all(
                data[0]?.map(async (item) => {
                    applicationId.push(item?.user);
                })
            );

            const realReceiver = await Promise.all(
                applicationId.map(async (item:any) => {
                    return await Usersignup.findById(item).select("-password");
                })
            );

            return NextResponse.json({
                message: "User verified successfully",
                status: 200,
                validuser,
                receivers: realReceiver,
                applicationId,
            });
        }

        return NextResponse.json({
            message: "User verified successfully",
            status: 200,
            validuser,
            receivers: data,
            applicationId,
        });

    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await mongodbconn;

    try {
        const { femail } = await req.json();
        const user = await Usersignup.findOne({ email: femail });

        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }

    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}