const User = require('../../models/User');
const axios = require('axios');
const getToken = require('../../utils/getToken');

const loadProfile = async (req, res) => {
    //console.log(req.session)
    const  user  = req.session.user;
    //console.log(user)

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

        //console.log(userProfile.data);
        return res.status(200).json({
            success: true,
            profile: userProfile.data
        });
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Error loading profile'
        });
    }
};

module.exports = loadProfile;