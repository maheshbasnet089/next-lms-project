import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";


export async function createCourse(req:Request){
    try {
        await dbConnect()
        const {title,description,price,duration,category} = await req.json()
        const createdData = await Course.create({
            title, 
            description , 
            price  ,
            duration, 
            category
        })
        const data = await Course.findById(createdData._id).populate("category")
        return Response.json({
            message : "Course created!!", 
            data 
        },{status:201})

    } catch (error) {
        console.log(error)
        return Response.json({
            message : 'Something went wrong'
        },{status : 500})
    }
}

export async function fetchCourses(){
    try {
        await dbConnect()
        const data = await Course.find().populate("category") // return array []
        if(data.length === 0){
            return Response.json({
                message : "no course found"
            },{status:404})
        }
        return Response.json({
            message : "courses fetched!!", 
            data
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong"
        },{status : 500})
    }
}
export async function fetchCourse(id:string){
    try {
        await dbConnect()
        const data = await Course.findById(id) // returns in object
        if(!data){
            return Response.json({
                message : "no course with that id found"
            },{status:404})
        }
        return Response.json({
            message : "courses fetched!!", 
            data
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong"
        },{status : 500})
    }
}

export async function deleteCourse(id:string){
    try {
        await dbConnect()
        await Course.findByIdAndDelete(id) // returns in object
        // delete lessons too 
        await Lesson.deleteMany({course:id})
        return Response.json({
            message : "courses deleted!!", 
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong"
        },{status : 500})
    }
}