
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
export async function POST(req: any) {
    await mongodbconn;
    const { id ,adminId} = await req.json();
  

     
    try {
           const user=await  Usersignup.findById(adminId).select("-password");
        if (user.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
    
        const jobs = await UserPostedJob.findByIdAndDelete(id);

  
        return NextResponse.json({
            message: "Successfully delete job", status: 200, joblist: jobs,  });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


