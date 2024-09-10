import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

let app = express()

app.get(cors({
    origin: "*",
    methods: 'GET POST PUT DELETE OPTIONS',
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    next();
  });

app.use(express.json({limit: "26kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from './routes/User.route.js'
import chatRoutes from './routes/Chat.route.js'
import adminRoutes from './routes/Admin.route.js'

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
    res.send('<div> this is default route <p> everything is okay </p> </div>')
})


export {app}