const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String
        ,required:[true,"username is required "]
        ,unique:[true,"ThisUsername is alredy existy"]
    }
    ,
    email:{
        type:String,
        required:[true,"email is required "],
        unique:[true,"This email is alredy existy"]
    }
    ,
    password:{
        type:String,
        required:[true,"password is required"]
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports= userModel