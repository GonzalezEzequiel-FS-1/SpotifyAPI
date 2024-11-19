const axios = require('axios');
const getToken = require('../../utils/getToken')

const getTrack = async (req, res) => {
    const userToken = getToken()
    const trackId = req.body.trackId;
    if (!trackId) {
        res.status(400).json({
            success: false,
            message: 'Track ID not found'
        })
    }
    if (!userToken) {
        res.status(400).json({
            success: false,
            message: 'User Token not found'
        })
    }
    try {
        const requestTrack = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            "Authorization": `Bearer ${userToken}`
        })
        console.log(requestTrack.data)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}