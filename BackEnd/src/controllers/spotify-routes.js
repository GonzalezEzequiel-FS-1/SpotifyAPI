const express = require('express');
const querystring = require('querystring');
const newRouter = express.Router();
const AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "900924d496154e33817d58f496c06d3e";
const CLIENT_SECRET = "ad8922c9a8a34ddc9bd96da4889b8908";
const REDIRECT_URI = "http://localhost:3069/api/callback";
const generateRandomString = require("../utils/randomStringGenerator");
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PROFILE_URL = "https://api.spotify.com/v1/me"; // Added profile URL
const axios = require('axios');
const Token = require('../models/Token');
const User = require('../models/User');
const mongoose = require('mongoose');
const spotify_search_URL = `https://api.spotify.com/v1/search/`

// External function to refresh the user token
const refreshAccessToken = async (user) => {
    const body = querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: user.spotifyData.refreshToken
    });

    const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

    try {
        const response = await axios.post(TOKEN_URL, body, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, expires_in } = response.data;

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

        user.spotifyData.accessToken = access_token;
        user.spotifyData.expiresAt = expiresAt;
        await user.save();

        return access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        throw error;
    }
}
// External function to refresh the user token
const getUserAccessToken = async (email) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error("User not found");
    }

    const now = new Date();

    // Check if the token is expired
    if (now >= user.spotifyData.expiresAt) {
        // Token is expired, refresh it
        return await refreshAccessToken(user);
    }

    // Token is valid
    return user.spotifyData.accessToken;
}

// Auth route
newRouter.get('/auth', (req, res) => {
    const scope = "user-read-private user-read-email";
    const state = generateRandomString(16);
    console.log('State:', state);

    try {
        res.redirect(`${AUTH_URL}?` + querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: true
        }));
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Authentication failed`
        });
    }
});

// Callback route
newRouter.get("/callback", async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.status(401).json({
            success: false,
            error: error,
            state: state
        });
    }

    if (!code || !state) {
        return res.status(400).json({
            success: false,
            message: "No Parameters received"
        });
    }

    const body = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI
    });

    const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

    try {
        const response = await axios.post(TOKEN_URL, body, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Step 2: Use the access token to get the user's Spotify ID and email
        const profileResponse = await axios.get(PROFILE_URL, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        const emailFromSpotify = profileResponse.data.email;
        const userId = profileResponse.data.id;
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

        // Step 3: Find the user and update their Spotify data
        const user = await User.findOneAndUpdate(
            { email: emailFromSpotify },
            {
                spotifyData: {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresAt: expiresAt
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(301).redirect('http://localhost:5173/home');

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.response ? error.response.data : error.message
        });
    }
});

newRouter.get('/some-protected-route', async (req, res) => {
    const email = req.user.email; // Assuming you have the user's email from the session or JWT

    try {
        const accessToken = await getUserAccessToken(email);

        // Now you can use accessToken to make further API calls
        const apiResponse = await axios.get('https://api.spotify.com/v1/some-endpoint', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json(apiResponse.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


//Get SpotNet Profile
newRouter.get('/getprofile/spotnet/:username', async (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(401).json({
            success: false,
            message: 'No user provided',
        });
    }

    try {
        const findUser = await User.findOne({ user_name: username });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: `User with username: ${username} not found`,
            });
        }
        const accessToken = findUser.spotifyData.accessToken;
        const refreshToken = findUser.spotifyData.refreshToken;
        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            Access_Token: accessToken,
            Refresh_Token: refreshToken
        });
    } catch (error) {
        console.error(`Internal Server Error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

//Get Spotify Profile
newRouter.get('/getprofile/spotify/:username', async (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(401).json({
            success: false,
            message: 'No user provided',
        });
    }

    try {
        const findUser = await User.findOne({ user_name: username });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: `User with username: ${username} not found`,
            });
        }

        // Check for Spotify data
        if (!findUser.spotifyData || !findUser.spotifyData.accessToken || !findUser.spotifyData.refreshToken) {
            return res.status(404).json({
                success: false,
                message: 'Spotify data not found for this user.',
            });
        }

        const accessToken = findUser.spotifyData.accessToken;

        // Fetch Spotify profile
        try {
            const spotifyProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            return res.status(200).json({
                success: true,
                message: 'User profile retrieved successfully',
                Spotify_Profile: spotifyProfile.data // Directly return the data
            });
        } catch (error) {
            console.error(`Error fetching Spotify profile: ${error.response ? error.response.data : error.message}`);
            return res.status(error.response?.status || 500).json({
                success: false,
                message: 'Failed to retrieve Spotify profile.',
                error: error.response ? error.response.data : error.message,
            });
        }
    } catch (error) {
        console.error(`Internal Server Error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

newRouter.get('/search/spotify', async (req, res) => {
    const { email, type, query } = req.query;

    if (!email || !type || !query) {
        return res.status(400).json({
            success: false,
            message: 'Incomplete search parameters',
        });
    }

    const encodedQuery = encodeURIComponent(query);
    const encodedType = encodeURIComponent(type);

    try {
        let userToken = await getUserAccessToken(email);

        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            });
        }

        let response;
        try {
            // Attempt the search request
            response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
                params: {
                    q: encodedQuery,
                    type: encodedType,
                    limit: 10,
                },
            });
        } catch (axiosError) {
            // Checking if the error is due to an unauthorized request (token expired)
            if (axiosError.response && axiosError.response.status === 401) {
                // Attempting to refresh the token
                userToken = await refreshAccessToken(email);
                if (!userToken) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unable to refresh token',
                    });
                }

                // Retrying the search request with the new token
                response = await axios.get('https://api.spotify.com/v1/search', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                    params: {
                        q: encodedQuery,
                        type: encodedType,
                        limit: 10,
                    },
                });
            } else {
                // Handling other errors
                console.error(`Search error: ${axiosError.message}`);
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred while searching',
                    error: axiosError.message,
                });
            }
        }

        // Check if the response contains valid data
        if (!response.data) {
            return res.status(404).json({
                success: false,
                message: 'No results found',
            });
        }

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error(`Search error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while searching',
            error: error.message,
        });
    }
});




module.exports = newRouter;