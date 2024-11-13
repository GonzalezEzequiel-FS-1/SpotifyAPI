const User = require('../models/User');

const getToken = async (user) => {
    console.log('==> Entered getToken function with user:', user);

    if (!user) {
        console.log('No user provided in session');
        return {
            success: false,
            message: 'No user provided in session'
        };
    }

    try {
        console.log(`==> Searching for user in database: ${user}`);
        const userData = await User.findOne({ user_name: user });
        console.log('Database Query Result:', userData);

        if (!userData) {
            console.log('User not found in database');
            return {
                success: false,
                message: 'User not found'
            };
        }

        const accessToken = userData.accessToken;
        console.log('User Access Token:', accessToken);

        if (!accessToken) {
            console.log('No access token found for user');
            return {
                success: false,
                message: 'No access token found for the user'
            };
        }

        console.log('Access token successfully retrieved');
        return {
            success: true,
            accessToken: accessToken
        };

    } catch (error) {
        console.error('Error fetching user token:', error.message);
        return {
            success: false,
            message: 'Internal server error during token retrieval',
            error: error.message
        };
    }
};

module.exports = getToken;
