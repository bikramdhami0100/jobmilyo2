
import { Organization } from "@/app/mongodb/Organization";
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const {data }= await req.json();
    console.log(data)
    try {
        const newEntry=new Organization(data);
        const saveEntry=await newEntry.save();
         console.log(saveEntry)
        return NextResponse.json({message:newEntry})
 
    } catch (error) {
        return NextResponse.json({ message:error, status: 500 })
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
          const organizationData=await Organization.findOne({user:id});
          console.log(organizationData)
        return NextResponse.json({ results: organizationData })
    } catch (error) {
        return NextResponse.json({ message: error, status: 500 })
    }


}
