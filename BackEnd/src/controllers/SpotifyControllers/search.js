const axios = require('axios');
const getToken = require('../../utils/getToken');
const User = require('../../models/User');

const search = async (req, res) => {
    console.log('STARTING SEARCH');

    const user = req.session.user?.user_name;
    const query = req.body.query;
    const type = req.body.type

    // Validate query
    if (!query) {
        console.log("Query not provided");
        return res.status(400).json({
            success: false,
            message: "Query not provided",
        });
    }

    // Validate user
    if (!user) {
        console.log("User not provided");
        return res.status(400).json({
            success: false,
            message: "User not provided",
        });
    }
    const formattedQuery = query.replace(/\s+/g, '+');
    console.log(formattedQuery)
    console.log('Query and user validated');

    try {
        console.log('Fetching token...');
        const accessToken = await getToken(user);
        console.log(`Access token retrieved: ${JSON.stringify(accessToken)}`);

        const token = accessToken?.accessToken;
        if (!token) {
            console.log("No token retrieved from DB");
            return res.status(400).json({
                success: false,
                message: "No token retrieved from DB",
            });
        }

        console.log("Searching Spotify...");
        console.log(`Formatted Query = ${formattedQuery}, Search Type = ${type}`)
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(formattedQuery)}&type=${type}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        //console.log("Spotify response received", JSON.stringify(response.data));
        console.log('Response obtained from spotify')
        return res.status(200).json({
            success: true,
            data: response.data,
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

module.exports = search;
