import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema 

const courseSchema = new Schema({
    courseName : String, 
    courseDescription : {
        type : String
    }, 
    coursePrice : {
        type : Number
    }, 
    courseDuration : {
        type : String
    }

})

const Course = mongoose.model("Course",courseSchema)
export default Course