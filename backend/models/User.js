const mongoose = require('mongoose');

const petDetailsSchema = new mongoose.Schema({
    petName: { type: String, default: "" },
    petBreed: { 
        type: String, 
        enum: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer"],
        default: "Labrador Retriever"
    },
    petAge: { 
        type: String, 
        enum: ["Puppy", "Junior", "Adult", "Senior"],
        default: "Adult"
    },
    petSize: { 
        type: String, 
        enum: ["Small", "Medium", "Large", "Giant"],
        default: "Medium"
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
