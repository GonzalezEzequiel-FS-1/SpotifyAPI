const User = require('../../models/User');
const axios = require('axios');

const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const tokenRefresher = async (req, res, next) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No user provided',
        });
    }

    try {
        console.log(`User: ${user}`);
        const reqUser = await User.findOne({ user_name: user });
        console.log(`ReqUser: ${reqUser}`);

        if (!reqUser) {
            console.log('User not found');
            return res.status(400).json({
                success: false,
                message: `${user} not found in database`,
            });
        }

        const refreshToken = reqUser.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: `Unable to retrieve refresh token for ${user}`,
            });
        }

        console.log(`Refresh Token: ${refreshToken}`);
        const response = await axios.post(TOKEN_URL, new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const newToken = response.data.access_token;
        console.log(`New Token: ${newToken}`);

        // Update the user's token in the database if necessary
        reqUser.accessToken = newToken;
        await reqUser.save();
        if(reqUser){
            return res.status(400).json({
                success:false,
                message:"refresh token not obtained"
            })
        }
        await User.findOneAndUpdate(
            {user_name:user},
            {accessToken:newToken},
            {new:true}
        );
        // return res.status(200).json({
        //     success: true,
        //     accessToken: newToken,
        // });
        next()

    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = tokenRefresher;
