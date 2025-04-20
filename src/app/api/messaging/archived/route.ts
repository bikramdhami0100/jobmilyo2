
import Usersignup from "@/app/mongodb/SignUpSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   
    const {searchParams}=new URL(req?.url);

    const userId=searchParams.get("id");

    const userSignUp=await Usersignup.findById(userId).select("-password");
    if(!userSignUp){
        return NextResponse.json({message:"user not found", status:404})
    }

    if(!userSignUp.archive){
        return NextResponse.json({message:"user not archived", status:404})
    }

    return NextResponse.json({message:"your data ",data:userSignUp, status:200})

}
