const axios = require('axios')


const User = require('../../models/User')
const signUp = async (req, res) => {
    req.session.user = null;
    const {user_name, password, email} = req.body;
    const userData = req.body

    if (!user_name || !password || !email) {
        res.status(400).json({
            success: false,
            message: `No user data provided`
        })
    }
    console.log(' CORRECT FORMAT FOR USER DATA ');

    try {
        const newUser = new User(userData)
        const savedData = await newUser.save();
        if (!savedData) {
            res.status(400).json({
                success: false,
                message: `User ${user.data} not saved to database`
            })
        }
        console.log(' USER SAVED TO DB ');
        res.status(200).json({
            success:true,
            message:`User created`,
            userData:savedData
        })
    } catch (error) {
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

        return res.status(500).json({
            success: false,
            message: `${req.method} failed, consult >>> ${error.message}`
        });

    }
};

module.exports = signUp;