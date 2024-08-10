import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema = new Schema({
    likedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog"
    }
},{timestamps:true})

likeSchema.plugin(mongooseAggregatePaginate)

export const Like = model("Like", likeSchema)