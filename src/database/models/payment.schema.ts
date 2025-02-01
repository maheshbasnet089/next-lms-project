import mongoose,{Schema} from "mongoose"

enum Status{
    Completed = "completed", 
    Pending = "pending", 
    Failed = "failed"
}

interface IPayment extends Document{
    student : mongoose.Types.ObjectId, 
    course : mongoose.Types.ObjectId, 
    amount : number, 
    status : Status
}

const paymentSchema = new Schema<IPayment>({
    student : {
        type : Schema.Types.ObjectId, 
        ref : "User"
    }, 
    course : {
        type : Schema.Types.ObjectId, 
        ref : "Course"
    }, 
    amount : {
        type : Number, 
        required : true
    }, 
    status : {
        type : String, 
        enum : [Status.Completed,Status.Pending, Status.Failed], 
        default : Status.Pending
    }
})

const Payment = mongoose.model("Payment",paymentSchema)
export default Payment