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
    console.log(`STATE FROM CALLBACK====> ${user_name}`)

    // Define multiple scopes here
    const scopes = [
        "user-read-private"
        
    ].join(" "); // Join scopes with spaces

    const encodedScopes = encodeURIComponent(scopes);
    const redirect_uri = encodeURIComponent(REDIRECT_URI);

    const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private&show_dialog=${dialog}&state=${user_name}`;

    res.json({ redirectURL: authURL });
};

// const redirectToSpotifyAuth = async (req, res) => {
//     const dialog = true;
//     const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
//     const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private&show_dialog=${dialog}`;
//     res.redirect(authURL);
// };
module.exports = redirectToSpotifyAuth;
