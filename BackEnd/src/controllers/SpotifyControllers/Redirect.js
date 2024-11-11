const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;

// Ensure that the environment variables are loaded
if (!CLIENT_ID) {
    console.error("Spotify client ID is not set in environment variables.");
    process.exit(1);
}

const redirectToSpotifyAuth = async (req, res) => {
    const dialog = true;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const user_name = req.query.user_name; // Get user_name from query parameters
    const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private&show_dialog=${dialog}&state=${user_name}`;
    res.json({ redirectURL: authURL });
};
module.exports = redirectToSpotifyAuth;
