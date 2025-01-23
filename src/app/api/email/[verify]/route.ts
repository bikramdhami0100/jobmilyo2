import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function POST(req: any) {
     await mongodbconn;
     const data=await req.json();
   //   console.log(data);
     const token=data.token
     if (!token) {
        return NextResponse.json({ message: "Token not found", status: 400 });
    }

     var decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
     let  email = decoded.encodeemail;
     const user = await Usersignup.findOneAndUpdate(
            { email },
            { userVerify: true},
            { new: true }
        ).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
        var newtoken = jwt.sign({ encodeemail: user }, process.env.TOKEN_SECRETKEY);
        let respon=NextResponse.json({ message: "User verified successfully", status: 200 });
        respon.cookies.set("token",newtoken,{httpOnly:true});
        return respon;
   //  return NextResponse.json("hello");
 }
 