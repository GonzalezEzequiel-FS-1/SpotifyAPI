const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;


const redirectToSpotifyAuth = async (req, res) => {
    const dialog = true;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const authURL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user-read-private&show_dialog=${dialog}`;
    res.redirect(authURL);
};
module.exports = redirectToSpotifyAuth;
