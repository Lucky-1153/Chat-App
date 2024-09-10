import mongoose, { Schema } from "mongoose";
// import { Schema } from 'mongoose'

const requestSchema = new Schema({
    status:{
        default: 'Pending',
        enum : ['Pending', 'Accepted'],
        type: String,
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{timestamps: true})

export const Request = mongoose.model("Request", requestSchema)