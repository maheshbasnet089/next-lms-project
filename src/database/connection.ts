import mongoose from "mongoose";

const MONGODB_CS = process.env.MONGODB_CS

if(!MONGODB_CS){
    throw new Error("You must provide Mongodb Connection String")
}

const dbConnect = async ()=>{
    if(mongoose.connection.readyState === 1){
        console.log("Database already connected!!")
        return;
    }
    try {
        await mongoose.connect(MONGODB_CS)
        console.log("Database connected successfully 😄")
    } catch (error) {
        console.log("Error connecting.. 😭",error)
    }
}

export default dbConnect

