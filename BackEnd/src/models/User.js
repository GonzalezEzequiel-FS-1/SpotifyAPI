const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20
    },
    user_name: {
        type: String,
        unique:true,
        required: [true, "Please provide a User Name"],
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        unique:true,
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
        minlength: 6,
        maxlength: 16,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/.test(value)
            },
            message: "Password should contain 8 to 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
    },
    birthday: {
        day: {
            type: Number,
            min: 1,
            max: 31
        },
        month: {
            type: Number,
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            min: 1920,
            max: new Date().getFullYear()
        },
    }, createdAt: {
        type: Date,
        default: Date.now
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorites"
    }],


})

module.exports = mongoose.model('User', UserSchema)

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