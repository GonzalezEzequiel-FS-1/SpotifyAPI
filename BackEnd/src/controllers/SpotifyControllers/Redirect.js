const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Ensure that the environment variables are loaded
if (!CLIENT_ID || !REDIRECT_URI) {
    console.error("Spotify client ID or redirect URI is not set in environment variables.");
    process.exit(1);
}

const redirectToSpotifyAuth = async (req, res) => {
    const dialog = true;
    const user_name = req.query.user_name; // Get user_name from query parameters

    // Define multiple scopes here
    const scopes = [
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "user-library-read",
        "playlist-modify-public",
        "user-read-recently-played",
        "user-library-modify",
        "user-library-read"
    ].join(" "); // Join scopes with spaces

    const encodedScopes = encodeURIComponent(scopes);
    const redirect_uri = encodeURIComponent(REDIRECT_URI);

    const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${encodedScopes}&show_dialog=${dialog}&state=${user_name}`;

    res.json({ redirectURL: authURL });
};

module.exports = redirectToSpotifyAuth;
