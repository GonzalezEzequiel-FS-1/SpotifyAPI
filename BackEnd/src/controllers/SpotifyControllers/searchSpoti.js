const User = require('../../models/User');
const getToken = require('../../utils/getToken');
const axios = require('axios');

const searchSpoti = async (req, res) => {
    console.log('==> Entered searchSpoti function');
    
    // Log session info
    const user = req.session.user;
    console.log('Session User:', user);

    if (!user || !user.user_name) {
        console.log('No user found in session or user_name is missing');
        return res.status(400).json({
            success: false,
            message: 'User is not logged in or session expired'
        });
    }

    try {
        const userName = user.user_name; // Extract username
        console.log(`==> Attempting to retrieve token for user: ${userName}`);
        
        // Retrieve token for user
        const tokenResponse = await getToken(userName);
        console.log('Token Response:', tokenResponse);

        if (tokenResponse.success) {
            const token = tokenResponse.accessToken;
            console.log('Token successfully retrieved:', token);

            // Prepare the search query for Don Omar
            const searchUrl = 'https://api.spotify.com/v1/search?q=Don%20Omar%20The%20Last%20Don&type=album';
            console.log(`==> Sending request to Spotify API: ${searchUrl}`);
            
            // Making the API request to Spotify
            const search = await axios.get(searchUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Raw search response:', JSON.stringify(search.data));

            if (!search.data.albums || search.data.albums.items.length === 0) {
                console.log('No albums found for the search query');
                return res.status(404).json({
                    success: false,
                    message: 'No albums found for the search query'
                });
            }

            console.log('Search results found:', search.data.albums.items);
            return res.status(200).json({
                success: true,
                data: search.data.albums.items
            });
        } else {
            console.log('Failed to retrieve token:', tokenResponse.message);
            return res.status(400).json({
                success: false,
                message: tokenResponse.message
            });
        }

    } catch (error) {
        console.error('Error during Spotify API search:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = searchSpoti;
