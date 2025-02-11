
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

export async function PUT(req: any) {
    await mongodbconn;
    
    try {
        const { data, user } = await req.json();
        const userId = user?._id;

        if (!userId) {
            return NextResponse.json({ message: "User ID is required", status: 400 });
        }

        const updatedEntry = await Organization.findOneAndUpdate(
            { user: userId },
            { $set: data }, // Use $set to update specific fields
            { new: true }  // Returns updated document
        );

        if (!updatedEntry) {
            return NextResponse.json({ message: "Entry not found", status: 404 });
        }

        console.log(updatedEntry, "This is updated data");
        return NextResponse.json({ message: "Entry Updated", data: updatedEntry });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ message: "Server Error", status: 500 });
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
