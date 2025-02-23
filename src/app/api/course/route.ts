import { createCourse, fetchCourses } from "./course.controller";


export async function POST(req:Request){
  return createCourse(req)
}

export async function GET(){
 return fetchCourses()
}