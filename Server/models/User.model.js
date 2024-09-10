import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    bio: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },


    avatar: {
        type: String,
    },
},{timestamps: true})

userSchema.pre( "Save", async function(next) {
    if(!this.isModified(password))
        return next()

    this.password = await hash(this.password, 10)
})

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            bio: this.bio
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)