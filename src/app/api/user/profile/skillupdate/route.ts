import Usersignup from "@/app/mongodb/SignUpSchema";
import UserInformation from "@/app/mongodb/UserInformationSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  await mongodbconn;
   const {AddSkillList,id} =await req.json();
   const skills =AddSkillList.map((item:any)=>{
        console.log(item.name)
        return item.name;
   });
  //  let count=0;
   let totalRating = 0;

   AddSkillList.forEach((item:any) => {
     totalRating += item.rating;
   });

 const setvalue=  Math.min(Math.floor(totalRating/AddSkillList.length))
 console.log(setvalue)


  const users = await Usersignup.findById(id).select("-password");
  console.log(users._id);
  try {
        
    // const userallprofiledata = await UserInformation.find({userId:users._id}).populate("userId").select("-password");
    const userallprofiledata = await UserInformation.findOneAndUpdate({userId:users._id},{skills:skills ,useroverallskillrating:setvalue},{new:true}).populate({
      path:"userId",
      select:"fullName color email"
    });
    
    // console.log(userallprofiledata.skills)
    return NextResponse.json({ success: true, data: { userInfos: "userallprofiledata "}, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, status: 404 });
  }
}
