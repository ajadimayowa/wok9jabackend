const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    icon : {
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    providers : {
        type : [String],
        required:true
    },
    category :{
        type:String,
        required : true
    },
    basic: {
        type: Boolean,
        required:true
    },
    dateTime : {
        type:Date,
        default:Date.now()
    }


});

module.exports = mongoose.model('services',ServiceSchema)