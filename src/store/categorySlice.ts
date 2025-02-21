import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
import { API } from "@/http";

interface ICat{
    name : string, 
    description : string, 
    _id : string, 
    createdAt : string
}

interface IInitialCategory{
    categories : ICat[], 
    status : string
}
const datas: IInitialCategory = {
    categories : [], 
    status : "loading"
}

const categorySlice = createSlice({
    name : "category", 
    initialState : datas, 
    reducers : {
        setCategories(state,action){
            state.categories = action.payload
        }, 
        setStatus(state,action){
            state.status = action.payload
        }, 
        resetStatus(state){
            state.status = "loading"
        },
        addCategory(state,action){
            state.categories.push(action.payload)
        },
        setDeleteCategory(state,action:PayloadAction<string>){
            const index = state.categories.findIndex(item=>item._id == action.payload)
            console.log(index,"Index")
            if(index !== -1){
            state.categories.splice(index,1)
            }
        }

    }
})

export const {setCategories,setStatus,addCategory: addCategorys,resetStatus, setDeleteCategory} = categorySlice.actions
export default categorySlice.reducer

export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch:AppDispatch){
        try {
            const res = await API.get("http://localhost:3000/api/category");
            if(res.status === 200){
                // dispatch(setStatus("success"))
                dispatch(setCategories(res.data.data))
            }else{
                dispatch(setStatus("error"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function addCategory(data:{name:string,description:string}){
    return async function addCategoryThunk(dispatch:AppDispatch){
        try {
            const res = await API.post("category",data);
            if(res.status == 201){
                dispatch(setStatus("success"))
                dispatch(addCategorys(res.data.data))
            }else{
                dispatch(setStatus("error"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteCategory(id:string){
    return async function deleteCategoryThunk(dispatch:AppDispatch){
        try {
            const res = await API.delete("category/" + id);
            if(res.status == 200){
                dispatch(setStatus("success"))
                dispatch(setDeleteCategory(res.data.data))
            }else{
                dispatch(setStatus("error"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
