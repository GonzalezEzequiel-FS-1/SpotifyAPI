const axios = require("axios");
const querystring = require("node:querystring");

// Function to redirect users to Spotify's authorization page
const redirectToSpotifyAuth = (req, res) => {
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private`;
    res.redirect(authURL);
};

// Function to handle the callback from Spotify
const callback = async (req, res) => {
    // Extract the authorization code from the query parameters
    const code = req.query.code;

    // Log for debugging
    console.log(`Code: ${code}`);

    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const token_url = process.env.TOKEN_URL
    const frontendURL = process.env.FRONTEND_URL;


    // Check if the code is undefined
    if (!code) {
        return res.status(400).json({
            success: false,
            message: 'No authorization code found in request.'
        });
    }

    // Set up the parameters for the token request
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);


    // Attempt to obtain the access token
    try {
        const response = await axios.post(token_url, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Store the access token
        const token = response.data.access_token;

        console.log('Access Token:', token);

        // Send a success response with the token 
        // res.status(200).json({
        //     success: true,
        //     access_token: token,
        //     message: 'Token obtained successfully!'
        // });


        //TODO STORE TOKEN ON SERVER:
        
        
        //redirect the user to the home page

        res.status(302).redirect(`${frontendURL}`);

    } catch (error) {
        // Log and return an error response
        console.error('Error fetching access token:', error.message);
        res.status(500).json({
            success: false,
            message: `Unable to fetch token. Error: ${error.message}`,
        });
    }
};





// Export the functions for use in your routes
module.exports = {
    redirectToSpotifyAuth,
    callback,
};
