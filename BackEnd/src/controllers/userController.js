const User = require('../models/User');
const mongoose = require('mongoose')

// Create a User
const createUser = async (req, res) => {
    const { user } = req.body;
    req.session.user = null;
    try {
        const newUser = new User(user);
        const userData = await newUser.save();

        // Set session user after user is saved
        req.session.user = {
            user_name: userData.user_name,
            email: userData.email
        };

        // Save session and send response after it completes
        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                return res.status(500).json({ success: false, message: "Session save error" });
            }
            return res.status(201).json({
                success: true,
                message: `User Created`,
                data: req.session.user.user_name,
            });
        });

    } catch (error) {
        // Catch and handle specific Mongo errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error: ' + error.message
            });
        } else if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists.'
            });
        }

        // For other errors, return a generic 500 response
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult >>> ${error.message}`
        });
    }
};

const deleteUser = async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(422).json({
            success: false,
            message: `No user name provided`
        })
    }
    try {
        const response = await User.deleteOne({ user_name: name })
        if (response.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: `User ${name} Deleted`,
                data: response
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `User ${name} not found.`
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

const modifyUser = async (req, res) => {
    const { user_name } = req.params; // Assuming user_name is passed as a parameter
    const { user } = req.body; // Accessing user object from request body

    // Destructure user object
    const { first_name, last_name, email, password, birthday } = user;

    const updatedData = {};

    // Update fields only if they are present in the request body
    if (first_name) updatedData.first_name = first_name;
    if (last_name) updatedData.last_name = last_name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;
    if (birthday) updatedData.birthday = birthday;

    // Log the updated data for debugging
    console.log('Updating user:', user_name, 'with data:', updatedData);

    try {
        // Attempt to find and update the user by user_name
        const updatedUser = await User.findOneAndUpdate(
            { user_name },
            updatedData,
            { new: true, runValidators: true } // Ensures validation is applied
        );

        // Handle case where the user is not found
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: `User ${user_name} not found.`
            });
        }

        // Return success response with updated user data
        return res.status(200).json({
            success: true,
            message: `Successfully edited user ${user_name}`,
            data: updatedUser
        });
    } catch (error) {
        // Return error response
        console.error('Error during update:', error); // Log error for debugging
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getOneUser = async (req, res) => {
    const { user_name } = req.params; // Get the user name from the request parameters

    try {
        // Attempt to find the user by user_name
        const user = await User.findOne({ user_name: user_name });

        // Handle case where the user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User ${user_name} not found`,
            });
        }

        // Return success response with the user data
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        // Handle errors during the database query
        return res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No users in database`
            })
        }
        return res.status(200).json({
            success: true,
            data: users
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const signIn = async (req, res) => {
    const { user } = req.body

    const user_name = user.user_name;
    const password = user.password;
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `Please provide a user name`
        })
    }
    try {

        if (!user_name || !password) {
            return res.status(401).json({
                success: false,
                message: ` User Data not found`
            })
        }
        const loggingUser = await User.findOne({
            user_name: user_name,
        })
        if (!loggingUser) {
            return res.status(404).json({
                success: false,
                message: `User ${user_name} not found.`
            })
        }
        const isMatch = await loggingUser.comparePassword(password)
        if (!isMatch) {
            
            return res.status(401).json({
                success: false,
                message: `Passwords did not match`
            })
           
        }

        req.session.user = {
            user_name: loggingUser.user_name
        }

        req.session.save((error) => {
            if (error) {
                console.error(error.message)
                return res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
        })

        return res.status(200).json({
            success:true,
            message:`User ${user_name} authenticated successfully`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


module.exports = {
    getOneUser,
    getAllUsers,
    createUser,
    //createMultipleUsers,
    deleteUser,
    //deleteAllUsers,
    modifyUser,
    signIn
}







/*

{"_id":"2SRFXIQc82JMhTUxnTjL1eVc8qyPQPu3","expires":{"$date":{"$numberLong":"1730571153557"}},"session":"{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-11-02T18:12:33.557Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"user_name\":\"qoqoqoq\",\"email\":\"qoqoqoqo@gmail.com\"}}"}


*/