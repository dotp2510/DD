const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {

    // STEP 3: Check both cookies AND the Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not provided.",
            token: token
        })
    }

    // STEP 1: Wrap the database call AND the jwt verification in one try/catch
    try {
        const IsTokenBlacklist = await blacklistModel.findOne({ token })
        if (IsTokenBlacklist) {
            return res.status(401).json({
                message: "Token is Invalid (Blacklisted)"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (err) {
        // STEP 2: Add 'return' here for consistency and safety
        return res.status(401).json({
            message: "Invalid token or server error"
        })
    }
}

module.exports = { authUser }
