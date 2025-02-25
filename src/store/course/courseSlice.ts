import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import API from "@/http";


const courseSlice = createSlice({
    name : "courses", 
    initialState : {
        courses : [], 
        status : Status
    }, 
    reducers : {
        setStatus(state,action){
            state.status = action.payload
        }, 
        setCourses(state,action){
            state.courses = action.payload
        }
    }
})

export const{setStatus,setCourses} = courseSlice.actions
export default courseSlice.reducer

function fetchCourses(){
    return async function fetchCoursesThunk(dispatch){
        try {
            const response = await API.get("/course")
            if(response.status === 200){
                setStatus(Status.Success)
                setCourses(response.data.data)
            }else{
                setStatus(Status.Error)
            }
        } catch (error) {
            console.log(error)
            setStatus(Status.Error)
        }
    }
}