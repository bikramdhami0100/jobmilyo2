import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function POST(req: any) {
    await mongodbconn;
    const userinformation = await req.json();
    console.log(userinformation, "userinformation");
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
    const criteria = { 
        ...userinformation, 
        userId: { $ne: user._id }  // Exclude the current user by user._id
    };

    const alldata = await UserInformation.find(criteria).populate({
        path: 'userId',
        select: 'color email fullName'  // Only include color, email, and fullName fields
    }).limit(5);

    let respon = NextResponse.json({ message: "Successfully fetched", data: alldata, user:user, status: 200 });
    return respon;
}
