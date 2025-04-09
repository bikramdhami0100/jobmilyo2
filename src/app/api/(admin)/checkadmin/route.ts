import Usersignup from "@/app/mongodb/SignUpSchema";

import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function GET(req:any) {
  await mongodbconn;


  const { searchParams}=new URL(req.url);
  const id=searchParams.get("id");
  try {
        
    const users = await Usersignup.findById(id).select("-password");
//   console.log(users);
   if(users?.userType=="admin"){
 
    // const totalappliedjob=await 
    return NextResponse.json({ success: true,status: 200 });
   }else{
    return NextResponse.json({ success: false,status: 404 });
   }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}

