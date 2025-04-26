import Usersignup from "@/app/mongodb/SignUpSchema";
import { NextResponse } from "next/server";

export async function GET(req: any) {
const {searchParams}=new URL(req.url);
const id=searchParams.get("id");
    try {
        const userData=await Usersignup.findById(id).select("-password");

        return NextResponse.json({data:userData,message:"Successfully fetched",status:200});
    } catch (error) {   
        
        return NextResponse.json(error);
    }
}