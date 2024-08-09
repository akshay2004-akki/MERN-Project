import { isValidObjectId } from "mongoose";
import { Blog } from "../models/blog.model.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js';
import {uploadOnCloudinary} from '../utils/uploadOnCloudinary.js'


export const createPost = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;
    const {title, content} = req.body;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if([title, content].some(field=>field.trim()==="")){
        res.status(400).send("Both the fields are necessary")
        throw new ApiError(400,"Both the fields are necessary")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!coverImage){
        res.status(400).send("Error while uploading image");
        throw new ApiError(400,"Error while uploading image");
    }

    const coverImageUrl = coverImage?.url

    const blog = await Blog.create({
        author : userId,
        title,
        content,
        published : true,
        coverImage: coverImageUrl || ""
    })

    if(!blog){
        throw new ApiError(400,"Error While creating blog");
    }

    return res
            .status(201)
            .json(new ApiResponse(201, blog, "Blog created successfully"))

})

export const updatePost = asyncHandler(async(req,res)=>{
    const {updateTitle, updateContent} = req.body;
    const {blogId} = req.params;

    if([updateTitle, updateContent].some(field=>field.trim()==="")){
        res.status(400).send("Both the fields are necessary")
        throw new ApiError(400,"Both the fields are necessary")   
    }

    if(!blogId || isValidObjectId(blogId)){
        throw new ApiError(400,"Invalid Object Id")
    }

    const blog = await Blog.findByIdAndUpdate(blogId, {title : updateTitle, content : updateContent})

    return res
            .status(200)
            .json(new ApiResponse(200, blog, "Blog Updated Successfully"))


})

export const getUserPosts = asyncHandler(async (req, res) => {
    const userId = req.user?._id; // Assuming the user ID is stored in the JWT and added to req.user
  
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
  
    try {
      const blogs = await Blog.find({ author: userId })
        .sort({ createdAt: -1 }) // Sort by creation date, most recent first
        .populate("author", "name"); // Optionally populate author details
  
      if (blogs.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], "No posts found for this user"));
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, blogs, "User's blog posts fetched successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Failed to fetch user's blog posts");
    }
  });