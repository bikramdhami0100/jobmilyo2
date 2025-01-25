import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function POST(req: any) {
    await mongodbconn;
    const {interestedFiels,seekerId} = await req.json();

    const user = await Usersignup.findById(seekerId);

    if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
    }
    try {
        console.log(user)
    const criteria = { 
        interestedFiels, 
        // userId: { $ne: user._id }  // Exclude the current user by user._id
    };
    console.log(criteria)

    const alldata = await UserInformation.find(criteria).populate({
        path: 'userId',
        select: 'color email fullName'  // Only include color, email, and fullName fields
    }).limit(5);

    let respon = NextResponse.json({ message: "Successfully fetched", data: alldata, user:user, status: 200 });
    return respon;
    } catch (error) {
        return NextResponse.json({ message: "Server Error"+error, status: 500 });
        
    }
}
