const mongoose = require("mongoose");

const todoTemplate = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    proposedPay: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required: true
    },
    actualCost: {
        type: String,
    },
    users: {
        type: [String],
        required: true
    },
    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('todos', todoTemplate)