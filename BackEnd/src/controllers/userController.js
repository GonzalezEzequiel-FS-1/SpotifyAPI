const User = require('../models/User');
const mongoose = require('mongoose')

// Create a User
const createUser = async (req, res) => {
    console.log(req.body);
    const { user } = req.body;
    
    // if (!user?.first_name || !user?.last_name || !user?.user_name || !user?.email || !user?.password || !user?.birthday) {
    //     return res.status(422).json({
    //         success: false,
    //         message: `Missing user data, please fill all fields `
    //     });
    // }
    
    try {
        const newUser = new User(user);
        const userData = await newUser.save();
        return res.status(201).json({
            success: true,
            message: `User Created`,
            data: userData
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error: ' + error.message
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists.'
            });
        }
        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult >>> ${error.message}`
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No users in database`
            });
        }
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// No other changes needed in other functions

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
    const { user_name } = req.params;
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
        const spotifyData = user.data.spotifyData
        // Return success response with the user data
        return res.status(200).json({
            success: true,
            data: user
            
        });
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};
const deleteAll = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} users deleted successfully`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete users",
            error: error.message
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { user_name, password } = req.body.user;
        const user = await User.findOne({ user_name });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If the password is correct, create a session or JWT and respond
        req.session.user = user; // or generate a JWT token
        return res.status(200).json({ message: 'Sign in successful!', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};


module.exports = {
    getOneUser,
    getAllUsers,
    createUser,
    //createMultipleUsers,
    deleteUser,
    deleteAll,
    modifyUser,
    signIn

}