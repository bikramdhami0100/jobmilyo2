

import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import moment from "moment";

export async function POST(req: any) {
  await mongodbconn;

  // Parse the request body
  const { targetDate } = await req.json();
  console.log("Target Date:", targetDate);

  // Parse the target date to a JavaScript Date object
  const parsedTargetDate = moment(targetDate).toDate();

  // Access token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Invalid token", status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userdetail = decoded.encodeemail;

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
