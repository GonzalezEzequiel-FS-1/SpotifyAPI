const fetch = require('node-fetch');

const clientId = process.env.CLIENT_ID;
const redirectURI = process.env.REDIRECT_URI

const redirectToAuthCodeFlow = (req, res) => {
    const redirectUri = encodeURIComponent(redirectURI);
    const scope = encodeURIComponent("user-read-private user-read-email");
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
    res.redirect(authUrl); // Redirect the user to the authorization URL
};

const callback2 = async (req, res) => {
    const code = req.query.code; 
    try {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile); // Handle UI population if necessary
        res.redirect('/'); // Redirect to home or another page
    } catch (error) {
        console.error("Error in callback:", error);
        res.status(500).send("Authentication failed");
    }
};

const getAccessToken = async (clientId, code) => {
    const redirectUri = encodeURIComponent(redirectURI);
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}`
    });

    if (!response.ok) {
        throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    return data.access_token; 
};

const fetchProfile = async (token) => {
    const profileUrl = "https://api.spotify.com/v1/me"; 
    const response = await fetch(profileUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    const profile = await response.json();
    return profile; 
};

// Assuming populateUI is needed in a different context, you can keep it here or remove it if not needed
const populateUI = (profile) => {
    // If you're using a templating engine, you might render a view here
    console.log("Profile Data:", profile); // Or handle UI updates as needed
};

module.exports = {
    redirectToAuthCodeFlow,
    callback2
};
