
const { csrf_generator, csrf_secret } = require('../util/csrf')

const checkCSRF = async (req, res, next) => {
    if (req.body.csrf_token){ 
        try{
            const { csrf_token } = req.body
            const csrf_secret = req.session.csrf_secret


            console.log("secret: " +csrf_secret)
            console.log("token: "+csrf_token)
            
            if (!csrf_generator.verify(csrf_secret, csrf_token)) {
                return res.status(401).json({message: "Invalid CSRF Token"})
            } else {
                next()
            }
        } catch (err){
            console.log(err.message)
            return res.status(401).json({message: "Invalid CSRF Token"})
        }
    } else { //no csrf token found
        return res.status(401).json({message: "Invalid CSRF Token"})
    }
}


module.exports = { checkCSRF }