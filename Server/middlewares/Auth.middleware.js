import { ApiError } from "../utils/ApiError.js"
import {User} from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/AsyncHandler.js"

const auth = async( req, res, next) => {
    try {
        const token = req.cookies?.accessToken ||
        req.body.token ||
        (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null)
        // req.header("Authorization").replace("Bearer ","")
    
        if(!token)
            throw new ApiError(500, "token not found")
    //    console.log('kjkk',token, process.env.ACCESS_TOKEN_SECRET)
        const decodedToken = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken)
            throw new ApiError(501, "Unauthorized token")
       
  
        const user = await User.findById(decodedToken._id)

        if(!user)
            throw new ApiError(501, "Unauthorized user")
        
        req.user = user
        next()
    } catch (error) {
        
        throw new ApiError(455, "unable to verify user",error)
    }
}

const adminOnly = async(req, res, next) => {
    try {
        const token = req.cookies.adminToken ||
                        req.body.adminToken ||
                        req.header("Authorization").replace("Bearer ", "")
    
        if(!token)
            throw new ApiError(500,"admin token not found")
    
        const secretKey = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!secretKey)
            throw new ApiError(501, "unauthorized token")
    
        const isMatched = secretKey === process.env.ADMIN_SECRET_KEY
        if(!isMatched)
            throw new ApiError(502, "Only admin can access this route")
    
        next()
    } catch (error) {
        throw new ApiError(450, "unable to verfiy admin",error)
    }
}

export {
    auth,
    adminOnly
}