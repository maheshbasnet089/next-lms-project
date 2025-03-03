import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { ICourse, ICourseForData, IInitialData } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";
import { PaymentMethod } from "@/database/models/payment.schema";

export interface IEnrollmentData{
    whatsapp : string, 
    course : string, 
    paymentMethod : PaymentMethod
}

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
        }, 
        pushToCourses(state:IInitialData,action:PayloadAction<ICourse>){
            state.courses.push(action.payload)
        }, 
        deleteCourseByIndex(state:IInitialData,action:PayloadAction<string>){
            const index =   state.courses.findIndex((course)=>course._id == action.payload)
            if(index !== -1){
              state.courses.splice(index,1)
            }
          }, 
          resetStatus(state){
            state.status = Status.Loading
        }, 

    }
})
const {setCourses,setStatus,pushToCourses,deleteCourseByIndex,resetStatus} = courseSlice.actions
export default courseSlice.reducer

export function fetchCourses(){
    return async function fetchCoursesThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/course")
            if(response.status == 200){
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
                dispatch(pushToCourses(response.data.data))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteCourse(id:string){
    return async function deleteCourseThunk(dispatch:AppDispatch){
        try {
            const response = await API.delete("/course/" + id)
            if(response.status == 200){
                dispatch(deleteCourseByIndex(id))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function enrollCourse(data:IEnrollmentData){
    return async function enrollCourseThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/enrollment",data)
            if(response.status == 201){
                dispatch(setStatus(Status.Success))
                // dispatch(pushToCourses(response.data.data))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}