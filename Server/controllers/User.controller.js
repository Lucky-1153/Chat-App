import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from 'bcrypt'
import {ApiError} from '../utils/ApiError.js'
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
import { User } from "../models/User.model.js";
import { Request } from "../models/Request.model.js";
import {Chat} from '../models/Chat.model.js'

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
}

const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = await user.generateAccessToken()

        return {accessToken}
    } catch (error) {
        console.log("error is ",error)
        throw new ApiError(444, "unable to generate tokens")
    }

}

const signup = asyncHandler(async( req, res) => {

    const {
        name,
        bio,
        username,
        password,
    } = req.body
    
    const avi = req.body?.avatar
    
    // const userId = req.user._id

    if([name, bio, username, password].some((field) => field?.trim() === ""))
        throw new ApiError(500, "Enter all the fields")
    
    // if (![name, bio, username, password].every((field) => field !== "" && field !== null))
    //     throw new ApiError(500, "Enter all the fields");

    const existedUser = await User.findOne({username})

    if(existedUser)
        throw new ApiError(501, "User already exists, Try to login")

    const hashedPassword = await bcrypt.hash(password, 10)

    const avatarLocalPath = req.files?.avatar[0]?.path
    console.log("avatarLocalpath",avatarLocalPath)

    const image = await uploadOnCloudinary(avatarLocalPath)
    console.log("img",image)

    // const userDetails = await User.findOneAndUpdate({ username }, {
    //     name,
    //     bio,
    //     password: hashedPassword,
    //     avatar: image.url,
    //   }, { upsert: true, new: true });
    const userDetails = await User.create({
        name,
        bio,
        username,
        password: hashedPassword,
        avatar: image.url,
    })
    
    if(!userDetails)
        throw new ApiError(502, "Error while creating the User Collection")

    return res
    .status(200)
    .json({
        success: true,
        message: "User registered Successfully"
    })

    
})

const login = asyncHandler( async(req, res, ) => {
console.log('here')
    const {
        username,
        password
    } = req?.body
console.log(username,password)
    if([username, password].some((field) => field === ""))
        throw new ApiError(500, "enter all the fields")

    const existUser = await User.findOne({username}).select('-password')


    if(!existUser)
        throw new ApiError(502, "User doesn't exist, try to signup")

    // const isPasswordCorrect = await bcrypt.compare(password, existUser.password)
    // if(!isPasswordCorrect)
    //     throw new ApiError(503, "Password incorrect")

    const accessToken = await generateTokens(existUser._id)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        message: "User logged in Successfully",
        accessToken ,
        existUser
    })

})

// const getAllUsers = asyncHandler( async(req, res, next) => {
//     const userId = req?.user?._id

//     if(userId)
//         throw new ApiError(500, "token invalid/expired")

//     const allUsers = await User.find(
//         { _id : { $ne: userId}}
//     ).select('-password')

//     const alreadyFriends = await Request

//     return res
//     .status(200)
//     .json({
//         success: true,
//         message: "All users fetched successfully",
//         data: allUsers
//     })
// })

const sendFriendRequest = asyncHandler( async(req, res, next) => {
    const senderId = req?.user?._id

    const {username} = req?.body
    if(!username)
        throw new ApiError(500, "no username given")

    const receiver = await User.findOne({username})
    if(!receiver)
        throw new ApiError(501, "no such Person found in database")

    const request = await Request.findOne({
        $or: [
            { sender: senderId, receiver: receiver._id},
            { sender: receiver._id, receiver: senderId}
        ]
    })


    if(request){
        throw new ApiError(502, "request already send")
    }

    const response = await Request.create({
        sender: senderId,
        receiver: receiver._id,
    })
    

    // add emitEvent

    return res
    .status(200)
    .json({
        success: true,
        message: "Friend request sent successfully",
        flag: false
    })

})

const searchUser = asyncHandler( async( req, res, next) => {
   
    const {name = ""} = req.query
    const id = req.user?._id
    const userId = id.toString()
    
    const myChats = await Chat.find({
        groupChat: false,
        member: userId,
    })

    const allUsersFromMyChat = myChats.flatMap((chat) => chat.members)
        
    const allUsersExceptMeAndMyFriends = await User.find({
        _id: { $nin : allUsersFromMyChat,
            $nin: userId
        },
        name: {$regex: name, $options: "i"}
    }).select('_id name avatar username')

    return res
    .status(200)
    .json({
        success: true,
        message: "user find successfully",
        data: allUsersExceptMeAndMyFriends
    })

})

const acceptFrindRequest = asyncHandler( async(req, res) => {
    const userId = req.user?._id

    const {username} = req?.body

    const friend = await User.findOne({
        username: username
    })

    const request = await Request.findOne({
        sender: friend._id,
        receiver: userId,
        status: "Pending"
    })

    if(!request)
        throw new ApiError(500, "request not found")

    const updatedRequest = await Request.findByIdAndUpdate(
        {_id : request._id},
        {
            $set: {
                status: "Accepted"
            }
        },
        {
            new: true
        }
    )


    return res
    .status(200)
    .json({
        success: true,
        message: "request accepted"
    })

})


const getMyFriends = asyncHandler( async(req, res) => {
    const userId = req.user?._id
    const {chatId} = req?.body || null

    const myChats = await Chat.find({
        members: userId,
        groupChat: false,
    }).populate("members", "name avatar")

    const friends = myChats.map((chat) => {
        const otherPerson =  chat.find((field) => (
            field?.members?._id !== userId
        ))
        return otherPerson
    })

    if(chatId){
        const chat = await Chat.findById(chatId)

        const availableFriends = friends.filter(
            (friend) => !chat.members.includes(friend._id)
        )

        return res
        .status(200)
        .json({
            success: true,
            friends: availableFriends,
        })
    }   else{
        return res
        .status(200)
        .json({
            success: true,
            friends,
        })
    }
    
})

const getMyProfile = asyncHandler( async(req, res) => {
    const userId = req.user?._id
    if(!userId)
        throw new ApiError(500, "login again")

    const userDetails = await User.findById(userId).select("-password")

    if(!userDetails)
        throw new ApiError(404, "User not found")

    return res
    .status(200)
    .json({
        success: true,
        data: userDetails,
    })

})

const getMyNotification = asyncHandler( async(req, res) => {
    const userId = req.user?._id
console.log("hey there")
    const requests = await Request.find({receiver: userId},{status: "Pending"})
                            .populate({
                                path: 'sender',
                                select: "name username avatar"
                            }).select("-status -receiver")

    return res
    .status(200)
    .json({
        success: true,
        message:"norification fetch succesfull",
        data: requests,
    })
})

export {
    signup,
    login,
    sendFriendRequest,
    searchUser,
    acceptFrindRequest,
    getMyFriends,
    getMyProfile,
    getMyNotification,
    generateTokens
}