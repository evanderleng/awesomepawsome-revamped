const jwt = require('jsonwebtoken')


const authenticate = async (req, res, next) => {
    if (req.headers.authorization){ //to add regex (global regex js page?)
        try{
            const token = req.headers.authorization.split(' ')[1]

            const {_id} = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = _id
            next()
            
        } catch (err){
            console.log(err.message)
            return res.status(401).json({message: "Unauthorised"})
        }
    } else { //no token found
        return res.status(401).json({message: "Unauthorised"})
    }
}


module.exports = {authenticate}