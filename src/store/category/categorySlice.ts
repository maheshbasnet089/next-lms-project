
import {createSlice} from "@reduxjs/toolkit"
import { useState } from "react"
import { ICategoryInitialState, Status } from "./types"
import axios from 'axios'
import { AppDispatch } from "../store"



const datas: ICategoryInitialState = {
    categories : [], 
    status : Status.Loading
}

const categorySlice = createSlice({ // returns object  {actions : "sjldfj"}
    name : "category", 
    initialState : datas,
    reducers : {
        setStatus(state,action){
            state.status = action.payload //
        }, 
        setCategories(state,action){
            state.categories = action.payload
        }
    }
})
const {setCategories,setStatus}  = categorySlice.actions
export default categorySlice.reducer
export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch:AppDispatch){
       try {
        const response =  await axios.get("http://localhost:3000/api/category")
       if(response.status === 200){
        dispatch(setStatus(Status.Success))
        dispatch(setCategories(response.data.data))

       }else{
        dispatch(setStatus(Status.Error))
       }
       } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.Error))
       }
    }
}



