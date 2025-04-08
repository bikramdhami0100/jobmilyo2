import mongodbconn from '@/app/mongodb/connection';
import Usersignup from '@/app/mongodb/SignUpSchema';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.TOKEN_SECRETKEY || 'secretkeybikramdhami';

export async function GET(req: NextRequest) {
  await mongodbconn;
    const { searchParams } = new URL(req.url);
    const id= searchParams.get("id");
    try {
        const user=await Usersignup.findById(id).select("-password");  
        if(user.userType != "admin") {
            return NextResponse.json({ message: 'You are not authorized to access this page', status: 403 });
        }
        
        if(user){
          mongodbconn.then((conn:any)=>{
            conn.close();
          })
        }
        // Removed client-side code as 'window' is not available in server-side context

    } catch (error) {
        return NextResponse.json({ message: 'Invalid token', status: 401 });
    }
}


