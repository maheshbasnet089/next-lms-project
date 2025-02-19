import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";


const categorySlice = createSlice({
    name : "category", 
    initialState : {
        categories : [], 
        status : "loading"
    }, 
    reducers : {
        setCategories(state,action){
            state.categories = action.payload
        }, 
        setStatus(state,action){
            state.status = action.payload
        }
    }
})

const {setCategories,setStatus} = categorySlice.actions
export default categorySlice.reducer

export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch:AppDispatch){
        try {
            const res = await fetch("http://localhost:3000/api/category", { cache: "no-store" });
            if(res.ok){
                dispatch(setStatus("success"))
                const data =  await res.json();
                dispatch(setCategories(data.data))
            }else{
                dispatch(setStatus("error"))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
