
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(req:any) {
  await mongodbconn;

  const tokendata = await req.cookies.get("token").value;
  const useremail = jwt.verify(tokendata, process.env.TOKEN_SECRETKEY);
  const email = useremail.encodeemail.email;


  try {
        
    const users = await Usersignup.findOne({ email: email }).select("-password");
//   console.log(users);
    return NextResponse.json({ success: true, data: {user:users }, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}

export async function POST(req:any) {
    await mongodbconn;
    const {fullName,color}=await req.json();
    console.log(fullName,color)
    const tokendata = await req.cookies.get("token").value;
    const useremail = jwt.verify(tokendata, process.env.TOKEN_SECRETKEY);
    const email = useremail.encodeemail.email;
  
  
    try {
          
      const users = await Usersignup.findOneAndUpdate({ email: email },{fullName:fullName,color:color},{new:true}).select("-password");
  //   console.log(users);
      return NextResponse.json({ success: true, data: {user:users }, status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, status: 404 });
    }
  }
