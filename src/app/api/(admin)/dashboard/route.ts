import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import UserContact from "@/app/mongodb/UserContacts";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await mongodbconn; // ✅ Call the function

    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId");

    const users = await Usersignup.findById(adminId).select("-password");

    if (users?.userType === "admin") {
      const totaluser = await Usersignup.countDocuments();
      const totalpostedjob = await UserPostedJob.countDocuments();
      const totalContactUser = await UserContact.countDocuments();
      const totalAppliedjob = await UserAppliedJob.countDocuments();

      return NextResponse.json({
        success: true,
        data: {
          user: users,
          totaluser,
          totaljob: totalpostedjob,
          totalContactuser: totalContactUser,
          totalAppliedjob,
        },
        status: 200,
      });
    } else {
      return NextResponse.json({ success: false, message: "Unauthorized", status: 403 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ success: false, status: 500 });
  } 
}
