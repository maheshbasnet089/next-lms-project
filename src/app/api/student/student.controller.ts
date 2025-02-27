import User, { Role } from "@/database/models/user.schema";



export async function fetchStudents(){
    try {
        const students = await User.find({role:Role.Student})
        if(students.length === 0){
            return Response.json({
                message : "No students found", 
                data : []
            })
        }
        return Response.json({
            message : "Students fetched ", 
            data : students
        })
    } catch (error) {
        console.log(error) 
        return Response.json({
            message : "Something went wrong"
        })
    }
}