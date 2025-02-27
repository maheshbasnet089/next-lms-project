import mongoose,{Schema} from "mongoose";
interface IEnrollment extends Document{
    student : mongoose.Types.ObjectId, 
    course : mongoose.Types.ObjectId, 
    enrolledAt : Date, 
    enrollmentStatus : EnrollmentStatus, 
    whatsapp : string 
}
export enum EnrollmentStatus{
    Approve = "approve", 
    Reject = "reject", 
    Pending = "pending"
}

const enrollmentSchema = new Schema<IEnrollment>({
    student : {
        type : Schema.Types.ObjectId, 
        ref : "User"
    }, 
    course : {
        type : Schema.Types.ObjectId, 
        ref : "Course"
    }, 
    enrolledAt : {
        type : Date, 
        default: Date.now()
    }, 
    enrollmentStatus : {
        type : String, 
        enum : [EnrollmentStatus.Approve,EnrollmentStatus.Reject,EnrollmentStatus.Pending], 
        default : EnrollmentStatus.Pending
    }, 
    whatsapp : String
})

const Enrollment = mongoose.models.Enrollment ||  mongoose.model("Enrollment",enrollmentSchema)
export default Enrollment