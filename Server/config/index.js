import mongoose from 'mongoose'

const connected = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch(error){
        console.log9("Unable to connect to databse", error)
        process.exit(1)
    }
}

export {connected}