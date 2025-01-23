
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req:any) {
  await mongodbconn;
 const {image}=await req.json()
 console.log(image);
  const tokendata = await req.cookies.get("token").value;
  const useremail = jwt.verify(tokendata, process.env.TOKEN_SECRETKEY);
  const email = useremail.encodeemail.email;
  console.log(email)
  const users = await Usersignup.findOneAndUpdate({ email: email },{color:image},{new:true})
  console.log(users);

  try {
        

    return NextResponse.json({ success: true, data: { user:users }, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}

