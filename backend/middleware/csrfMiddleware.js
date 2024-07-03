
const { csrf_generator, csrf_secret } = require('../util/csrf')
const User = require('../models/User.js');

const checkCSRF = async (req, res, next) => {
    try{
        if (req.body.csrf_token){ 
            try{
                const { csrf_token } = req.body

                console.log("token: "+csrf_token)

                let user = await User.findOne({ _id: req.user._id });

                console.log("sec: "+user.csrf_secret)

                if (!user) {
                    return res.status(404).json({ message: "Error verifying user" });
                } else {
                    const csrf_secret = user.csrf_secret
                    console.log("secret: " +csrf_secret)
                    console.log("token: "+csrf_token)
                    
                    if (!csrf_generator.verify(csrf_secret, csrf_token)) {
                        return res.status(401).json({message: "Invalid CSRF Token"})
                    } else {
                        next()
                    }
                }
            } catch (err){
                console.log(err.message)
                return res.status(401).json({message: "Invalid CSRF Token"})
            }
        } else { //no csrf token found
            return res.status(401).json({message: "No CSRF Token found"})
        }
    } catch (err) {
		return res.status(500).json({ message: err });
	}
}


module.exports = { checkCSRF }