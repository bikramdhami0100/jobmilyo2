import Usersignup from '@/app/mongodb/SignUpSchema'; // Importing the User schema for database interaction
import mongodbconn from '@/app/mongodb/connection'; // Importing the database connection
import { NextResponse, NextRequest } from 'next/server'; // Importing response/request handlers for Next.js
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const bcrypt = require('bcryptjs'); // Bcrypt for hashing passwords
var jwt = require('jsonwebtoken'); // JSON Web Token for token generation

// Handles POST requests to /api
export async function POST(request:NextRequest) {
    try {
        // Ensuring database connection is established
        const connection = await mongodbconn;

        // Parsing the incoming request body (user data)
        const user = await request.json();
        console.log(user);

        // Extracting user details
        const name = user.fullname;
        const email = user.email;
        const userpassword = user.password;

        // Hashing the user password using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(userpassword, salt);
        console.log(hashpass);

        // Function to generate a random color code for the user
        function generateRandomColorCode() {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return `#${randomColor.padStart(6, '0')}`;
        }

        // Generating a random color code for the new user
        const randomColorCode = generateRandomColorCode();

        // Creating a new user instance using the imported schema
        const newUser = new Usersignup({
            fullName: name,
            color: randomColorCode,
            email: email,
            password: hashpass,
            userVerify: false, // Default user verification status
            admin: false, // Default admin status
        });

        // Generating a JWT token for email verification
        let token = jwt.sign(
            { encodeemail: email, role: 'user' }, // Payload
            'secretkeybikramdhami', // Secret key (use environment variable in production)
            { expiresIn: '1d' } // Token expiration
        );

        // Saving the user to the database
        const userdata = await newUser.save();
        console.log('User saved successfully');

        // Configuring Nodemailer transporter for email sending
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // For port 587, use secure=false
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER!, // Email sender's address from environment variable
                pass: process.env.MEXT_PUBLIC_EMAIL_PASS!, // Email sender's password from environment variable
            },
        });

        // Sending the email
        const mail = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender's email address
            to: email, // Recipient's email address
            subject: `Welcome to Our Platform, ${name}!`, // Subject of the email
            html: `
            <p>Hi ${name},</p>
            <p>Thank you for signing up!</p>
            <p>Please click the link below to verify your email:</p>
            <a href='${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/signup/${token}'>Verify Your Email</a>
            `,
        });

        // Sending success response
        return NextResponse.json({
            message: "Success: Email was sent",
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error('Error:', error);
        // Sending error response
        return NextResponse.json({
            message: "Error: Could not process the request",
            status: 500,
            error: error,
        });
    }
}

// Handles GET requests to /api
export async function GET(req:NextRequest) {
    return NextResponse.json({ message: "This is the GET route response." });
}
