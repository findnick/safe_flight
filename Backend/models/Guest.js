// const mongoose = require('mongoose');
import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    flightData: {
        type: Object,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('guest', userSchema);

// module.exports = mongoose.model('user', userSchema)