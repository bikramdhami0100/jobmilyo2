
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt=require("jsonwebtoken");

// // part of posted job by user
export async function POST(req:any) {
    await mongodbconn;
    const {form,employerData} = await req.json();
    if(!employerData){
        return NextResponse.json({ message: "Invalid token", status: 401 });

    }
    try {
          // console.log(form.jobtitle)
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
      category: form.category,
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
      user:employerData?._id
    });
  const job=  await received.save()
  return NextResponse.json({ message: "Successfully inserted job", status: 200});

    } catch (error) {
      return NextResponse.json({message:error})
    }
}


export async function GET(req: any) {
  await mongodbconn; // Ensure you have a connection utility

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Invalid token", status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;

    // Fetch and sort data by jobupload
    const jobs = await UserPostedJob.find().sort({ jobupload: -1 }).limit(3).populate({path:"user",select:"fullName  email color"});

    return NextResponse.json({ message: "Successfully fetched jobs", status: 200, data: jobs });
  } catch (error:any) {
    return NextResponse.json({ message: "Error fetching jobs", status: 500, error: error.message });
  }
}
