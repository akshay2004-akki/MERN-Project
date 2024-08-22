import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [
        {
            task: { type: String, required: true },
            completed: { type: Boolean, default: false },
            image : {type : String }
        }
    ],
    lastGenerated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Task = mongoose.model('Task', taskSchema);
