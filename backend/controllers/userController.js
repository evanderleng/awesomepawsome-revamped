
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
            admin: false,
            avatar: "https://res.cloudinary.com/dg7xhtwnl/image/upload/v1719492487/avatars/default.jpg",
        
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
    try {
        let user = await User.findOne(
            { _id: req.user._id }, 
            { _id: 0, username: 1, email: 1, createdAt: 1, address: 1, avatar: 1, petDetails: 1 }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
      
        // Log the user profile data
        //console.log('Fetched user profile:', user);

        // If you need to escape certain fields for security reasons

        user.username = escape(user.username);
        user.email = escape(user.email);
        user.createdAt = escape(user.createdAt);
        user.address = escape(user.address);
        user.avatar = escape(user.avatar);
        user.petDetails.petName = escape(user.petDetails.petName)
        user.petDetails.petBreed = escape(user.petDetails.petBreed)
        user.petDetails.petAge = escape(user.petDetails.petAge)
        user.petDetails.petSize = escape(user.petDetails.petSize)

        // Consider handling other fields if needed
        // For example, you could escape pet details or handle them conditionally
        
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        return res.status(500).json({ message: err.message });
    }
}


const editPet = async (req, res) => {
    try {
        const { petName, petBreed, petAge, petSize } = req.body.petDetails;

        const updateUser = await User.updateOne({ _id: req.user._id }, { $set:  {petDetails: {petName, petBreed, petAge, petSize} } });
        
        if (updateUser) {
            return res.status(200).json({ message: "Edit Success" });
        } else {
            // User found but no data modified
            return res.status(500).json({ message: "Edit Failed" });
        }
    } catch (dbError) {
        console.error('Database error during pet update:', dbError);
        return res.status(500).json({ message: "Database error: " + dbError.message });
    }
};

const editProfile = async (req, res) => {
    const upload = uploadToLocal.single('avatar');
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: "File upload failed: " + err.message });
        }
        try {
            const { username, email, address } = req.body;
            const updateData = { username, email, address };

            if (req.file) {
                const cloudImgUrl = await uploadAvatar(req.file, req.user.username);
                updateData.avatar = cloudImgUrl;
            }

            const actualUser = await User.findOne({ _id: req.user._id });
            if (!actualUser) {
                return res.status(500).json({ message: "Edit failed" });
            }
            const userUsername = await User.findOne({ username });   
            if (userUsername && userUsername._id!=req.user._id){ //if already exists existing username 
                return res.status(400).json({message: "Username is already taken"})
            }
            const userEmail = await User.findOne({ email });   
            if (userEmail && userEmail.email!=actualUser.email){ //if already exists existing email
                return res.status(400).json({message: "Email has already registered with another account"})
            }
            const updateUser = await User.updateOne({ _id: req.user._id }, { $set: updateData });
            if (updateUser) {
                return res.status(200).json({ message: "Edit Success" });
            } else {
                return res.status(500).json({ message: "Edit Failed" });
            }
        } catch (dbError) {
            console.error('Database error during profile update:', dbError);
            return res.status(500).json({ message: "Database error: " + dbError.message });
        }
    });
};




module.exports = {addUser, login, editProfile, editPet, getProfile}