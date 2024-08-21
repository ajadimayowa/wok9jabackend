const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },
    otpCode: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    walletBalance: { type: Number },
    messages: {
        type: String
    },
    gigs: {
        type: [String],
    },
   
    idType: { type: String },
    userNin: { type: String },
    identifiCationDoc: { type: String },
    officeAddress: {
        type: String
    },
    secondaryAddress : {
        type:String
    },
    profilePicture: {
        type: String
    },
    
    
    dateTime: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('signedupUsers', userTemplate);