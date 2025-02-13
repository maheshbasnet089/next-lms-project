import mongoose,{Schema} from "mongoose";

export interface ICategory extends Document{
    _id : string, 
    name : string, 
    description?: string, 
    createdAt : Date 
}

const categorySchema = new Schema<ICategory>({
  name : {
    type  :String, 
    required : true, 
    unique : true
  } , 
  description : String, 
  createdAt : {
    type : Date, 
    default : Date.now()
  }
})

const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)
export default Category 