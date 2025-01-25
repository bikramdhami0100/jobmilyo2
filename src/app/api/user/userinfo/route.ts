import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await mongodbconn;
    const userinformation = await req.json();
     console.log(userinformation)
     console.log(userinformation?.userId,"tid ")
    if (!userinformation?.userId) {
        return NextResponse.json({ message: "Invalid", status: 400 });
    }

    const user = await Usersignup.findById(userinformation?.userId);
    if (!user) {
        return NextResponse.json({ message: "Invalid", status: 404 });
    }
    console.log(user)
    let userId = user._id;
    console.log(user)
    try {
        const newUserInfo = new UserInformation({
            userId: userId,
            fname: userinformation.fname,
            gender: userinformation.gender,
            phone: userinformation.phone,
            PermanentAddress: userinformation.PermanentAddress,
            CurrentAddress: userinformation.CurrentAddress,
            boardName: userinformation.boardName,
            level: userinformation.level,
            faculity: userinformation.faculity,
            educationtype: userinformation.educationtype,
            marksheet: userinformation.marksheet,
            previouscompany: userinformation?.previouscompany||"",
            previousrole: userinformation?.previousrole ||"",
            interestedCategory: userinformation.interestedCategory,
            interestedFiels: userinformation.interestedFiels,
            interestedEmploymentType: userinformation.interestedEmploymentType,
            expectedPositionLevel: userinformation.expectedPositionLevel,
            uploadCV: userinformation.uploadCV,
            skills: userinformation.skills,
            dateofBirth: userinformation.dateofBirth
        });

        let userinforesult = await newUserInfo.save();
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, status: 422 });
    }
    let respon = NextResponse.json({ message: " successfully inserted ", status: 200 });
    // respon.cookies.set("userinfotoken",token,{httpOnly:true});
    return respon;
}

export async function GET(req:any) {
  await mongodbconn;
  const {searchParams}=new URL(req.url);
  const id=searchParams.get("id");
  const users = await Usersignup.findById(id).select("-password");
  try {
    const userallprofiledata = await UserInformation.findOne({userId:users._id}).select("phone userId");
    return NextResponse.json({ success: true, data: userallprofiledata,userType:users?.userType ,status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}
