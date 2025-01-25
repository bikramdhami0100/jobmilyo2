

import Usersignup from "@/app/mongodb/SignUpSchema";
import UserContact from "@/app/mongodb/UserContacts";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
export async function GET(req:any) {
  await mongodbconn;

const {searchParams}=new URL(req.url);
const id=searchParams.get("id");
  const users = await Usersignup.findById(id).select("-password");
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
 const {id,contact}=await req.json();
  
  try {
    const users = await Usersignup.findById(id).select("-password");
    const createContact=new UserContact({userName:contact?.name,email:contact?.email,message:contact?.message,user:users._id});
   const user=await createContact.save()
  
    return NextResponse.json({ success: true ,  status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
  
}
