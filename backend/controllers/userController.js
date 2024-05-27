
const User = require("../models/User")


const addUser = async (req, res)=>{
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

const login = async (req, res)=>{ //wip
    try{
        const {username, password} = req.body;
        let user = await User.findOne({ username, password });

        if (user) {
            return res.status(200).json({message: "Login successful. You have logged in as " +user})
        } 
        
        return res.status(400).json({message: "Wrong username or password"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {addUser, login}