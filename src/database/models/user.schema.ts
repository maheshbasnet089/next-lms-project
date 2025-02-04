

import mongoose from "mongoose";
const Schema = mongoose.Schema

export enum Role{
    Student = "student",
    Admin = "admin"
}

export interface IUser extends Document{
    username : string, 
    profileImage : string, 
    email : string, 
    role : Role
}

const userSchema = new Schema<IUser>({
    username : {
        type : String, 
        required : true 
    }, 
    email : {
        type : String, 
        required : true
    }, 
    role : {
        type : String, 
        enum : [Role.Student,Role.Admin], 
        default : Role.Student
    }, 
    profileImage : String

})

const User = mongoose.models.User ||  mongoose.model("User",userSchema)
export default User