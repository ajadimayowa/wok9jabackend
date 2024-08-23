const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    gigTitle: { type: String, required: true },
    gigDescription: {
        type: String,
        required: true
    },
    gigImages: {
        type: [String],
    },
    gigCategoryId: { type: String, required: true },
    creatorFullName: { type: String, required: true },
    creatorPhoneNumber: { type: Number, required: true },
    creatorOfficeAddress: { type: String, required: true },
    sellerPrice: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    creatorId: { type: String, required: true },
    

});

module.exports = mongoose.model('gigs', GigSchema)