import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { ApiError } from "../../utils/ApiError";
const baseUrl = import.meta.env.VITE_BASE_URL


async function getMyChats(token)  {
    let toastId = toast.loading("Loading...")
    try {
        
        const response =  await apiConnector("GET", `http://localhost:5172/chat/getMyChats`,null,{
            Authorization : `Bearer ${token}`
        })
        if(!response )
            throw new ApiError(400, "error while fetching chats")
        
        toast.success("ChatList fetched successfully")
        return response.data?.data
    
    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }
}

async function createGroup(name, members, token) {
    let toastId = toast.loading("Creating Group")
    try {
        const res = await apiConnector("POST", 'http://localhost:5172/chat/newGroupChat',{
            name,
            members,
        },{
            Authorization : `Bearer ${token}`
        })
        if(!res )
            throw new ApiError(400, "error while creating group")

        toast.success("Group Created")

        
    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }
}

async function getMyGroups(token){
    let toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("GET", "http://localhost:5172/chat/getMyGroups",null,{
            Authorization: `Bearer ${token}`
        })
        if(!res)
            throw new ApiError(400, "error while fetching groups")

        return res.data
            
    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }

}


async function getChatDetails(token,chatId,group) {
    let toastId = toast.loading("Loading...")
    try {console.log('chatid',chatId)
        const res = await apiConnector('GET', `http://localhost:5172/chat/chatDetails?group=${group}&chatId=${chatId}`,null,{
            Authorization: `Bearer ${token}`
        })
        if(!res)
            throw new ApiError(400, "error while fetching chat details")

        toast.success("Chat Details fetched successfully")
        return res.data

    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }
}

async function removeMember(token,chatId,userId){
    let toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("POST", 'http://localhost:5172/chat/removeMember',{
            chatId,
            userId
        },{
            Authorization: `Bearer ${token}`
        })
        console.log("remove memebr", res)

        if(!res)
            throw new ApiError(400, "error while removing member")

        toast.success("Member reomved successfuly")
        window.location.reload();
    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }
}

async function deleteGroup(token, chatId){
    let toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector('POST','http://localhost:5172/chat/chatDetails',{
            chatId
        },{
            Authorization: `Bearer ${token}`
        })
        console.log("group deleted", res)

        if(!res)
            throw new ApiError(400, "error while removing member")

        toast.success("Group Deleted")
        
        
        return res?.data?.data
    } catch (error) {
        console.log(error)
        toast.error("Error")
    }
    finally{
        toast.dismiss(toastId)
    }
}

export {
    getMyChats,
    createGroup,
    getMyGroups,
    getChatDetails,
    removeMember,
    deleteGroup
}