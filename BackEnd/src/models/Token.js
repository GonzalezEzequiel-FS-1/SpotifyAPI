const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
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
    accessToken:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Token", TokenSchema);