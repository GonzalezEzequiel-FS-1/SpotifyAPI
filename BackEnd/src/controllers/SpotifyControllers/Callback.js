const axios = require('axios');
const User = require('../../models/User');

const callback = async (req, res) => {
    const { code, user_name } = req.query; // Ensure `user_name` is passed as a query parameter
    const redirectUri = 'YOUR_REDIRECT_URI'; // Replace with your actual redirect URI
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';

    try {
        // Step 1: Exchange the authorization code for tokens
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }).toString(), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        // Step 2: Extract tokens from the response
        const { access_token, refresh_token, expires_in } = response.data;

        // Step 3: Calculate expiration time
        const expiresAt = new Date().getTime() + expires_in * 1000;

        // Step 4: Find user and update tokens
        const user = await User.findOne({ user_name });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update tokens and expiration
        user.accessToken = access_token;
        user.refreshToken = refresh_token;
        user.expiresAt = expiresAt;

        // Step 5: Save updated user data
        await user.save();

        // Step 6: Respond to client
        res.status(200).json({
            success: true,
            message: 'User tokens updated successfully',
            user,
        });
        
    } catch (error) {
        console.error('Error handling Spotify callback:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Error updating user with Spotify tokens',
            error: error.response?.data || error.message,
        });
    }
};

module.exports = callback;
