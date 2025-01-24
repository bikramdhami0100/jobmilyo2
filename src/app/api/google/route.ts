
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const data = await req.json();
    try {
         const findExistUser=await Usersignup.findOne({email:data?.email}).select("-password");
         if(findExistUser?.email===data?.email){
            return NextResponse.json({ message: "User Already Exists", status: 200 ,results: findExistUser })
         }

        const employer = new Usersignup({
            fullName: data?.name,
            color: data?.picture,
            email: data?.email,
            password: "null",
            userVerify: data?.email_verified,
            userType: "employer",
        });

        const saveResult = await employer.save();
        console.log(employer)
        return NextResponse.json({ results: saveResult })
    } catch (error) {
        return NextResponse.json({ message: "Server Error", status: 500 })
    }


}



export async function GET(req: any) {
    await mongodbconn;
   const {searchParams}=new URL(req.url);
 const id=await searchParams.get("id");
 console.log(id);
  
    try {
         const findExistUser=await Usersignup.findById(id).select("-password");
         if(!findExistUser?.email){
            return NextResponse.json({ message: "User Not Found ", status: 404})
         }

        return NextResponse.json({ results: findExistUser })
    } catch (error) {
        return NextResponse.json({ message: "Server Error", status: 500 })
    }


}
