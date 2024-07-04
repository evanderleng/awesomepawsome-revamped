const mongoose = require('mongoose');

const petDetailsSchema = new mongoose.Schema({
    petName: { type: String },
    petBreed: { 
        type: String, 
        enum: ["labrador retriever", "german shepherd", "golden retriever", "french bulldog", "bulldog", "poodle", "beagle", "rottweiler", "yorkshire terrier", "boxer"],
        default: ""
    },
    petAge: { 
        type: String, 
        enum: ["puppy", "junior", "adult"],
        default: ""
    },
    petSize: { 
        type: String, 
        enum: ["small", "medium", "large", "giant"],
        default: ""
    }
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, index: true, unique:true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: Boolean, required: true},
    avatar: {type: String},
    address: {type: String},
    name: {type: String},
    csrf_secret: {type: String},
    totpSecret : {type: String},
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    petDetails: petDetailsSchema 
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema)
