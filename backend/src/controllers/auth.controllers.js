const userModel = require("../models/auth.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklist.model")

async function regiterUserController(req,res){
    //fetch data from user
    const {username, email,password}= req.body
    
    //check if one of that data not provide by user
    if(!username || !email || !password){
        return res.status(400).json({
            success:false,
            Message : "Please provide email username password to user"
        })
    }

    //now check userEver Exist in dataBase
    const isUserAlredyExist = await userModel.findOne({
       
       /**
        * in $or we can write multiple condition in array with objects
        * user name or email hai dono mese ek bhi to bhi true return
        */
        $or:[{username},{email}]
    })

    if(isUserAlredyExist){
        return res.status(400).json({
            success:false,
            Message : "User Alredy Exist"
        })
    }
    const bcryptPassword =await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:bcryptPassword
    })

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
    
        res.cookie("token",token)
        res.status(201).json({
            
            Message:"New USER Created Succesfully",
            user:{
                id:user._id,
                email:user.email,
                username:user.username
            }
            
        })
}

async function loginUserController(req,res){
    try {
        const {email,password}= req.body;

        // check if email and password are provided
        if(!email || !password){
            return res.status(400).json({
                success: false,
                Message:"Please provide email and password"
            })
        }

        //check user is Register
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                Message:"Invalide Email or Password"
            })
        }

        //check password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                Message:"Invalide Email or Password"
            })
        }

        //token creation
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:"1d"})

        res.cookie("token", token)

        res.status(200).json({
            success: true,
            Message : "User Login Successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    } catch(err) {
        console.error("Login error:", err)
        res.status(500).json({
            success: false,
            Message: "Internal server error"
        })
    }
}
async function logoutUserController(req,res){
    const token = req.cookies.token
    if(token){
         await blacklistTokenModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        Message:"User Logout Succesfully"
    })
}

async function getUserDetailsController(req,res){

    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        user:{
            id:user._id,
            username : user.username,
            email : user.email
            
        }
    })
}



module.exports ={regiterUserController,loginUserController,logoutUserController,getUserDetailsController}