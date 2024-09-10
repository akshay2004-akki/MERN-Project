import mongoose, {Schema, model} from 'mongoose';

const ratingSchema = new Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    rating : {
        type : Number,
        default : 0
    }
},{timestamps:true})