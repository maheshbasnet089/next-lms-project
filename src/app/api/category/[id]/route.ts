import { deleteCategory, editCategory } from "../category.controller"


export async function DELETE(request:Request,{params} : {params : {id : string}}){
    const {id} = await params
    return deleteCategory(request,id)
}

export async function PATCH(request:Request,{params} : {params : {id : string}}){
    const {id} = await params
    return editCategory(request,id)
}