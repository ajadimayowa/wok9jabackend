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
    usersEmail: {
        type: String,
        required: true
    },
    userName: {
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