import Usersignup from '@/app/mongodb/SignUpSchema';
import mongodbconn from '@/app/mongodb/connection';
import { NextResponse, NextRequest } from 'next/server';
const nodemailer=require("nodemailer");
const bcrypt=require("bcryptjs");
var jwt = require('jsonwebtoken');


// Secret key should be stored in environment variable
const SECRET_KEY = process.env.TOKEN_SECRETKEY || 'secretkeybikramdhami';

export async function GET(req:any) {
    await mongodbconn;
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Token not found", status: 400 });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user=decoded.encodeemail;
        // console.log( "user",user)
        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
       
        if (user.userVerify) {
            // const validuser = await Usersignup.findOne({ email:user }).select("-password")
            return NextResponse.json({ message: "User verified successfully", status: 200, user,token });
        } else {
            return NextResponse.json({ message: "User is not verified", status: 401});
        }
    } catch (error) {
        return NextResponse.json({ message: "Invalid token", status: 401 });
    }
}

export async function POST(req:any) {
    await mongodbconn;
    const { femail } = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token) {
        const user = await Usersignup.findOne({ email: femail });

        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }

        const transporter = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure:false, // false for 587, false for other ports
          //   requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        try {
            const mail = await transporter.sendMail({
                // from: myEmail, // Sender address
                from:"jobmilyo@gmail.com",
                to: user.email, // List of recipients
                // replyTo: myEmail,
                subject: `For password reset ${user.email}`,
                html: `
                
                <p>Email: ${user.email} </p>
                <p> Click here to verify: <a href='${process.env.NEXT_PUBLIC_DEPLOY_URL!}/user/forgotpassword/${user._id}' > Verify </a></p>
                `,
            });
            let respon =NextResponse.json({ message: "Success: email sent",status:200,success:true, });
          
            return respon;
    
        } catch (error) {
            console.log(error);
          
            return NextResponse.json({ message: "COULD NOT SEND MESSAGE", status: 500});
        }
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.encodeemail;

        if (femail === email) {
            const user = await Usersignup.findOne({ email });

            if (!user) {
                return NextResponse.json({ message: "User not found", status: 404 });
            }

            if (user.userVerify) {
                return NextResponse.json({ message: "Email verified successfully", status: 200 });
            } else {
                return NextResponse.json({ message: "User is not verified", status: 401, user });
            }
        } else {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Invalid token", status: 401 });
    }
}
