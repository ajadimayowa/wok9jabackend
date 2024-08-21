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
    providers : {
        type : [String],
        require:true
    },
    category :{
        type:String,
        require : true
    },
    basic: {
        type: Boolean,
        require:true
    },
    dateTime : {
        type:Date,
        default:Date.now()
    }


});

module.exports = mongoose.model('services',ServiceSchema)