import { createLesson, fetchLessons } from "./lesson.controller"


export async function POST(req:Request){
  return createLesson(req)
}

export async function GET(req:Request){
 return fetchLessons(req)
}