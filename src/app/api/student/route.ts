import { fetchStudents } from "./student.controller";


export async function GET(){
    return fetchStudents()
   }