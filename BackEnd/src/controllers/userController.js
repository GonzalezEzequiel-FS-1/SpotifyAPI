const User = require('../models/User');
const mongoose = require('mongoose')

// Create a User
const createUser = async (req, res) => {
    //Log the body for troubleshooting
    console.log(req.body);
    // Collect the user data from the request's body
    const { user } = req.body;
    // Ensure that all requested data is provided
    if (!user.first_name || !user.last_name || !user.user_name || !user.email || !user.password || !user.birthday) {

        // If there is missing data on the request respond with 422 "Unprocessable Content"
        return res.status(422).json({
            success: false,
            message: `Missing user data, please fill all fields `
        })
    }
    try {
        // If the previous check passes, attempt to create a new user
        const newUser = new User(user)

        // Await Saving the user data to the server
        const userData = await newUser.save()

        // If the the data is correct respond with 201 "Created".
        return res.status(201).json({
            success: true,
            message: `User Created`,
            data: userData
        })
    } catch (error) {

        // Catch specific Mongo validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error: ' + error.message
            });
        }

        // Check for "Duplicate Keys"
        if (error.code === 11000) { 
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists.'
            });
        }

        // If an unknown error occurs respond with status 500 "Internal Server error"
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult >>> ${error.message}`
        })
    }
}

module.exports = {
    //getOneUser,
    //getAllUsers,
    createUser,
    //createMultipleUsers,
    //deleteUser,
    //deleteAllUsers,
    //modifyUser,

}