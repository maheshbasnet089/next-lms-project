"use client"
import { useEffect } from "react"
import CourseCard from "./components/courseCard"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCourses } from "@/store/courses/courseSlice"


function Courses(){
    const {courses} = useAppSelector((store)=>store.courses)
    const dispatch = useAppDispatch()
    useEffect(()=>{
    dispatch(fetchCourses())
    },[])
    return (
        <div className="flex justify-evenly flex-wrap">
            {
                courses.length > 0 && courses.map((course)=>{
                    return ( 
                        <CourseCard key={course._id} course={course} />

                    )
                })
            }

      
        </div>
    )
}

export default Courses