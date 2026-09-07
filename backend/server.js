const app = require("./src/app.js")
const connectDB = require ("../backend/src/config/database.js")
const metaAi = require("../backend/src/services/ai.service.js")

    connectDB()


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 3000")
    metaAi();
})