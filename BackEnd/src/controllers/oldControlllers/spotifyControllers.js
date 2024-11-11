const axios = require("axios");
const querystring = require("node:querystring");
const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;

// Function to redirect users to Spotify's authorization page
const redirectToSpotifyAuth = async (req, res) => {
    const dialog = true;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private&show_dialog=${dialog}`;
    res.redirect(authURL);
};

// Function to handle the callback from Spotify
const callback = async (req, res) => {
    const { code } = req.query; // Spotify will send the code in the query string
    const redirectUri = 'YOUR_REDIRECT_URI'; // The same redirect URI that you use for OAuth
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';

    // Step 1: Exchange the authorization code for the access token and refresh token
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
        });

        // Step 2: Extract the tokens from the response
        const { access_token, refresh_token, expires_in } = response.data;

        // Step 3: Calculate the expiration date (current time + expires_in)
        const expiresAt = new Date().getTime() + expires_in * 1000; // converts expires_in (in seconds) to milliseconds

        // Step 4: Find the user and update their token information
        const { user_name } = req.query; // Assuming the user is identified by user_name
        const user = await User.findOne({ user_name });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Step 5: Update the user with the new tokens and expiration date
        user.accessToken = access_token;
        user.refreshToken = refresh_token;
        user.expiresAt = expiresAt;

        // Step 6: Save the user
        await user.save();

        // Step 7: Send a response back to the client (e.g., redirect to the frontend)
        res.status(200).json({
            success: true,
            message: 'User tokens updated successfully',
            user,
        });

    } catch (error) {
        console.error('Error handling Spotify callback:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user with Spotify tokens',
            error: error.message,
        });
    }
};


const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out");
        }

        // Clear the cookie with the custom name
        res.clearCookie("Spotnetcookie", { path: "/" });
        res.send("Logged out");
    });
};

module.exports = {
    redirectToSpotifyAuth,
    callback,
    logout,
};
