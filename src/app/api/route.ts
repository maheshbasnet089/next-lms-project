import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";


export async function POST(){
    dbConnect()
    await User.create({
        email : "basnetmanish089@gmail.com", 
        username : "Manish123", 
        googleId : "12423487879234", 
        profileImage : "thisisimage"
    }) 

   
    return Response.json({
        message : "you hit api route"
    },{status : 200})
}


