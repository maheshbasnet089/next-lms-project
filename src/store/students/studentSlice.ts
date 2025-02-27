import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { Role } from "@/database/models/user.schema";
import { IInitialData, IStudent } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";


const data : IInitialData = {
    status : Status.Loading, 
    students : []
}


const studentSlice = createSlice({
    name : "students", 
    initialState : data, 
    reducers : {
        setStatus(state:IInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setStudents(state:IInitialData,action:PayloadAction<IStudent[]>){
            state.students = action.payload
        }
    }
})

const {setStatus,setStudents} = studentSlice.actions
export default studentSlice.reducer

export function fetchStudents(){
    return async function fetchStudentsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/student")
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(setStudents(response.data.data))
            }else{
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))


        }
    }
}