import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";

import { ApiError } from "../../utils/ApiError";

import { setToken } from "../../redux/slices/Auth.slice";

const baseUrl = import.meta.env.VITE_BASE_URL

async function signup(
    name,
    bio,
    username,
    password,
    avatar,
    navigate
){
    const toastId = toast.loading("Loading...")
    try{
     
        const response = await apiConnector('POST','http://localhost:5172/user/signup' , {
            name,
            bio,
            username,
            password,
            avatar,
        } )
       

        if(!response.data.message)
            throw new Error(response.data.message)

        toast.success("Signup Successful")
        navigate('/login')

    } catch(error){
        toast.error("Signup Failed")
        console.log(error)
        
        navigate("/login")
        
    }
    toast.dismiss(toastId)
}



async function login( username, password, navigate, dispatch) {
    let toastId = toast.loading("Loading...")
    try {console.log("respnse")
        const response = await apiConnector("POST", 'http://localhost:5172/user/login',{
            username,
            password,
        })

        if(!response.data.message)
            throw new ApiError(500, "didnpt get response from backend")

        console.log(response)
        localStorage.setItem('user',JSON.stringify(response.data?.existUser))
        localStorage.setItem('token',JSON.stringify(response.data?.accessToken.accessToken))
        dispatch(setToken(response.data?.accessToken.accessToken))

        toast.success("Login Successful")
        navigate('/')
    } catch (error) {
        toast.error("login failed")
        console.log("login api error",error)
        navigate('/')
    }
    toast.dismiss(toastId)
    
}


function logout(navigate,dispatch){

        dispatch(setToken(null))
        localStorage.removeItem("token")
        toast.success("Logged Out")
        navigate('/login')
    
}

async function searchUser(token,name=""){
    try {
        console.log("name is",name)
        const res = await apiConnector("GET", `http://localhost:5172/user/searchUser?name=${name}`,null,{
            Authorization: `Bearer ${token}`
        })

        if(!res?.data?.success)
            throw new ApiError(500, "serachUser api error")

        console.log("resp",res)
        return res.data
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "search api error")
    }
}


async function sendFriendRequest(token,username) {
    console.log(username)
    let toastId = toast.loading("Sending Friend Request")
    try {
        const res = await apiConnector("POST", 'http://localhost:5172/user/sendFriendRequest',{
            username
        },{
            Authorization: `Bearer ${token}`
        })

        

        if(!res)
            throw new ApiError(500, "sendFriendRequest api error")

        toast.success("Friend Request Sent")
    } catch (error) {
        console.log(error)
        toast.error("Friend Request Failed")
    }

    toast.dismiss(toastId)
}

async function notifications (token) {
    try {
        const res = await apiConnector("GET","http://localhost:5172/user/getMyNofification",null,{
            Authorization: `Bearer ${token}`
        })
        if(!res)
            throw new ApiError(500, "notifications api error")

        toast.success("Request Fetched")
        return res.data?.data

    } catch (error) {
        console.log(error)
        toast.error("Friend Request Failed")
    }
}

async function acceptFriendRequest(token,username) {
   
    try {
        const res = await apiConnector("POST", "http://localhost:5172/user/acceptFriendRequest",{
            username
        },{
            Authorization: `Bearer ${token}`
        })

        if(!res)
            throw new ApiError(500, "Friend Request api error")

        toast.success("Request Fetched")
        console.log("fiend reqest",res.data?.data)
        
        // return res.data?.data

    } catch (error) {
        console.log(error)
        toast.error("Friend Request Failed")
    }
}


export {
    login,
    signup,
    logout,
    searchUser,
    sendFriendRequest,
    notifications,
    acceptFriendRequest
}