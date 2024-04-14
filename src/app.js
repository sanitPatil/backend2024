import express from "express"
import cookieParser from "cookie-parser"
const app = express()
import cors from "cors"

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(cookieParser)
app.use(express.static("public"))


// routes import 

import userRouter from "./routes/user.router.js"

// routes declaration 
app.use('/users',userRouter) // http:localhost:8000/users/
export {app}
