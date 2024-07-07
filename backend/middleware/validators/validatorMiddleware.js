

const {validationResult} = require('express-validator');

const checkValid = async (req, res, next) => {
	try{
		const errors = validationResult(req)
	
		if ( !errors.isEmpty() ) {
			return res.status(400).json( {
				message: errors.array()[0].msg, 
				path: errors.array()[0].path
			} );
		} else {
			next()
		}
	} catch (err){
		console.log(err)
		return res.status(400).json({message: "Bad request body"})
	}
}

  
module.exports = {checkValid};