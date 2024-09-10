import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const chatSchema = new Schema({
    name: {
        type: String,
    },

    groupChat: {
        type: Boolean,
        required: true,
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
    
},{timestamps: true})

export const Chat = mongoose.model("Chat", chatSchema)