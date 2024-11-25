const getToken = require("../../utils/getToken");
const axios = require('axios')


const loadPlaylists = async (req, res) => {
    //console.log('Starting Load Playlists')
    const user = req.session.user;
    const catId = req.body.catId
    if (!user) {
        //console.log(' User Didnt Make it ')
        return res.status(400).json({
            success: false,
            message: 'No user provided'
        });
    }
    //console.log(' User Made it, checking Cat Id  ')
    if (!catId) {
        //console.log(' Cat ID Didn't Make it ')
        return res.status(400).json({
            success: false,
            message: 'No category ID provided'
        });
    }
    //console.log(' Both the User and the Category ID made it. Starting getToken() ')
    const tokenData = await getToken(user);
    const token = tokenData?.accessToken;

    if (!token) {
        //console.log('Token Not Retrieved')
        return res.status(400).json({
            success: false,
            message: 'No access token found for the user'
        });
    }
    //console.log(' Token Obtained ')
    try {
        //console.log('Attempting to obtain playlist from Spotify')
        //console.log(token)
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${catId}/playlists`,{
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
            const playlistData= response.data.playlists;
            //console.log(playlistData)
        res.status(200).json({
            success: true,
            data: playlistData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = loadPlaylists;