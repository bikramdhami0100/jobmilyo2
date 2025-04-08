
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function GET(req:any) {
  await mongodbconn;
  const {searchParams}=new URL(req.url);
  const id=searchParams.get("id");
  try {
        
    const users = await Usersignup.findById(id).select("-password");
//   console.log(users);
    return NextResponse.json({ success: true, data: {user:users }, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}

export async function POST(req:any) {
    await mongodbconn;
    const {fullName,color,id}=await req.json();
    console.log(fullName,color)

  
    try {
          
      const users = await Usersignup.findByIdAndUpdate(id,{fullName:fullName,color:color},{new:true}).select("-password");
  //   console.log(users);
      return NextResponse.json({ success: true, data: {user:users }, status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, status: 404 });
    }
  }
