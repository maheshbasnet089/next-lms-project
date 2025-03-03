import { Status } from "../category/types"


interface ICategory{
    _id : string, 
    name : string, 
    description : string, 
    createdAt : string 
}
export interface ICourseForData{
    title : string, 
    description : string, 
    price : number, 
    category : ICategory , 
    duration : string,
    _id ?: string 
}

export interface ICourse extends ICourseForData{

    createdAt : string 
}

export interface IInitialData{
    courses : ICourse[], 
    status : Status
}