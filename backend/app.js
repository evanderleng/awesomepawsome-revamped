const express = require('express')
const dotenv = require('dotenv')

const User = require("./models/User")
const connDB = require('./db')

const UserRouter = require("./routes/UserRoutes.js")


dotenv.config()
connDB()
const app = express()
app.use(express.json())

//testing frontend backend connection works, delete before submission
app.get("/api/test", (req,res) => {
    res.json({"testing": "if you can read this, you have connected to backend"})
})


app.use("/api/users", UserRouter);


app.listen(4000, () => {console.log("Server started on port 4000")})
