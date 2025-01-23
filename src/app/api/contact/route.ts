

import Usersignup from "@/app/mongodb/SignUpSchema";
import UserContact from "@/app/mongodb/UserContacts";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(req:any) {
  await mongodbconn;

  const tokendata = await req.cookies.get("token").value;
  const useremail = jwt.verify(tokendata, process.env.NEXT_PUBLIC_TOKEN_SECRETKEY!);
  const email = useremail.encodeemail.email;

  const users = await Usersignup.findOne({ email: email }).select("-password");
  console.log(users);
  try {
        
  
    return NextResponse.json({ success: true, data:users , status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}

// post 
export async function POST(req:any) {
  await mongodbconn;
 const data=await req.json();
 console.log(data)
  const tokendata = await req.cookies.get("token").value;
  const useremail = jwt.verify(tokendata, process.env.TOKEN_SECRETKEY);
  const email = useremail.encodeemail.email;

  const users = await Usersignup.findOne({ email: email }).select("-password");
  console.log(users);
  const createContact=new UserContact({userName:data.name,email:data.email,message:data.message,user:users._id});
 const contact=await createContact.save()
 console.log(contact)
  try {
        
    return NextResponse.json({ success: true ,  status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}
