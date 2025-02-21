import { deleteCategory } from "../category.controller";


export async function DELETE(request:Request,{params} :{params:{id:string}} ){
    const {id} =  await params
    // console.log(id,"ID")

        return deleteCategory(id)

} 