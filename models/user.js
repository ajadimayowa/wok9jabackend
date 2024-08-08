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

    phoneNumber : {
        type:String,
        required: true
    },
otpCode : {
    type:String,
    required:true
},
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },

    dateTime: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('signedupUsers', userTemplate);