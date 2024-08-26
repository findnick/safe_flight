// const mongoose = require('mongoose');
import mongoose from "mongoose"

const contentSchema = mongoose.Schema({
    privacy: {
        type: String,
        required: false,
        default: null,
    },
    cancellation: {
        type: String,
        required: false,
        default: null,
    },
    aboutUs: {
        type: String,
        required: false,
        default: null,
    },
    contactUs: {
        type: String,
        required: false,
        default: null,
    },
    home: {
        type: String,
        required: false,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('content', contentSchema);

// module.exports = mongoose.model('user', userSchema)