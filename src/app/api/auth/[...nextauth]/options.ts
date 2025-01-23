import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const options:NextAuthOptions={
    providers:[
           GithubProvider({
           
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
           }),
           GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
             clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            //  authorization: {
            //     params: {
            //       scope: 'openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read',
            //     },
            //   },    
            })
                    
    ],

    callbacks: {
    async signIn({user,account}:any){
        console.log("user",user)
        console.log("account ",account)
        // const {name,email}=user;
        // if(account.provider==="google"){
        //     try {
        //      const res=   await fetch("http://localhost:3000/api/google",{
        //             method:"POST",
        //             headers:{
        //                 "content-type":"application/json"
        //             },
        //             body:JSON.stringify({name,email})
        //         });
        //         if (res.ok) {
        //             return user;
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        return user;
    }
    }
    
}