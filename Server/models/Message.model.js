import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const messageSchema = new Schema({
    content: {
        type: String,
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },

    attatchments:[
        {
            type: String,
        }
    ]

},{timestamps : true})

export const Message = mongoose.model("Message", messageSchema)