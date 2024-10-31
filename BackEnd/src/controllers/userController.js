const User = require('../models/User');
const mongoose = require('mongoose')

// Create a User
const createUser = async (req, res) => {
    //Log the body for troubleshooting
    console.log(req.body);
    // Collect the user data from the request's body
    const { user } = req.body;
    
    // Ensure that all requested data is provided
    // if (!user.first_name || !user.last_name || !user.user_name || !user.email || !user.password || !user.birthday) {
    //     console.log(`Failed here`)
    //     // If there is missing data on the request respond with 422 "Unprocessable Content"
    //     return res.status(422).json({
    //         success: false,
    //         message: `Missing user data, please fill all fields `
    //     })
        
    // }
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
                message: `User ${name} not found`,
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
            success: false, // Indicates that an error occurred
            message: error.message
        });
    }
};

const getAllUsers = async (req, res)=>{
    try{
    const users = await User.find()
    if(!users || users.length === 0){
        return res.status(402).json({
            success:false,
            message:`No users in database`
        })
    }
    return res.status(200).json({
        success:true,
        data:users
    })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
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
    modifyUser

}