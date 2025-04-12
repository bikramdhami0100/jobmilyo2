
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const { searchText, page,limit } = await req.json();
    const skip = (page - 1) * limit;
  
    try {

        const searchRegex = new RegExp(searchText, 'i');  // Case-insensitive search
        const jobs = await UserPostedJob.find({
            $or: [
                {postedby:searchRegex},
                { address: searchRegex },

                { company: searchRegex },
                { description: searchRegex },
                { email: searchRegex },
                { experience: searchRegex },
                { industry: searchRegex },
                { interestedEmploymentTypes: searchRegex },
                { category: searchRegex },
                { jobtitle: searchRegex },
                { qualification: searchRegex },
                { salary: searchRegex },
                { site: searchRegex },
                { specialization_req: searchRegex },
                { state: searchRegex },
                { website_url: searchRegex },
                

            ]
     },
    
    
    ).sort({ jobupload: -1 }).populate({ path: "user", select: "fullName  email color" }).skip(skip).limit(limit);


        const totalJobs = await UserPostedJob.countDocuments({
            $or: [
                { address: searchRegex },
                { company: searchRegex },
                { description: searchRegex },
                { email: searchRegex },
                { experience: searchRegex },
                { industry: searchRegex },
                { interestedEmploymentTypes: searchRegex },
                { category: searchRegex },
                { jobtitle: searchRegex },
                { qualification: searchRegex },
                { salary: searchRegex },
                { site: searchRegex },
                { specialization_req: searchRegex },
                { state: searchRegex },
                { website_url: searchRegex }
            ],
          
        });

        return NextResponse.json({
            message: "Successfully inserted job", status: 200, search: jobs, totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page
        });
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}