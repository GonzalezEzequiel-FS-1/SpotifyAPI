const axios = require('axios');
const User = require('../models/User')
const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const checkActiveToken = async (req, res, next) => {
    console.log("==>>>>>>>>>>>>> TOKEN REFRESHER STARTED <<<<<<<<<<<<<< <===")
    const user = req.session.user.user_name;
    console.log(user)
    if (!user) {
        console.log("Checking user")
        return res.status(400).json({
            success: false,
            message: 'No user in session'
        })
    }

    console.log("User found, Searching database")
    const userData = await User.findOne({ user_name: user })
    if (!userData) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    console.log("User retrieved from DB, accessing token")
    const accessToken = userData.accessToken;
    const refresh_token = userData.refreshToken;

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            message: 'No access token provided'
        });
    }

    console.log("Token retrieved, getting spotify")
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response) {
            return res.status(400).json({
                success: false,
                message: 'Unable to retrieve profile from Spotify'
            })
        }

        console.log("Profile retrieved")
        if (response.status === 200) {
            req.active_token = true;
            req.user = user; // Attach user to req object
            return next();
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log(`Token Expired Check failed`)

            try {
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

                console.log("Token refresh response received:", response.data);

                const newToken = response.data.access_token;

                if (!newToken) {
                    return res.status(400).json({
                        success: false,
                        message: "refresh token not obtained"
                    })
                }

                console.log(`TOKEN REFRESHER: GOT'EM!!!: ${newToken}`);
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

                console.log(`Access Token for user: ${user} updated to ${newToken}, New Data : ${updatedUserData}`);
                req.active_token = true;
                req.user = user;
                req.newToken = newToken;
                return next();  

            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
                return res.status(500).json({
                    success: false,
                    message: 'Error refreshing token',
                });
            }
        }

        console.error('Error checking token:', error.response ? error.response.data : error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired access token',
        });

    }

};

module.exports = checkActiveToken;
