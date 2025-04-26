
import { ChatSchema } from "@/app/mongodb/ChatSchema";
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
    
   const receiverId=await ChatSchema.find({sender:userId});
   const collectUniqueReceiverId=receiverId.map((item:any)=>item?.receiver);
   const uniqueReceiverId=collectUniqueReceiverId.filter((item:any,index:any)=>collectUniqueReceiverId.indexOf(item)===index);
    const archivedData=await Usersignup.find({archive:true,_id:{$in:uniqueReceiverId}});
    return NextResponse.json({message:"your data ",data:archivedData, status:200})

}

export async function PUT(req: NextRequest) {
   
    try {
          const {userId,archive}=await req.json();
        const userSignUp=await Usersignup.findByIdAndUpdate(userId,{archive:archive},{new:true});
        return NextResponse.json({message:"your data ",data:userSignUp, status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error, status:404})
    }
}
