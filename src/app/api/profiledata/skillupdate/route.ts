import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req:any) {
  await mongodbconn;
   const bskill=await req.json();
   const skills =bskill.map((item:any)=>{
        console.log(item.name)
        return item.name;
   });
  //  let count=0;
   let totalRating = 0;

   bskill.forEach((item:any) => {
     totalRating += item.rating;
   });

 const setvalue=  Math.min(Math.floor(totalRating/bskill.length))
 console.log(setvalue)
  const tokendata = await req.cookies.get("token").value;
  const useremail = jwt.verify(tokendata, process.env.TOKEN_SECRETKEY);
  const email = useremail.encodeemail.email;

  const users = await Usersignup.findOne({ email: email }).select("-password");
  console.log(users._id);
  try {
        
    // const userallprofiledata = await UserInformation.find({userId:users._id}).populate("userId").select("-password");
    const userallprofiledata = await UserInformation.findOneAndUpdate({userId:users._id},{skills:skills ,useroverallskillrating:setvalue},{new:true}).populate({
      path:"userId",
      select:"fullName color email"
    });
    
    // console.log(userallprofiledata.skills)
    return NextResponse.json({ success: true, data: { userInfos: userallprofiledata }, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}
