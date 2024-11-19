const axios = require('axios');
const getToken = require('../../utils/getToken')

const loadCategories = async (req, res) => {
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

    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response || !response.data) {
            //console.log('==> Invalid response from Spotify API <==');
            return res.status(400).json({
                success: false,
                message: "No valid data from Spotify API"
            });
        }

        //console.log('==> Successfully contacted Spotify API <==');
        const categories = response.data.categories.items;

        if (!categories || categories.length === 0) {
            //console.log('==> Empty Categories Array <==');
            return res.status(400).json({
                success: false,
                message: "No categories fetched"
            });
        }

        //console.log('==> Categories Found, returning data <==');
        return res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {
        //console.log(`==> Error occurred: ${error.message}`, error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = loadCategories;
