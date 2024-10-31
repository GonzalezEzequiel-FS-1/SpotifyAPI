const SpotiLoad = () => {
   

    const handleSpotifyConnect = () => {
        // Redirect to your server's login endpoint for Spotify authentication
        window.location.href = 'http://localhost:3069/api/login'; // Ensure this is correct
    };

    return (
        <div>
            <h1>Welcome to Your App!</h1>
            <p>You can connect your Spotify account to access more features.</p>
            <button onClick={handleSpotifyConnect}>Connect to Spotify</button>
            
        </div>
    );
};

export default SpotiLoad;
