import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import NextAuth, { Session } from "next-auth";
import { } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

interface IToken{name : string,email:string,picture:string,sub:string,id:string,role:string}
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
            return true
            } catch (error) {
                console.log(error)
                return false
            }
        }, 
      async jwt({token}:{token : IToken}){
        await dbConnect()
        const user = await User.findOne({
            email : token.email
        })
        console.log(user,"USER")
        if(user){
            token.id = user._id
            token.role = user.role
        }
        return token 
      },
       async session({session,token}:{session:Session,token:IToken}){
           if(token){
            session.user.id = token.id; 
            session.user.role = token.role 
           }
          
           return session;
        
        }
    }
}
//@ts-ignore
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}