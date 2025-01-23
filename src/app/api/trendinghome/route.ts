import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
// import { UserPostedJob } from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt=require("jsonwebtoken");

// // part of posted job by user
export async function POST(req:any) {
    await mongodbconn;
    const form = await req.json();
    console.log(form.rating)
    const token = req.cookies.get("token")?.value;
    console.log(token)
    
    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;
    const allowuser=await Usersignup.find({email:userdetail.email});
    if(!token){
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    console.log(form.jobtitle)
    const received = new UserPostedJob({
        jobtitle: form.jobtitle,
        phonenumber:form.phonenumber,
        site: form.site,
        description: form.description,
        no_of_workingemployee: form.no_of_workingemployee,
        no_of_office: form.no_of_office,
        industry: form.industry,
        qualification: form.qualification,
        interestedEmploymentTypes: form.interestedEmploymentTypes,
        no_vacancy: form.no_vacancy,
        last_date: form.last_date,
        job_type: form.category,
        company_logo: form.company_logo,
        email: form.email,
        country: form.country,
        experience: form.experience,
        specialization_req: form.specialization_req,
        salary: form.salary,
        company: form.company,
        website_url: form.website_url,
        address: form.address,
        state: form.state,
        rating:form.rating,
        user:userdetail._id
      });
    const job=  await received.save()
    console.log("job",job)
    return NextResponse.json({ message: "Successfully inserted job", status: 200, postjob:job });
    // try {
    // } catch (error) {
    // }
}

export async function GET(req: any) {
  await mongodbconn; // Ensure you have a connection utility

//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Invalid token", status: 401 });
//   }

  try {
    // const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    // const userdetail = decoded.encodeemail;

    // Fetch and sort data by jobupload
    const minRating=4;
    const jobs = await UserPostedJob.find({rating: { $gte: minRating }}).sort({ jobupload: -1 }).limit(8).populate({path:"user",select:"fullName  color"});

    return NextResponse.json({ message: "Successfully fetched jobs", status: 200, data: jobs });
  } catch (error:any) {
    return NextResponse.json({ message: "Error fetching jobs", status: 500, error: error.message });
  }
}
