import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(req: any) {
     await mongodbconn;
     const {userType,id}=await req.json();

  const result= await Usersignup.findByIdAndUpdate(id,{userType:userType},{new:true}).select("-password");

        let respon=NextResponse.json({ message: " successfully  ", status: 200,result:result });

        return respon;
 }
 
 export async function GET(req: any) {
    await mongodbconn;
    const {userType}=await req.json();

 const result= await Usersignup.findOne().select("-password");

       let respon=NextResponse.json({ message: " successfully  ", status: 200,result:result });
       // respon.cookies.set("userinfotoken",token,{httpOnly:true});
       return respon;
}