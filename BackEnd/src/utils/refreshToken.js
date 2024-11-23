const axios = require('axios')
const TOKEN_URL = process.env.TOKEN_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const refreshToken = async (refresh_token) => {
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