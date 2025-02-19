import {createSlice} from "@reduxjs/toolkit"
import { Status } from "../category/types"

interface Payment{
    paymentMethod : string, 
    paymentAmount : number
}

interface IPaymentInitialState{
    payments : Payment[], 
    status : Status
}

const datas:IPaymentInitialState = {
    payments : [], 
    status : Status.Loading
}

const paymentSlice = createSlice({
    name : "payment", 
    initialState : datas, 
    reducers : {
        setStatus(state,action){
            state.status = action.payload
        }, 
        setPayment(state,action){
            state.payments = action.payload
        }
    }
})

const {setStatus,setPayment} = paymentSlice.actions
export default paymentSlice.reducer