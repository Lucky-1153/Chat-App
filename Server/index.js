import dotenv from 'dotenv'
import { app } from './app.js';
import {connected} from './config/index.js'
import { ApiError } from './utils/ApiError.js';

;dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 3000

connected()
.then( () => {
    app.listen(port, () => {
        console.log("server is up at port :", port)
    })
})
.catch(() => {
    throw new ApiError(500, "error while connectig server")
})

