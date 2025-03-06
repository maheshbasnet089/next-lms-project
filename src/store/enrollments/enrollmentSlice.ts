import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { AppDispatch } from "../store";
import API from "@/http";
import { IEnrollment, IInitialData } from "./types";
import { IEnrollmentData } from "../courses/courseSlice";

const data : IInitialData = {
    status : Status.Loading, 
    enrollments : [], 
    paymentUrl : null 
}

const enrollmentSlice = createSlice({
    name : "enrollments", 
    initialState:data, 
    reducers : {
        setStatus(state:IInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setEnrollment(state:IInitialData,action:PayloadAction<IEnrollment[]>){
            state.enrollments = action.payload
        }, 
        setPaymentUrl(state,action){
            state.paymentUrl = action.payload
        }  }
})

const {setStatus,setEnrollment, setPaymentUrl} = enrollmentSlice.actions
export default enrollmentSlice.reducer

export function enrollCourse(data:IEnrollmentData){
    return async function enrollCourseThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/enrollment",data)
            if(response.status == 201){
                dispatch(setStatus(Status.Success))
                window.location.href = response.data.data.paymentUrl
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

export function fetchEnrollements(){
    return async function fetchEnrollementsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/enrollment")
            if(response.status === 201){
               dispatch( setStatus(Status.Success))
                dispatch(setEnrollment(response.data.data))
                if(response.data.data.paymentUrl){
                    dispatch(setPaymentUrl(response.data.data.paymentUrl))
                }
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function changeEnrollmentStatus(status:EnrollmentStatus,id:string){
    return async function changeEnrollmentStatusThunk(dispatch:AppDispatch){
        try {
            const response = await API.patch(`/enrollment/${id}`,{status : status})
            if(response.status == 200){
                dispatch(setStatus(Status.Success))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        
        }
    }
}