const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo_url: {
        type: String
    },
    phone_num: {
        type: Number
    },
    college_uid: {
        type: String
    },
    college_uid_photo_url: {
        type: String
    },
    college_name: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
