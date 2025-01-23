
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: any) {
    await mongodbconn;
    const { id,jobData } = await req.json();
    console.log(id,"this is id");
    console.log("this is jobdata",jobData);
    const token = req.cookies.get("token")?.value;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;
    if (!token) {
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    try {

    
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


