const axios = require('axios');
const getToken = require('../../utils/getToken')

const singleCategory = async (req, res) => {
    console.log('Starting SingleCat');

    const { catLink } = req.body;
    //console.log('==> Getting User <==');
    const user = req.session.user;
    if (!user) {
        //console.log('==> No user found in session <==');
        return res.status(400).json({ success: false, message: "User not found" });
    }

    //console.log('==> User Found, Getting Token <==');
    const tokenResult = await getToken(user);

    if (!tokenResult.success) {
        //console.log('==> Token Retrieval Failed, exiting with status 400');
        return res.status(400).json(tokenResult);
    }

    const accessToken = tokenResult.accessToken;
    //console.log('==> Token obtained, hitting Spotify API <==');

console.log(accessToken)

    if (!accessToken) {
        console.log('Token not received');
        return res.status(400).json({
            success: false,
            message: 'Token not received'
        });
    }

    if (!catLink) {
        console.log('No catLink URL received');
        return res.status(400).json({
            success: false,
            message: 'No URL received'
        });
    }

    try {
        console.log('Link received, processing request');


        const response = await axios.get(`${catLink}/playlists`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const playlists = response.data.playlists.items
        playlists.forEach(playlist => {
            const name = playlist.name;
            const url= playlist.external_urls.spotify;
            const description = playlist.description;
            const totalTracks = playlist.tracks.total
            const coverArtURL = playlist.images[0]?.url || 'No Image Available';
        

        console.log(`Name: ${name}`);
        console.log(`URL: ${url}`);
        console.log(`Description: ${description}`);
        console.log(`Total Tracks: ${totalTracks}`);
        console.log(`Cover art: ${coverArtURL}`)
        console.log('---');
    });
        res.status(200).json({
            success: true,
            data: playlists
        });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message,
            ...(err.response && { response: err.response.data })
        });
    }
};

module.exports = singleCategory;
