export enum Status{
    Loading = "loading",
    Success = "success", 
    Error = "error"
}
export interface ICategory{
    _id : string, 
    description : string, 
    name : string, 
    createdAt : string
}

export interface ICategoryInitialState{
    categories : ICategory[], 
    status : Status
}