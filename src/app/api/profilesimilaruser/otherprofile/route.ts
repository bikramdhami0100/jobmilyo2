import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function POST(req: any) {
    await mongodbconn;
    const {id} = await req.json();
    console.log(id, "userinformation");
    const data = await req.cookies.get("token");
    const token = data.value;

    if (!token) {
        return NextResponse.json({ message: "Token not found", status: 400 });
    }

    var decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    let email = decoded.encodeemail.email;

    const user = await Usersignup.findOne({ email });

    if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
    }
    console.log(user)
    // Build query criteria to exclude the current user
   try {
    const otheruserInfo=await UserInformation.findOne({userId:id}).populate({path:"userId",select:"email color fullName"});
    return NextResponse.json({ message: "Successfully fetched", data:otheruserInfo,  status: 200 });
   } catch (error) {
    
   }

    
}
