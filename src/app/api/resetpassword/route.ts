import Usersignup from '@/app/mongodb/SignUpSchema';
import mongodbconn from '@/app/mongodb/connection';
import { NextResponse, NextRequest } from 'next/server';
const nodemailer = require("nodemailer");


export async function GET(req: any) {
    await mongodbconn;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const user = await Usersignup.findById(id).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
        return NextResponse.json({ message: "User is verified", status: 200, user });
    } catch (error) {
        return NextResponse.json({ message: "Invalid token", status: 401 });
    }
}

export async function POST(req: any) {
    await mongodbconn;
    const { email } = await req.json();
    const user = await Usersignup.findOne({ email: email });
    if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // false for 587, false for other ports
        //   requireTLS: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER|| "jobmilyo@gmail.com", // your email 
            pass: process.env.NEXT_PUBLIC_EMAIL_PASS ||"hcpe bpii cmgg oznh" //your email password or application specific password
        }
    });

    try {
        const mail = await transporter.sendMail({
            // from: myEmail, // Sender address
            from: "jobmilyo@gmail.com",
            to: user.email, // List of recipients
            // replyTo: myEmail,
            subject: `For password reset ${user.email}`,
            html: `
                
                <p>Email: ${user.email} </p>
                <p> Click here to verify: <a href='${process.env.NEXT_PUBLIC_RESET_PASSWORD!}/user/forgotpassword/${user._id}' > Verify </a></p>
                `,
        });
        let respon = NextResponse.json({ message: "Success: email sent", status: 200, success: true, });

        return respon;

    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "COULD NOT SEND MESSAGE", status: 500 });
    }
}
