require("dotenv").config()
const express = require("express")
const app = express()
const authRoute= require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api/auth",authRoute)

module.exports=app