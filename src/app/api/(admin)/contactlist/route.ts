
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserContact from "@/app/mongodb/UserContacts";

import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const { pages,limit ,adminId} = await req.json();
    console.log(pages, limit)
    const skip = (pages - 1) * limit;
  
    const user =await Usersignup.findById(adminId).select("-password");
    if (user.userType != "admin") {
        return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
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
    } finally{
        mongodbconn.then((conn:any)=>{
            conn.close();
          })
    }

}


