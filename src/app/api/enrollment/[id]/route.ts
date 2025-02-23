import dbConnect from "@/database/connection"
import {  changeEnrollmentStatus, deleteEnrollment, fetchEnrollment } from "../enrollment.controller"


export async function GET(req:Request,{params} : {params : {id : string}}){
    await dbConnect()
    const {id} = await params
    return fetchEnrollment(id)
}

export async function DELETE(req:Request,{params} : {params : {id : string}}){
    await dbConnect()

    const {id} = await params
    return deleteEnrollment(id)
}

export async function PATCH(req:Request,{params} : {params : {id : string}}){
    await dbConnect()

    const {id} = await params
    return changeEnrollmentStatus(req,id)
}