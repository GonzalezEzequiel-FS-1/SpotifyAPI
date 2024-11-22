const axios = require('axios');
const User = require('../../models/User');

const callback = async (req, res) => {
    const { code, state: user_name } = req.query; // Retrieve user_name from state parameter
    const redirectUri = process.env.REDIRECT_URI; // Replace with your actual redirect URI
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    // Log the complete query, lets see what is coming through maybe the user is remaining the same
    console.log(`REQ.QUERY====>${JSON.stringify(req.query)}`)
    // Log the user_name to verify it is being passed correctly
    console.log('Received user_name:', user_name);

    try {
        // Step 1: Exchange the authorization code for tokens
        console.log(' HITTING SPOTIFY ');
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
        console.log(' GOT TOKEN ');
        // Step 2: Extract tokens from the response
        const { access_token, refresh_token, expires_in } = response.data;
        console.log(` RESPONSE DATA ${JSON.stringify(response.data)} `);

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

        // Step 6: Redirect to the home page
        res.redirect('http://localhost:5173/home');
        
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
