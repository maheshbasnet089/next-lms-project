

import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : String, 
    email : String, 
    googleId : {
        type : String, 
    }, 
    profileImage : {
        type : String
    }
})

const User = mongoose.model("User",userSchema)
export default User