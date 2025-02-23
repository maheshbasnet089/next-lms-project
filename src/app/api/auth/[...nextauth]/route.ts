import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import NextAuth from "next-auth";
import { } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

//@ts-ignore
export const authOptions:AuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }), 
    ], 
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
       async signIn({user}:{user : {name : string, email : string, image : string}}) : Promise<boolean>{
            try {
                await dbConnect()
               const existingUser = await User.findOne({email : user.email}) // return object {username : "sdfdf",email:"sdf"} , {}\
            
               if(!existingUser){
                await User.create({
                    username : user.name, 
                    email : user.email, 
                    profileImage : user.image,
                })
            }
            console.log(existingUser,"EU")
            return true
            } catch (error) {
                console.log(error)
                return false
            }
        }, 
        async jwt({ token }:{token:{id:string,role:string,email:string}}) {
            console.log("TOKEN",token)
            await dbConnect();
            const user = await User.findOne({ email: token.email });

            if (user) {
                token.id = user._id;
                token.role = user.role || "student"; 
            }
            return token;
        },
             // @ts-ignore
             async session({ session, token }) {
                if (token) {
                    session.user.id = token.id;
                    session.user.role = token.role || "student"; 
                }
                return session;
            },
    
    }
}
//@ts-ignore
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}