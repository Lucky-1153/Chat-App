import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { ApiError } from './ApiError.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async(localFilePath = []) => {
    try{
        if(!localFilePath)
            throw new ApiError(500, "no file found on server")

        
        let response = []
        for( const localFile of localFilePath){
            const res = await cloudinary.uploader.upload(localFile,{
                folder: process.env.UPLOAD_ON_CLOUDINARY_FOLDER,
                resource_type: "auto",
            })
            response.push(res.url)
        }

        // const response = await cloudinary.uploader.upload(localFilePath,{
        //     resource_type: "auto",
        // })

        //  

        console.log("response in cloudinary",response)
        
        for (const file of localFilePath) {
            fs.unlinkSync(file)
        }

        return response
    } catch(error){
        for (const file of localFilePath) {
            fs.unlinkSync(file)
        }
        console.log(error)
        throw new ApiError(525, "unable to upload on cloudinary")
    }
}

export {
    uploadOnCloudinary
}