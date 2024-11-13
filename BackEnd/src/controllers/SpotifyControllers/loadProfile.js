const User = require('../../models/User');
const axios = require('axios');
const getToken = require('../../utils/getToken');

const loadProfile = async (req, res) => {
    
    const  user  = req.session.user//.user_name;
    console.log(user)

    const tokenResult = await getToken(user);

    if (!tokenResult.success) {
        return res.status(400).json(tokenResult);
    }

    const accessToken = tokenResult.accessToken;

    try {
        const userProfile = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log(userProfile.data);
        return res.status(200).json({
            success: true,
            profile: userProfile.data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error loading profile'
        });
    }
};

module.exports = loadProfile;