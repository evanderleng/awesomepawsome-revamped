
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const addUser = async (req, res)=>{
    try{
        const {username, password, email} = req.body;
        let user = await User.findOne(
            { $or: [
                {username},
                {email}
            ]}
        );
        if (user){ //if already exists existing username or email
            if (user.username == username) {
                return res.status(400).json({message: "Username is already taken."})
            } else if (user.email == email){
                return res.status(400).json({message: "Email has already registered."})
            }
        }
        
        var salt = bcrypt.genSaltSync()
        var hash = bcrypt.hashSync(password, salt)

        user = await User.create({
            username, password: hash, email, admin: false
        })
        return res.status(201).json({message: "Successfully added!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const login = async (req, res)=>{ //to add check if already logged in
    try{
        const {username, password} = req.body;

        let user = await User.findOne({ username });

        if (user) {
            if (bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {algorithm: 'HS512', expiresIn: '3600s'}) //maybe move to auth util

                res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                    httpOnly: true,
                    //secure: true, #to set to true after https is setup
                    sameSite: true,
                    maxAge: 60 * 60 * 24 //3 days
                }))

                return res.status(200).json({message: "Login successful. You have logged in as " +user.username+ "."})
            }
        } 
        return res.status(401).json({message: "Wrong username or password"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const editProfile = async (req, res) => {
    try{
        console.log(req.user)

        let changes = await User.updateOne({ _id: req.user }, {$set: [req.body]})

        //let hh = await User.updateOne({ _id: req.user }, {$set: {username: req.body.newUsername}})
        return res.status(200).json({message: "Username change successful."})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const getProfile = async (req, res) => {
    try{
        let user = await User.findOne({ _id: req.user })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {addUser, login, editProfile, getProfile}