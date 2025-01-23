
import UserContact from "@/app/mongodb/UserContacts";

import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req: any) {
    await mongodbconn;
    const { id } = await req.json();
  
    const token = req.cookies.get("token")?.value;
    // console.log(token)

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;
    if (!token) {
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    try {

    
        const jobs = await  UserContact.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Successfully inserted job", status: 200,jobs:jobs
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}


