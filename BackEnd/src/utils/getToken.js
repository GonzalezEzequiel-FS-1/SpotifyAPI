const axios = require('axios');
const User = require('../models/User')
const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const getToken = async (user) => {
    //console.log(user)
    const userName = user.user_name
    //console.log(`Formatted ${JSON.stringify(user)} to ${userName}`)
    //console.log('==> Entered getToken function with user:', userName);

    if (!userName) {
        //console.log('No user provided in session');
        return {
            success: false,
            message: 'No user provided in session'
        };
    }

    try {
        //console.log(`==> Searching for user in database: ${userName}`);
        const userData = await User.findOne({ user_name: userName });
        //console.log('Database Query Result:', userData);

        if (!userData) {
            //console.log('User not found in database');
            return {
                success: false,
                message: 'User not found'
            };
        }

        const accessToken = userData.accessToken;
        //console.log('User Access Token:', accessToken);

        if (!accessToken) {
            console.eror('No access token found for user');
            return {
                success: false,
                message: 'No access token found for the user'
            };
        }

        //console.log('Access token successfully retrieved');
        return {
            success: true,
            accessToken: accessToken
        };

    } catch (error) {
        console.error('==> Entering Error checks')
        if(error.response === 401 ){
            console.log('EXPIRED TOKEN')
            const response = await axios.post(TOKEN_URL, new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            //console.log("Token refresh response received:", response.data);

            const newToken = response.data.access_token;
            if (!newToken) {
                return res.status(400).json({
                    success: false,
                    message: "refresh token not obtained"
                })
            }
            //console.log(`TOKEN REFRESHER: GOT'EM!!!: ${newToken}`);
                const updatedUserData = await User.findOneAndUpdate(
                    { user_name: user },
                    { accessToken: newToken }
                );

                if (!updatedUserData) {
                    return res.status(404).json({
                        success: false,
                        message: 'Unable to update user'
                    })
                }
        }
        
        console.error('Error fetching user token:', error.message);
        return {
            success: false,
            message: 'Internal server error during token retrieval',
            error: error.message
        };
    }
};

module.exports = getToken;
