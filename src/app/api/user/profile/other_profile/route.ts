import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const {otherInfoId,seekerId} = await req.json();
   console.log(otherInfoId,seekerId)
    const user = await Usersignup.findById(seekerId);

    if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
    }
    console.log(user)
    const otheruserInfo=await UserInformation.findOne({userId:otherInfoId}).populate({path:"userId",select:"email color fullName"});
    console.log(otheruserInfo,"other")
    // Build query criteria to exclude the current user
   try {

    return NextResponse.json({ message: "Successfully fetched", data:otheruserInfo,  status: 200 });
   } catch (error) {
    return NextResponse.json({ message: "Server Error",error  });
   }

}
