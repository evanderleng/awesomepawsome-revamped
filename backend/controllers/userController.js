
const User = require("../models/User")



const registerUser = async (req, res)=>{
    try{
        const {username, password} = req.body;
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({message: "Username is already taken."})
        } 
        
        user = await User.create({
            username, password
        })
        return res.status(201).json({message: "Successfully added!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {registerUser}