const axios = require('axios');
const User = require('../models/User')

const checkActiveToken = async (req, res, next) => {
    const user = req.session.user;
    if(!user){
        return res.status(400).json({
            success:false,
            message:'No user in session'
        })
    }
    const userData = await User.findOne({user_name:user})
    if(!userData){
        return res.status(404).json({
            success:false,
            message:'User not found'
        })
    }
    const accessToken = userData.accessToken

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            message: 'No access token provided'
        });
    }
    

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 200) {
            return next();
        }
    } catch (error) {
        console.error('Error checking token:', error.response ? error.response.data : error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired access token',
        });
    }
    
};

module.exports = checkActiveToken;