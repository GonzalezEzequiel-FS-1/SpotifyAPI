const User = require('../../models/User');
const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const axios = require('axios')
const tokenRefresher = async (req, res) => {
    const {user} = req.body

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No user provided',
        });
    }
    try {
        console.log(`User: ${user}`);
        const reqUser = await User.findOne({ user_name: user });
        console.log(`ReqUser: ${reqUser}`)
        // Check the result of the query
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
        console.log(`Refresh Token: ${refreshToken}`)
        const newToken = await axios.post(TOKEN_URL, new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: CLIENT_ID
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        
        console.log(`New Token: ${newToken.data}`)
        if(!newToken){
            return res.status(400).json({
                success:false,
                message:'New token not created'
            })
        }
        return res.status(200).json({
            success:true,
            new_token:newToken
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = tokenRefresher;
