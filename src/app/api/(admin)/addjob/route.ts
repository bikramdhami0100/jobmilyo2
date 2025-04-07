
import AddJob from "@/app/(users)/user/components/AddJobSchema";
import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { Schema } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  await mongodbconn;
  const result=await req.json();

  const data=new AddJob({
    jobtitle:result.jobtitle,
    description:result.description,
    qualification:result.qualification,
    last_date:result.last_date,
    job_type:result.job_type,
    company_logo:result.company_logo,
    email:result.email,
    country:result.country,
    number_of_post:result.number_of_post,
    experience:result.experience,
    specialization_req:result.specialization_req,
    salary:result.salary,
    company:result.company,
    website_url:result.website_url,
    address:result.address,
    state:result.state
  })
  data.save()
  //closed connection after saving the data
   mongodbconn.then((conn:any)=>{
     conn.close();
   })
 return NextResponse.json({message:"success",data:data});
  
}
export async function GET(req:any) {
    await mongodbconn;
   const result=await AddJob.find();
   // Ensure the database connection is properly handled elsewhere if needed

   return NextResponse.json({message:"success",data:result});
    
  }
  





