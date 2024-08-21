const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {
        type: String,
        required: true
    },
    gigImages: {
        type: [String],
    },
    serviceCategory: { type: String, require: true },
    price: {
        type: Number,
        require: true
    },
    creatorFullName: { type: String, required: true },
    creatorPhoneNumber: { type: Number, required: true },
    creatorOfficeAddress: { type: String, required: true },
    price: { type: Number, required: true },
    creatorId: { type: String, required: true },
    

});

module.exports = mongoose.model('gigs', GigSchema)