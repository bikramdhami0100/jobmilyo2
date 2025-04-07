import Usersignup from "@/app/mongodb/SignUpSchema";
import UserPostedJob from "@/app/mongodb/UserPostedJob";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: any) {
    await mongodbconn;
    const { email, password } = await req.json();

    try {
        const bytes = CryptoJS.AES.decrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO_JS!);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        // Find user with password included for validation
        const user = await Usersignup.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }

        if (decryptedPassword !== user.password) {
            return NextResponse.json({ message: "Invalid credentials", status: 401 });
        }

        if (user.userType !== "admin") {
            return NextResponse.json({ message: "Unauthorized access", status: 403 });
        }

        // Convert Mongoose document to a plain object and remove password
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return NextResponse.json({
            message: "Successfully logged in",
            status: 200,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error", status: 500 });
    } 
}