import { Status } from "../category/types"

export interface ICourseForData{
    title : string, 
    description : string, 
    price : number, 
    category : string, 
    duration : string,
}

export interface ICourse extends ICourseForData{

    createdAt : string 
}

export interface IInitialData{
    courses : ICourse[], 
    status : Status
}