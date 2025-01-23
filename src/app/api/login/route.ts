
var jwt =require("jsonwebtoken");
const bcrypt = require('bcrypt');
var nodemailer =require("nodemailer");


import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  await mongodbconn;
  const { loginemail, loginpassword,email_verified,name,picture } = await req.json();
  const token = req.cookies.get("token")?.value;
  
  try {
    const user = await Usersignup.findOne({ email: loginemail });
    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }


    if (!token) {
      if (!user.userVerify) {
        // User is not verified, send verification email
        const newToken = jwt.sign(
          { encodeemail: loginemail, role: 'user' },
          process.env.NEXT_PUBLIC_TOKEN_SECRETKEY,
          { expiresIn: '7d' }
        );

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: loginemail,
          subject: "Verify your email",
          html: `
            <p>Name: ${user.fullName}</p>
            <p>Email: ${loginemail}</p>
            <p>Click here to verify: <a href='${process.env.NEXT_PUBLIC_DEPLOY_URL!}/user/signup/${newToken}'>Verify</a></p>
          `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({
          message: "Check your email to verify your account",
          success: true,
          status: 200,
        });
      }
      const isPasswordValid = bcrypt.compareSync(loginpassword, user.password);
      if (isPasswordValid) {
        const userWithoutPassword = await Usersignup.findOne({ email: loginemail }).select("-password");
        const newToken = jwt.sign(
          { encodeemail: userWithoutPassword, role: 'user' },
          process.env.TOKEN_SECRETKEY,
          { expiresIn: '7d' }
        );

        const response = NextResponse.json({ message: "User verified successfully", status: 200,user:userWithoutPassword });
        response.cookies.set("token", newToken, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({ message: "Bad credentials", status: 401 });
      }
    } else {
      // Token is provided
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRETKEY);
      const userEmail = decoded.encodeemail;
    //  console.log(userEmail)
      const userWithToken = await Usersignup.findOne({ email: userEmail });
      //  console.log("user with token ",userWithToken)
      if (!userWithToken) {
        return NextResponse.json({ message: "User not found", status: 404 });
      }
      if (userWithToken.userVerify) {
       const isPasswordValid=await  bcrypt.compare(loginpassword, userWithToken.password).then(function(result:any) {
         console.log("this is result ",result)
      });
        if (isPasswordValid) {
          const userwithoutpassword = await Usersignup.findOne({ email: userEmail });
          return NextResponse.json({ message: "User verified successfully", status: 200,user:userwithoutpassword });
        } else {
          return NextResponse.json({ message: "Bad credentials", status: 401 });
        }
      } else {
        return NextResponse.json({ message: "User is not verified", status: 401 });
      }
    }
  

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  } finally{
    if(!email_verified){
      return NextResponse.json({message:"Not found"})
    }
    if(email_verified){
      const newData=new Usersignup({

        fullName:name,
        color:picture,
        email:loginemail,
        password:"null",
        userVerify:email_verified,
      });
      const result=await newData.save();
      return NextResponse.json({message:"User Login Successfully ",status:202,data:result});
    }
  }
}
