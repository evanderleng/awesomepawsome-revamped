

const {Validator} = require('../util/validator.js')



const checkAddUser = async (req, res, next) => {
	try{
		const rule = {
			"username":"required|string|usernameRule",
			"email": "required|email",
			"password": "required|string|passwordRule"
		}

		const result = new Validator(req.body, rule)

		if (result.passes()) {next()}
		else {return res.status(400).json({errors: result.errors.errors});}
	} catch (err){
		console.log(err)
		return res.status(400).json({message: "bad request body"})
	}
}
  
module.exports = {checkAddUser};