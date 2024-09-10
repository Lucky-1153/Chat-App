import { Chat } from "../models/Chat.model.js";
import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import mongooseDeepPopulate from 'mongoose-deep-populate';
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Message } from "../models/Message.model.js";

const newGroupChat = asyncHandler( async( req, res) => {
    const {
        name,
        members
    } = req.body

    const allMembers = [...members, req?.user?._id.toString()]
    console.log("hey there",allMembers)

    const resp = await Chat.create({
        name,
        groupChat: true,
        creator: req.user?._id.toString(),
        members: allMembers,
    })

    return res
    .status(200)
    .json({
        success:true,
        message: "Group chat created successfully",
    })
})

const getMyChats = asyncHandler( async(req, res) => {
    const userId = req.user?._id

    const chats = await Chat.find({members: userId}).populate("members","name avatar")

    const transformedChats = chats.map( ({members,_id,groupChat,name}) => {
        const otherMembers = members.find((member) => (
             member?._id.toString() !== userId.toString()
        ))


        return {
            _id,
            groupChat: groupChat,
            name: groupChat ? name : otherMembers.name,
            creater: groupChat ? userId : null,
            members: otherMembers,
            avatar: groupChat ? members.slice(0,3).map(({avatar}) => avatar) 
                                        : [otherMembers.avatar]
        }
    })
    console.log(transformedChats)
    return res
    .status(200)
    .json({
        success: true,
        message: "chats fetched succesfuly",
        data: transformedChats
    })
})

const getMyGroups = asyncHandler( async(req, res) => {
   
    const userId = req.user?._id
   
    const myGroups = await Chat.find({    
        members : userId,
        groupChat: true,
        creator: userId,
    }).populate("members", "name avatar")


    const groups = myGroups.map(({members, _id, name, groupChat}) => (
        {
            _id,
            groupChat,
            name,
            avatar : members.slice(0,3).map(({avatar}) => avatar)
        }
    ))

    // const groupss = myGroups.map(({members, _id, name, groupChat}) => (
        
    //         console.log("groups ",members.slice(0,3).map(({avatar}) => avatar))
        
    // ))


    

    console.log(myGroups)
    return res
    .status(200)
    .json({
        success: true,
        message: "groups fetched succesfuly",
        groups
    })
})

const addMembers = asyncHandler( async(req, res) => {
    const { chatId , members} = req.body

    const chat = await Chat.findById(chatId)

    if(!chat )
        throw new ApiError(500, "no Group found")

    if(!chat.groupChat)
        throw new ApiError(501, "this is not a group chat")

    const creatorId = chat.creator.toString()
    if(creatorId!== req.user?._id.toString())
        throw new ApiError(502, "You are not allowed to add a new member")

    // const allNewMembersPromise = members.map((i) => User.findById(i, "name"))
    // console.log('allnewmembers', allNewMembersPromise)

    const allNewMembers = []
    for( const memberId of members){
        const member = await User.findById(memberId).select('_id')
        allNewMembers.push(member)
    }

    const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id)).map((i) => i._id)

    chat.members.push(...uniqueMembers)

    if(chat.members.length > 100)
        throw new ApiError(503, "Members limit exceeded")

    await chat.save()

    return res
    .status(200)
    .json({
        success: true,
        message: "new member added successfully",
      
    })

})

const removeMember = asyncHandler( async(req, res) => {
    let { chatId, userId} = req.body
    if(!chatId || !userId)
        throw new ApiError(499, "enter all the fields")

    const chat = await Chat.findById(chatId)

    if(!chat )
        throw new ApiError(500, "no Group found")

    if(!chat.groupChat)
        throw new ApiError(501, "this is not a group chat")

    const creatorId = chat.creator.toString()
    if(creatorId!== req.user?._id.toString())
        throw new ApiError(502, "You are not allowed to add a new member")

    if(chat.members.length <= 3)
        throw new ApiError(504," atleast 3 members are required for group")

    chat.members = chat.members.filter( (member) => member.toString() !== userId.toString())

    await chat.save()
    
    return res
    .status(200)
    .json({
        success: true,
        message: "members removed successfully"
    })
        
})

const leaveGroup = asyncHandler( async(req, res) => {
    const {chatId} = req.body

    const chat = await Chat.findById(chatId)
    if(!chat )
        throw new ApiError(500, "no Group found")

    if(!chat.groupChat)
        throw new ApiError(501, "this is not a group chat")

    const remainingMembers = chat.members.filter( (member) => member.toString() !== req.user?._id.toString())

    if(remainingMembers.length < 3)
        throw new ApiError(502, "group must have atleast 3 members")

    if( chat.creator.toString() === req.user._id.toString()){
        const randomElement = Math.floor(Math.random()*remainingMembers.length)
        const newCreator = remainingMembers[randomElement]
        chat.creator = newCreator
    }

    chat.members = remainingMembers
    await chat.save()

    return res
    .status(200)
    .json({
        success: true,
        message: "Leave Group Successfully",
        chat
    })
})

const sendAttatchments = asyncHandler( async(req, res) => {
    
    const {chatId} = req.body

    const files = req?.files || []   

    if( files.length < 1)
        throw new ApiError(500, "Please upload attatchments")

    if(files.length > 5)
        throw new ApiError(501, "Can't send more than 5 attatchments")

    const chat = await Chat.find(chatId)
    
    const attatchmentsLocalPath = []
    for( const att of files?.attatchments){
        attatchmentsLocalPath.push(att.path.toString())
    }
    // attatchmentsLocalPath.push(files?.attatchments[0].path.toString())

    const attatchments = await uploadOnCloudinary(attatchmentsLocalPath)

    const message = await Message.create({
        attatchments,
        sender: req.user._id,
        chat: chatId,
    })

    return res
    .status(200)
    .json({
        success: true,
        message: "sent attatchments successfully",
        message,
    })

})

const getChatDetails = asyncHandler( async(req, res) => {
    const {group } = req.query

    if(group === "true"){
        
        const {chatId} = req.query
        console.log(chatId)
        const chat = await Chat.findOne({_id : chatId})
        .populate("members", "name avatar")    

        if(!chat)
            throw new ApiError(500, "Chat not found")


       return res
        .status(200)
        .json({
            success: true,
            message: "get chat details",
            chat
        })
    } else{
        const chatId = req.params.id
        console.log('there')
        const chat = await Chat.findOne({_id : chatId})
        if(!chat)
            throw new ApiError(500, "Chat not found")

        return res
        .status(200)
        .json({
            success: true,
            message: "get chat details",
            chat
        })
    }
})

const renameGroup = asyncHandler( async(req, res) => {
    const chatId = req.params?.id
    const {newName} = req.body
console.log(newName)
    if(!chatId || !newName)
        throw new ApiError(498, "Missing required fields")

    const chat = await Chat.findOne({
        _id: chatId
    })
    if(!chat )
        throw new ApiError(499, "No Chat group found")
    if(chat.creator.toString() !== req.user._id.toString())
        throw new ApiError(500, "You are not allowed to change the name of group")
    if( chat.name === newName)
        throw new ApiError(501, "Old Name can't be set")

    const updatedChat = await Chat.findByIdAndUpdate(
        {_id : chatId},
        {
            $set: {
                name: newName,
            }
        },
        {
            new: true,
        }
    )

    return res
    .status(200)
    .json({
        success: true,
        message : "New Name of Group is updated",
        updatedChat,
    })


})

const deleteChat = asyncHandler( async(req, res) => {
    const {chatId} = req.body
    const userId = req.user._id

    const chat = await Chat.findOne({
        _id: chatId
    })
    if(!chat)
        throw new ApiError(500, "no chat found")

    const members = chat.members

    if(chat.groupChat && chat.creator.toString() !== userId.toString())
        throw new ApiError(501, "You are not allowed to delete Group")

    if(!chat.groupChat && !chat.member.includes(userId.toString()))
        throw new ApiError(502, "You are not allowed to delete this chat")

    const messageWithAttatchments = await Message.find({
        chat: chatId,
        attatchments : {
            $exists: true,
            $ne: []
        }
    })

    const public_ids = []

    messageWithAttatchments.forEach(({ attatchments}) => 
        attatchments.forEach(({public_id}) => public_ids.push(public_id))
    )

    // deleteFilesFromCloudinary(public_ids)
    await chat.deleteOne()
    await Message.deleteMany({
        chat: chatId
    })

    return res
    .status(200)
    .json({
        success: true,
        message: "Group/Chat is deleted Successfully",
    })
})

const getMessages = asyncHandler( async( req, res) => {
    const chatId = req.params.id
    const {page = 1} = req.query

    const resultPerPage = 20
    const skip = (page - 1) * resultPerPage

    const chat = await Chat.findById(chatId)
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.members.includes(req.user.toString()))
        return next(
        new ErrorHandler("You are not allowed to access this chat", 403)
    );

    const messages = Message.find({ chat : chatId})
                        .sort({ createdAt: -1})
                        .skip(skip)
                        .limit(resultPerPage)
                        .populate("sender", "name")

    const totalMessagesCount = await Message.countDocuments({ chat: chatId})

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0

    return res
    .status(200)
    .json({
        success: true,
        messages : (await messages).reverse(),
        totalPages,
    })
})

export {
    newGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMember,
    leaveGroup,
    sendAttatchments,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages,
}