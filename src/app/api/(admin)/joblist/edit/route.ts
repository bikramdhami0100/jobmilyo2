
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const { id,jobData,adminId } = await req.json();
   
  
    try {

        const user =await  Usersignup.findById(adminId).select("-password");
        if (user.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
        const jobs = await UserPostedJob.findByIdAndUpdate(id,{
            jobtitle:jobData.jobtitle,
            number_of_post:jobData.number_of_post,
            qualification:jobData.qualification,
            experience:jobData.experience,
            last_date:jobData.last_date,
            company:jobData.company,
            state:jobData.state
        },{new:true}).sort({ jobupload: -1 });
        return NextResponse.json({
            message: "Successfully inserted job", status: 200, 
          data:jobs
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


