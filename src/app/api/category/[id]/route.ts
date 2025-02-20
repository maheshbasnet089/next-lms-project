import { deleteCategory } from "../category.controller";


export async function DELETE(request:Request,urlBataAakoData:Promise<{params:{id:string}}>){
    const ids = (await urlBataAakoData).params
    const id =   ids.id
    console.log(id,"ID")
    if(id){

        return await deleteCategory(id)
    }
} 