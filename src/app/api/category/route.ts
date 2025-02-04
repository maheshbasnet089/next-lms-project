import { createCategory, getCategories } from "./category.controller";


export async function POST(req:Request){
    return createCategory(req)

}

export async function GET(){    
     return getCategories()
}