

import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

import moment from "moment";

export async function POST(req: any) {
  await mongodbconn;

  // Parse the request body
  const { targetDate } = await req.json();
  console.log("Target Date:", targetDate);

  // Parse the target date to a JavaScript Date object
  const parsedTargetDate = moment(targetDate).toDate();


  try {
    // Verify the token

    // Perform deletion of jobs where last_date is less than or equal to targetDate
    const result = await UserPostedJob.deleteMany({
      last_date: { $lte: parsedTargetDate },
    });

    // Return a success response
    return NextResponse.json({
      message: "Successfully deleted jobs",
      deletedCount: result.deletedCount, // Number of deleted jobs
    });
  } catch (error: any) {
    console.error("Error during job deletion:", error); // Log the error for debugging
    return NextResponse.json({
      message: "An error occurred during job deletion",
      status: 500,
    });
  }
}
