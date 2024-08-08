const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is not valid']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    photo_url: {
        type: String,
        trim: true
    },
    phone_num: {
        type: Number,
        match: [/^\d{10}$/, 'Phone number is not valid']
    },
    college_uid: {
        type: String,
        trim: true
    },
    college_uid_photo_url: {
        type: String,
        trim: true
    },
    college_name: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'], // Restrict roles
        default: 'user'
    }
}, { timestamps: true });

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


