import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function PUT(req: any) {
     await mongodbconn;
     const {userType}=await req.json();
     console.log(userType)
     const data=await req.cookies.get("token");
     const token=data.value
    //  console.log(token);
    var decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY!);
// console.log(decoded.encodeemail.email)
const email=decoded.encodeemail.email;
  const result= await Usersignup.findOneAndUpdate({email:email},{userType:userType},{new:true}).select("-password");
     if (!token) {
        return NextResponse.json({ message: "Token not found", status: 400 });
    }
    // console.log(token)
     
        let respon=NextResponse.json({ message: " successfully  ", status: 200,result:result });
        // respon.cookies.set("userinfotoken",token,{httpOnly:true});
        return respon;
 }
 
 export async function GET(req: any) {
    await mongodbconn;
    const {userType}=await req.json();
    console.log(userType)
    const data=await req.cookies.get("token");
    const token=data.value
   //  console.log(token);
   var decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY!);
// console.log(decoded.encodeemail.email)
const email=decoded.encodeemail.email;
 const result= await Usersignup.findOne({email:email}).select("-password");
    if (!token) {
       return NextResponse.json({ message: "Token not found", status: 400 });
   }
   // console.log(token)
    
       let respon=NextResponse.json({ message: " successfully  ", status: 200,result:result });
       // respon.cookies.set("userinfotoken",token,{httpOnly:true});
       return respon;
}