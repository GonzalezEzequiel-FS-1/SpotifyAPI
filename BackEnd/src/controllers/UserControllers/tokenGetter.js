const axios = require('axios');
const User = require('../../models/User')
const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const getTokenRoute = async (req, res) => {
    //console.log(`USER FROM GET TOKEN >>>>>>>>>>>>${JSON.stringify(user)}`)
    const userName = req.session.user.user_name;
    //console.log(`USER NAME FROM GET TOKEN >>>>>>> ${JSON.stringify(userName)}`)
    //console.log(`Formatted ${JSON.stringify(user)} to ${userName}`)
    //console.log('==> Entered getToken function with user:', userName);

    if (!userName) {
        //console.log('No user provided in session');
        return res.status(400).json({
            success: false,
            message: 'No user provided in session'
        });
    }

    try {
        //console.log(`==> Searching for user in database: ${userName}`);
        const userData = await User.findOne({ user_name: userName });
        //console.log('Database Query Result:', userData);

        if (!userData) {
            console.error('User not found in database');
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const accessToken = userData.accessToken;
        const refresh_token = userData.refreshToken
        //console.log('User Access Token:', accessToken);

        if (!accessToken) {
            console.error('No access token found for user');
            return res.status(400).json({
                success: false,
                message: 'No access token found for the user'
            });
        }
        if (!refresh_token) {
            console.error('No refresh token token found for user');
            return res.status(400).json({
                success: false,
                message: 'No refresh token found for the user'
            });
        }
        //console.log(refresh_token)
        //console.log('Access token successfully retrieved');
        return res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken:refresh_token
        });

    } catch (error) {
        console.error('==> Entering Error checks')
        if(error.response === 401){
            console.error('EXPIRED TOKEN')
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

module.exports = getTokenRoute;
