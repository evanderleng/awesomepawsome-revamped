const mongoose = require('mongoose');

const petDetailsSchema = new mongoose.Schema({
    petName: { type: String },
    petBreed: { 
        type: String, 
        enum: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer"] 
    },
    petAge: { 
        type: String, 
        enum: ["Puppy", "Junior", "Adult", "Senior"]
    },
    petSize: { 
        type: String, 
        enum: ["Small", "Medium", "Large", "Giant"]
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
    totpSecret : {type: String},
    petDetails: petDetailsSchema 
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema)
