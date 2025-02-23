import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";


export async function createLesson(req:Request){
    try {
        await dbConnect()
        const {title,description,videoUrl,course} = await req.json()
        const data = await Course.create({
            title, 
            description , 
            videoUrl, 
            course
        })
        return Response.json({
            message : "Lesson created!!", 
            data 
        },{status:201})

    } catch (error) {
        console.log(error)
        return Response.json({
            message : 'Something went wrong'
        },{status : 500})
    }
}

export async function fetchLessons(){
    try {
        await dbConnect()
        const data = await Lesson.find().populate("course") // return array []
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
export async function fetchLesson(id:string){
    try {
        await dbConnect()
        const data = await Lesson.findById(id) // returns in object
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

export async function deleteLesson(id:string){
    try {
        await dbConnect()
        await Lesson.findByIdAndDelete(id) // returns in object
        return Response.json({
            message : "lesson deleted!!", 
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong"
        },{status : 500})
    }
}