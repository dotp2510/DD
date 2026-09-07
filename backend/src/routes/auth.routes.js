const express = require("express")
const authControllers = require("../controllers/auth.controllers")
const authMidlleware = require("../middleware/auth.middleware")
const authRouter = express.Router()

/**
 * /api/auth/register
 * for create account of user
 */
authRouter.post("/register",authControllers.regiterUserController)

/**
 * /api/auth/login
 * for login account of user
 */
authRouter.post("/login",authControllers.loginUserController)



/**
 * /api/auth/logOut
 * for login account of user
 */
authRouter.get("/logout",authControllers.logoutUserController)
/**
 * /api/auth/get-me
 * getUser details
 */

authRouter.get("/get-me",authMidlleware.authUser,authControllers.getUserDetailsController)


module.exports=authRouter
