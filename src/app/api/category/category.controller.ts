import dbConnect from "@/database/connection"
import Category from "@/database/models/category.schema"
import authMiddleware from "../../../../middleware/auth.middleware"
import { NextRequest } from "next/server"


export async function createCategory(req:Request){
    try {
        // const response = authMiddleware(req as NextRequest)
        // if(response) return response
        await dbConnect()
        const {name,description} =  await req.json()
        // already exist or not 
        const existingCategory = await Category.findOne({name : name})
        if(existingCategory){
            return Response.json({
                message : "Category already existed with that name !!"
            },{status:400})
        }
        await Category.create({
            name,
            description
        })
        return Response.json({
            message : "Category created successfully !"
        },{
            status : 201
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            messsage : "Something went wrong!!"
        },{status:500})
    }
}

export async function getCategories(){
  try {
    // authMiddleware(req as NextRequest)
    // checkLoggedInOrNot()
    await dbConnect()
    const categories = await Category.find() // returns array , findOne --> re ob, findById --> re ob
    if(categories.length === 0 ){
        return Response.json({
            message : "No categories found"
        },{
            status : 404
        })
    }
    return Response.json({
        message : "Category fetched successfully !!", 
        data : categories
    },{status : 200})
  } catch (error) {
    console.log(error)
    return Response.json({
        messsage : "Something went wrong!!"
    },{status:500})
  }
}