import jwt from 'jsonwebtoken'
import { Chat } from '../models/Chat.model.js'
import mongoose from 'mongoose'
import { Message } from '../models/Message.model.js'
import { Request } from '../models/Request.model.js'
import { User } from '../models/User.model.js'
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { generateTokens } from './User.controller.js'
import { sendAttatchments } from './Chat.controller.js'

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 1000,
}

const adminLogin = asyncHandler( async(req, res) => {
    const {secretKey} = req.body

    const isMatched = secretKey === process.env.ADMIN_SECRET_KEY
    if(!isMatched) 
        throw new ApiError(500, "secret key do not matched")

    const token = jwt.sign( secretKey, process.env.ACCESS_TOKEN_SECRET)

    return res
    .status(200)
    .cookie("adminToken",token,options)
    .json({
        success: true,
        message: "Admin login successfull",
    })
})

const getAdminData = asyncHandler( async(req, res) => {
    return res
    .status(200)
    .json({
        admin: true,
    })
})

const allUsers = asyncHandler( async(req, res) => {
    const users = await User.find({})
console.log(users)
    const transformedUsers = users.map( async(user) => {
        const groups = await Chat.countDocuments(
            {
                groupChat: true,
                members: user._id,
            }
        )
        const friends = await Chat.countDocuments(
            {
                groupChat: false,
                members: user._id,
            }
        )
        console.log(user.name)
        console.log(groups,friends)

        return{
            _id: user._id,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            groups: groups,
            friends: friends,
        }
    })
    
    return res
    .status(200)
    .json({
        status: true,
        users: transformedUsers
    })
})

const allChats = asyncHandler( async(req, res) => {
    const chats = await Chat.find({})
                    .populate("members","name avatar")
                    .populate("creator", "name avatar")
 
    const transformedChats = await Promise.all(chats.map( async (chat) => {
        const totalMessages = await Message.countDocuments(
            {
                chat: chat._id
            }
        )
        console.log(chat)
        console.log(totalMessages)
        return {
            _id: chat._id,
            groupChat: chat.groupChat,
            name: chat.name,
            avatar: chat.grouptChat ? members.slice(0,3).map((member) => member.avatar)
                : chat.members[0].avatar,
            members: chat.members.map(({_id, name, avatar}) => ({
                _id,
                name,
                avatar,
            })),
            creator: {
                name: chat.creator?.name || "None",
                avatar: chat.creator?.avatar || "",
            },
            totalMessages,
            totalMembers: chat.members.length,
        }
    }))

    console.log("tansformedchats",transformedChats)

    return res
    .status(200)
    .json({
        success : true,
        chats: transformedChats,
    })

})

const allMessages = asyncHandler( async(req, res) =>  {
    const messages = await Message.find({})
    .populate("sender", "name avatar")      
    .populate("chat", "groupChat")

    const transformedMessages = messages.map((message) => ({
        _id: message.id,
        attatchments: message.attatchments,
        content: message.content,
        createdAt: message.createdAt,
        chat: message.chat._id,
        groupChat: message.chat.groupChat,
        // sender: {
        //     _id: message.sender._id,
        //     name: message.sender.name,
        //     avatar: message.sender.avatar
        // }
    }))

    return res
    .status(200)
    .json({
        success: true,
        message: transformedMessages,
    })
})

const getdashboaredStats = asyncHandler( async(req, res) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
        await Promise.all([
            Chat.countDocuments({groupChat: true}),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),  
        ])

    const today = new Date()

    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)

    const last7DaysMessages = await Message.find({
        createdAt: { $gte: last7Days, $lte: today }
    }).select("createdAt")

    const messages = new Array(7).fill(0)
    const dayInMiliseconds = 1000 * 60 * 60 * 24

    last7DaysMessages.forEach((message) => {
        const indexApprox =
          (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;
        const index = Math.floor(indexApprox);
    
        messages[6 - index]++;
      });

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages,
    };

    return res
    .status(200)
    .json({
        success: true,
        stats,
    });
})

export {
    adminLogin,
    getAdminData,
    allUsers,
    allChats,
    allMessages,
    getdashboaredStats,
}