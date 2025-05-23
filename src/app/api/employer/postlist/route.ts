import Usersignup from "@/app/mongodb/SignUpSchema";
import UserAppliedJob from "@/app/mongodb/UserAppliedJobSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const id=req.nextUrl.searchParams.get("id");
    if(!id){
        return NextResponse.json({message:"Some error due to "})
    }

    try {
        const user = await Usersignup.findById(id).sort({ jobupload: -1 }).select("-password");
        const userId = user._id;
        const postlist = await UserPostedJob.find({ user: userId });

        return NextResponse.json({ message: "data fetch successfully", data: postlist, user: user });

    } catch (error) {
        return NextResponse.json({ message: "error occure", error })
    }
}
export async function PUT(req: NextRequest) {
    const id= req.nextUrl.searchParams.get("id");
    const data=await req.json();
    console.log(data,"data from put method");
    console.log(id , "this is id from put method");
    if(id){
       try {
        const itemdata=await UserPostedJob.findByIdAndUpdate(id,data,{new:true});

        return NextResponse.json({message:"item findby id",status:200, data:itemdata});
       } catch (error) {
        return NextResponse.json({message:"failed due to ",error})
       }
    }

}
export async function DELETE(req: NextRequest) {
    const id= req.nextUrl.searchParams.get("id");

    if(id){
       try {
        // const itemdata=await UserPostedJob.findByIdAndUpdate(id{new:true});
        // const existUser=await UserPostedJob.findById(id);
        const applyExist=await UserAppliedJob.deleteMany({job:id});
         const itemdelete=await UserPostedJob.findByIdAndDelete(id);
         
        return NextResponse.json({message:"item findby id",status:200});
       } catch (error) {
        return NextResponse.json({message:"failed due to ",error})
       }
    }

}
