const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    if (req.headers.authorization){ //to add regex (global regex js page?)
        try{
            const token = req.headers.authorization.split(' ')[1]

            const user = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = user
            next()
            
        } catch (err){
            console.log(err.message)
            return res.status(401).json({message: "Unauthorised"})
        }
    } else { //no token found
        console.log(err.message)
        return res.status(401).json({message: "Unauthorised"})
    }
}


module.exports = {auth}