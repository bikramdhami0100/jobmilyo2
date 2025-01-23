import Usersignup from "@/app/mongodb/SignUpSchema";
import mongodbconn from "@/app/mongodb/connection";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
export async function POST(req: any) {
    await mongodbconn;
    const { password, id } = await req.json();
    console.log(password, id);
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        const user = await Usersignup.findByIdAndUpdate(id, { password: hash }, { new: true });

        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }


        let respon = NextResponse.json({ message: "Password update successfully", status: 200, user });
        return respon;
    } catch (error) {
    return NextResponse.json({message:error})
    }
}
