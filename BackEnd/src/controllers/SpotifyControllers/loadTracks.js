const getToken = require("../../utils/getToken");
const axios = require('axios')


const loadTracks = async (req, res) => {
    console.log('Starting Load Tracks')
    const user = req.session.user;
    const playlistId = req.body.playlistId
    if (!user) {
        console.log(' User Didnt Make it ')
        return res.status(400).json({
            success: false,
            message: 'No user provided'
        });
    }
    console.log(' User Made it, checking Track Id  ')
    if (!playlistId) {
        console.log(' Track ID Didnt Make it ')
        return res.status(400).json({
            success: false,
            message: 'No track ID provided'
        });
    }
    console.log(' Both the User and the Track ID made it. Starting getToken() ')
    const tokenData = await getToken(user);
    const token = tokenData?.accessToken;

    if (!token) {
        console.log('Token Not Retrieved')
        return res.status(400).json({
            success: false,
            message: 'No access token found for the user'
        });
    }
    console.log(' Token Obtained ')
    try {
        console.log('Attempting to obtain Tracks from Spotify')
        console.log(token)
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(!response.data){
                res.status(400).json({
                    success:false,
                    message: "Unable to get Data from Spotify"
                })
            }
            const tracksData= response.data;
            //console.log(tracksData)
        res.status(200).json({
            success: true,
            data: tracksData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = loadTracks;