import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const getAccessAndRefreshToken = async (userId)=>{
    const user = await User.findById(userId);

    const accessToken = await user.getAccessToken();
    const refreshToken = await user.getRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false})

    return {refreshToken, accessToken};
}

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    }
})

const sendEmail = (to, subject, text)=>{
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to,
        subject,
        text
    }
    transpoter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.error('Error sending email:', error);
          } else {
            console.error('Email sent:', info.response);
          }
    })
}

// const generateCode = () => {
//     return Math.floor(1000 + Math.random() * 9000); // Ensure a 4-digit code
// }

// let globalCode;
// export const sendCode = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     if (!email) {
//         throw new ApiError(400, "Email is required");
//     }

//     globalCode = generateCode();
//     const emailText = `Hi, this is Team EcoTrack\nYour Verification code is: ${globalCode}\n\nRegards,\nTeam EcoTrack`;

//     try {
//         await sendEmail(email, "Email verification", emailText);
//         return res.status(200).json(new ApiResponse(200, {}, "Code sent"));
//     } catch (error) {
//         throw new ApiError(500, "Error sending email");
//     }
// });

// export const verifyCode = asyncHandler(async (req, res) => {
//     const { code } = req.body;
//     if (!code || code.trim() === "") {
//         throw new ApiError(400, "Please enter the code");
//     }
//     if (code !== globalCode.toString()) {
//         throw new ApiError(409, "Invalid code");
//     }

//     globalCode = null; // Clear the code after successful verification
//     return res.status(200).json(new ApiResponse(200, true, "Code verified"));
// });


export const registerUser = asyncHandler(async(req,res)=>{
    const {fullName, email, password, role} = req.body;
    

    if([fullName, email, password, role].some((field)=>field?.trim()==="")){
        res.status(400).send("All fields are required")
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        res.status(409).send("User already exist with this email")
        throw new ApiError("User already exist with this email")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if(!avatarLocalPath){
        res.status(401).send("Avatar is required");
        throw new ApiError("Avatar is required")
    }
 
    const avatar = await uploadOnCloudinary(avatarLocalPath) 

    const newUser = await User.create({
        fullName,
        email,
        password,
        role,
        avatar : avatar.url
    })
    if(!newUser){
        res.status(400).send("Network Error");
        throw new ApiError("Network Error")
    }

    res.status(201).json(new ApiResponse(201,newUser,"User created successfully"))
})

export const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

    if([email,password].some(field=>field?.trim()==="")){
        res.status(400).send("Enter the required field")
        throw new ApiError(400,"Enter the required field")
    }

    const user = await User.findOne({email});

    if(!user){
        res.status(404).send("User Not Found")
        throw new ApiError(404,"User Not Found")
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        res.status(409).send("Incorrect Password")
        throw new ApiError(409,"Incorrect Pasword")
    }

    const {refreshToken, accessToken} = await getAccessAndRefreshToken(user?._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : false,
        // sameSite : "strict",
        // sameSite:"strict"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedInUser, "User logged Successfully"))

}) 

export const logOutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly : true,
        secure : false,
        // sameSite : "strict",
    }

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200,{}, "User logged out successfully"))
})

export const getUserDetails = asyncHandler(async(req,res)=>{
    const user = req.user;
    return res
            .status(200)
            .json(new ApiResponse(200, user, "User data fetched successfully"))
}) 

export const refreshAccessToken = asyncHandler(async (req,res)=>{
    //console.log(req.cookies.refreshToken);
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    //console.log(decodedToken);

    try {
        const user = await User.findById(decodedToken?._id);
        // console.log(user);
        if(!user){
            throw new ApiError(401, "User does not exist")
        }
        // console.log(user.refreshToken);
        if(incomingRefreshToken !==user?.refreshToken){
            throw new ApiError(401, "refresh token expired");
        };
    
        const options = {
            httpOnly : true,
            secure : false,
            // sameSite : "strict",
        }
    
        const {accessToken, newRefreshToken} = await getAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message)
    }

})

export const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword, confirmPassword} = req.body;

    const user = await User.findById(req.user?._id);

    if([oldPassword, newPassword, confirmPassword].some(field=> field.trim()==="")){
        res.status(400).send("All fields are required");
        throw new ApiError(400,"All fields are required")
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if(!isPasswordCorrect){
        res.status(409).send("Incorrect Old password");
        throw new ApiError(409,"Incorrect Old password"); 
    }
    if(newPassword===oldPassword){
        res.status(409).send("Old and New password must be different");
        throw new ApiError(409,"Old and New password must be different");
    }
    if(newPassword!==confirmPassword){
        res.status(409).send("Confirm password must be same as New password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave:false});

    return res
            .status(200)
            .json(new ApiResponse(200,{},"Password changed successfully"))

})

export const updateUserAvatar =asyncHandler (async (req,res)=>{
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new ApiError(400,"Error while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        avatar : avatar.url
    }, {new:true}).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avatar Updated successfully"
        )
    )


})

export const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName, email} = req.body;

    if([fullName, email].some(field=>field.trim()==="")){
        res.status(400).send("All fields are required");
        throw new ApiError(400,"All fields are required");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,{fullName,email},{new:true}).select("-password -refreshToken");

    return res
            .status(200)
            .json(new ApiResponse(200,user,"User details updated successfully"))
})

export const fetchAllUsers = asyncHandler(async(req,res)=>{
    try {
        const users = await User.find({});
    
        return res
                .status(200)
                .json(new ApiResponse(200, users, "LeaderBoard Fetched successfully"))
    } catch (error) {
        res.status(500).send("An error occured while fetcing the Leaderboard")
        throw new ApiError(500,"An error occured while fetcing the Leaderboard")
    }
})