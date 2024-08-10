import mongoose, { isValidObjectId } from "mongoose";
import { Blog } from "../models/blog.model.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js';
import {uploadOnCloudinary} from '../utils/uploadOnCloudinary.js'
import { Like } from "../models/likes.model.js";

export const toggleBlogLike = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    const userId = req.user?._id;

    if(!isValidObjectId(blogId)){
        throw new ApiError(400,"Invalid Object Id");
    }

    const blog = await Blog.findById(blogId);
    if(!blog){
        throw new ApiError(400,"Blog does not exist")
    }

    if(!isValidObjectId(userId)){
        throw new ApiError(400,"Invalid User Id");
    }
    try {
        const existingLike = await Like.findOne({likedBy:userId, blog : blogId});
        if(existingLike){
            await Like.deleteOne({_id : existingLike._id})
            return res.status(200).json(new ApiResponse(200, null, "Like removed successfully"));
        }else{
            const newLike = await Like.create({likedBy : userId, blog : blogId})
            return res.status(201).json(new ApiResponse(201, newLike, "Like added successfully"));
        }
    } catch (error) {
        
    }

})

export const getLikes = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;

    if(!isValidObjectId(blogId)){
        throw new ApiError(400,"Invalid Blog Id");
    }

    try {
        const likedBlogs = await Like.aggregate([
            {$match : {blog : new mongoose.Types.ObjectId(blogId)}},
            {
                $lookup : {
                    from : "users",
                    localField : "likedBy",
                    foreignField : "_id",
                    as : "userDetails"
                }
            },
            {
                $unwind : "$userDetails"
            },
            {
                $project: {
                    likedBy : {
                        _id : "$userDetails._id",
                        fullname : "$userDetails.fullName"
                    }
                }
            }
        ])
        const likesCount = await Like.countDocuments({blog : blogId})
        return res.status(200).json(new ApiResponse(200,{
            likedBlogs,
            likesCount
        }))
    } catch (error) {
        throw new ApiError(400,error?.message)
    }
})