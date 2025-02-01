import mongoose, { Schema } from 'mongoose'

interface ICourse extends Document{
    title : string, 
    description : string, 
    price : number,
    duration : string, 
    category : mongoose.Types.ObjectId, 
    lessons : mongoose.Types.ObjectId[], 
    createdAt : Date
}
const courseSchema = new Schema<ICourse>({
    title : {
        type : String, 
        required : true 
    }, 
    description : {
        type : String, 
        required : true 
    }, 
    price : {
        type : Number, 
        required : true
    }, 
    duration : {
        type : String, 
        required : true
    }, 
    category : {
        type : Schema.Types.ObjectId, 
        ref : "Category"
    }, 
    lessons : [
        {
            type : Schema.Types.ObjectId, 
            ref : "Lesson"
        }
    ], 
    createdAt : {
        type : Date, 
        default : Date.now()
    }
    
})

const Course = mongoose.models.Course ||  mongoose.model("Course",courseSchema)
export default Course