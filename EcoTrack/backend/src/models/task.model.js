import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tasksCompleted: {
      type: [Boolean],
      default: new Array(30).fill(false),
    },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema)