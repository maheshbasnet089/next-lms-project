import dbConnect from "@/database/connection";
import Lesson from "@/database/models/lesson.schema";


export async function createLesson(req:Request){
    try {
        await dbConnect()
        const {title,description,videoUrl,course} = await req.json()
        const data = await Lesson.create({
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

export async function fetchLessons(req:Request){
    try {
        await dbConnect()
        const {courseId} = await req.json()
        const data = await Lesson.find({
            course : courseId
        }).populate("course") // return array []
        if(data.length === 0){
            return Response.json({
                message : "no lessons found"
            },{status:404})
        }
        return Response.json({
            message : "lessons fetched!!", 
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
                message : "no lesson with that id found"
            },{status:404})
        }
        return Response.json({
            message : "lessons fetched!!", 
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