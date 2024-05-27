const express = require('express')
const dotenv = require('dotenv')
const mongoSanitize = require('express-mongo-sanitize')
const connDB = require('./db')

const User = require("./models/User")
const Product = require("./models/Product")

const UserRouter = require("./routes/UserRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")


dotenv.config()
connDB()
const app = express()
app.use(express.json())
app.use(mongoSanitize())

//testing frontend backend connection works, delete before submission
app.get("/api/test", (req,res) => {
    res.json({"testing": "if you can read this, you have connected to backend"})
})


app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

app.listen(4000, () => {console.log("Server started on port 4000")})
