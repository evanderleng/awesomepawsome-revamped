
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const escape = require('escape-html');
const {uploadToLocal,uploadAvatar} = require("../middleware/imageMiddleware.js")

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
        
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync())

        user = await User.create({
            username,
            password: hash,
            email,
            admin: false
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
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {algorithm: 'HS512', expiresIn: '36000s'}) //maybe move to auth util

                res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                    httpOnly: true,
                    //secure: true, #to set to true after https is setup
                    sameSite: true,
                    maxAge: 60 * 60 * 24 //3 days
                }))

                return res.status(200).json({message: "Login successful", username: user.username, _id: user._id, admin: user.admin, avatar:user.avatar, "token": token})
            }
        } 
        req.ip
        return res.status(401).json({message: "Wrong username or password"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

// const editProfile = async (req, res) => { //MUST FIX TO ADD SECURITY
//     try{
//         console.log(req.user)

//         let changes = await User.updateOne({ _id: req.user }, {$set: [req.body]})

//         //let hh = await User.updateOne({ _id: req.user }, {$set: {username: req.body.newUsername}})
//         return res.status(200).json({message: "Profile change successful."})
//     } catch (err) {
//         return res.status(500).json({message: err.message});
//     }
// }

const getProfile = async (req, res) => {
    try{
        let user = await User.findOne({ _id: req.user._id }, {_id:0,username:1,email:1,createdAt:1, avatar:1})

        
        user.username = escape(user.username)
        user.email = escape(user.email)

        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


const editProfile = async (req, res) => {
    try{
        const upload = uploadToLocal.single('avatar');

        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            const {name, email, address} = req.body;
            if (req.file){
                let user = await User.findOne({ _id: req.user._id })

                const cloudImgUrl = await uploadAvatar(req.file, user.username);

                let updateUser = await User.updateOne({ _id: req.user }, {$set: {avatar: cloudImgUrl, name,email,address}})
                if (updateUser){
                    return res.status(200).json({message: "Edit Success"})
                }
            } else {
                let updateUser = await User.updateOne({ _id: req.user }, {$set: { name,email,address}})
                if (updateUser){
                    return res.status(200).json({message: "Edit Success"})
                }
            }
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {addUser, login, editProfile, getProfile}