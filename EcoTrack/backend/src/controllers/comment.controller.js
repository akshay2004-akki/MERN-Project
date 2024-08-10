import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


export const getBlogComments = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    const {page = 1, limit = 10} = req.query;

    if(!isValidObjectId(blogId)){
        throw new ApiError(400,"Invalid Video Id");
    }
    
    try {
        const comment = await Comment.aggregate([
            {
                $match : {blog : new mongoose.Types.ObjectId(blogId)}
            },
            {
                $lookup : {
                    from : "users",
                    localField : "owner",
                    foreignField : "_id",
                    as : "ownerDetails"
                }
            },
            {
                $unwind : "$ownerDetails"
            },
            {
                $project : {
                    content : 1,
                    createdAt : 1,
                    owner : {
                        _id : "$ownerDetails._id",
                        fullname : "$ownerDetails.fullName"
                    }
                }
            },
            {
                $skip : (page-1) * limit
            },
            {
                $limit  : parseInt(limit)
            }
        ])
        
        const totalComments = await Comment.countDocuments({blog : blogId})
        return res.status(200).json(new ApiResponse(200,{
            comment,
            currentPage: page,
            totalPages: Math.ceil(totalComments / limit),
            totalComments
        },"Comments fetched Successfully"))
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

export const addComment = asyncHandler(async(req,res)=>{
    const {content} = req.body
    const {blogId} = req.params
    const userId = req.user?._id

    if(!isValidObjectId(blogId)){
        throw new ApiError(400, "Invalid video Id")
    }
    if(!content || content.trim()===""){
        throw new ApiError(400,"Comment cannot be empty")
    }
    if(!isValidObjectId(userId) || !userId){
        throw new ApiError(404,"Inavlid User ID")
    }

    try {
        const comment = await Comment.create({
            content,
            blog : blogId,
            owner : userId
        })
        return res.status(200).json(new ApiResponse(200, comment, "Comment added successfully"))
    } catch (error) {
        throw new ApiError(400,error?.message)
    }
})

export const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params;
    const {content} = req.body;

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment Id")
    }

    if(!content || content.trim()===""){
        throw new ApiError(400, "Comment cannot be empty")
    }

    try {
        const comment = await Comment.findByIdAndUpdate(commentId,{content : content});
        return res.status(201).json(new ApiResponse(201, comment, "Comment Updated successfully"))
    } catch (error) {
        throw new ApiError(500, error?.message)
    }

})

export const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment Id")
    }
    
    try {
        const comment = await Comment.findById(commentId);

        // Check if the comment exists
        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }
        
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"))    
    } catch (error) {
        throw new ApiError(500, error?.message) 
    }
})