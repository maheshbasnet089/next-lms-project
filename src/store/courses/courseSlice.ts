import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { ICourse, ICourseForData, IInitialData } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";


const data:IInitialData = {
    courses : [], 
    status : Status.Loading
}


const courseSlice = createSlice({
    name : "courses", 
    initialState : data, 
    reducers : {
        setStatus(state:IInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setCourses(state:IInitialData,action:PayloadAction<ICourse[]>){
            state.courses = action.payload
        }
    }
})
const {setCourses,setStatus} = courseSlice.actions
export default courseSlice.reducer

export function fetchCourses(){
    return async function fetchCoursesThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/course")
            if(response.status == 200){
                dispatch(setStatus(Status.Success))
                dispatch(setCourses(response.data.data))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}


export function createCourse(data:ICourseForData){
    return async function createCourseThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/course",data)
            if(response.status == 201){
                dispatch(setStatus(Status.Success))
                // dispatch(setCourses(response.data.data))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}
