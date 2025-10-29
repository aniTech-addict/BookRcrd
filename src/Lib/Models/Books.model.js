import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    publicationDate:{
        type:Date,
        required:true
    },
    // addedBy:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }

},{timestamps:true})

export default mongoose.model("Book", BookSchema)