const jwt = require('jsonwebtoken')
const User = require('../models/User.js');

const auth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ 
        try{
            const token = req.headers.authorization.split(' ')[1]

            const user = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = user
            next()
            
        } catch (err){
            return res.status(401).json({message: "Unauthorised"})
        }
    } else { //no token found
        return res.status(401).json({message: "Unauthorised"})
    }
}


const authAdmin = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ 
        try{
            const token = req.headers.authorization.split(' ')[1]

            const user = jwt.verify(token, process.env.TOKEN_SECRET)

            let dbuser = await User.findOne({ _id: user._id });
            if (dbuser.admin){
                req.user = user
                next()
            } else { //not an admin >:(
                return res.status(401).json({message: "Unauthorised"})
            }
        } catch (err){
            return res.status(401).json({message: "Unauthorised"})
        }
    } else { //no token found
        return res.status(401).json({message: "Unauthorised"})
    }
}


module.exports = {auth, authAdmin}