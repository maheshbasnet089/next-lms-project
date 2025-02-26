import { deleteCategory } from "../category.controller"


export async function DELETE(request:Request,{params} : {params : {id : string}}){
    const {id} = await params
    return deleteCategory(request,id)
}