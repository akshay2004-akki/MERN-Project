import { Task } from '../models/task.model.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from '../utils/asyncHandler.js';

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API);

const generateTasksForUser = async (userId) => {
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Generate a new set of 20 easy tasks for an individual that can help to reduce carbon emissions";

    const result = await model.generateContent(prompt);
    const response = result.response;

    const cleanedText = response.text().replace(/##.*/g, "");
    const tasksArray = cleanedText
        .split(/\d+\.\s+/)
        .filter(task => task.trim() !== "" && task.trim() !== "\n")
        .map(task => ({ task: task.replace(/\*\*/g, "").trim(), completed: false }));

    return Task.findOneAndUpdate(
        { userId },
        { tasks: tasksArray, lastGenerated: new Date() },
        { upsert: true, new: true }
    );
};

export const generateTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const taskDocument = await generateTasksForUser(userId);
    res.status(200).json(new ApiResponse(200, taskDocument.tasks, "Tasks generated successfully"));
});

export const updateTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { tasksCompleted } = req.body;

    if (!tasksCompleted) {
        throw new ApiError(400, "Missing required fields");
    }

    const task = await Task.findOne({ userId });

    if (!task) {
        throw new ApiError(404, "Task document not found for user");
    }

    task.tasks = tasksCompleted;
    await task.save();

    res.status(200).json(new ApiResponse(200, task.tasks, "Tasks updated successfully"));
});

export const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let task = await Task.findOne({ userId });

    if (!task) {
        // Generate new tasks if none are found
        task = await generateTasksForUser(userId);
    } else {
        // Check if the tasks need to be regenerated
        const today = new Date();
        const lastGeneratedDate = new Date(task.lastGenerated);
        const diffDays = Math.floor((today - lastGeneratedDate) / (1000 * 60 * 60 * 24));

        if (diffDays >= 20) {
            task = await generateTasksForUser(userId);
        }
    }

    if (!task) {
        throw new ApiError(404, "Failed to generate or fetch tasks");
    }

    res.status(200).json(new ApiResponse(200, { tasks: task.tasks, lastGenerated: task.lastGenerated }, "Tasks fetched successfully"));
});
