import mongoose,{Schema} from "mongoose"

enum Status{
    Completed = "completed", 
    Pending = "pending", 
    Failed = "failed"
}

interface IPayment extends Document{
    enrollment : mongoose.Types.ObjectId, 
    amount : number, 
    status : Status, 
    paymentMethod : PaymentMethod
}

export enum PaymentMethod{
    Khalti = "khalti", 
    Esewa = "esewa"
}

const paymentSchema = new Schema<IPayment>({
    enrollment: {
        type : Schema.Types.ObjectId, 
        ref : "Enrollment"
    }, 

    amount : {
        type : Number, 
        required : true
    }, 
    status : {
        type : String, 
        enum : [Status.Completed,Status.Pending, Status.Failed], 
        default : Status.Pending
    }, 
    paymentMethod : {
        type : String, 
        enum : [PaymentMethod.Esewa,PaymentMethod.Khalti], 
        default : PaymentMethod.Esewa
    }
})

const Payment = mongoose.models?.Payment || mongoose.model("Payment",paymentSchema) 
export default Payment