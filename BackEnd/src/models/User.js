const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// Define the Token Schema
const TokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { _id: false });

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20,
    },
    last_name: {
        type: String,
        default: null,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20,
    },
    user_name: {
        type: String,
        default: null,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide an Email"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    birthday: {
        day: {
            type: Number,
            min: 1,
            max: 31,
            default: null,
        },
        month: {
            type: Number,
            min: 1,
            max: 12,
            default: null,
        },
        year: {
            type: Number,
            min: 1920,
            max: new Date().getFullYear(),
            default: null,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    accessToken: {
        type: String,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Validate the password before hashing
        const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
        if (!passwordValidationRegex.test(this.password)) {
            const error = new Error("Password should contain 6 to 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
            return next(error);
        }
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

/*
Example body for Schema

{
  "user": {
    "first_name": "Ezequiel",
    "last_name": "Gonzalez",
    "user_name": "n00bst3r",
    "email": "djzekz@gmail.com",
    "password": "StrongPass!123",
    "birthday": {
      "day": 23,
      "month": 4,
      "year": 1986
    },
    "favorites": []
  }
}
*/