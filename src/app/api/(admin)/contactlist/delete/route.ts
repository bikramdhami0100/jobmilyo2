
import Usersignup from "@/app/mongodb/SignUpSchema";
import UserContact from "@/app/mongodb/UserContacts";

import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const { id ,email} = await req.json();
  
  
    try {

         const user=await Usersignup.findOne({ email: email }).select("-password");
        if (user.userType != "admin") {
            return NextResponse.json({ message: "You are not authorized to access this page", status: 403 })
        }
    
        const jobs = await  UserContact.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Successfully inserted job", status: 200,jobs:jobs
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


