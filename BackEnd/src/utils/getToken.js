const User = require('../models/User');

const getToken = async (user) => {
    const userName = user.user_name
    console.log(`Formatted ${JSON.stringify(user)} to ${userName}`)
    console.log('==> Entered getToken function with user:', userName);

    if (!userName) {
        //console.log('No user provided in session');
        return {
            success: false,
            message: 'No user provided in session'
        };
    }

    try {
        //console.log(`==> Searching for user in database: ${userName}`);
        const userData = await User.findOne({ user_name: userName });
        //console.log('Database Query Result:', userData);

        if (!userData) {
            //console.log('User not found in database');
            return {
                success: false,
                message: 'User not found'
            };
        }

        const accessToken = userData.accessToken;
        //console.log('User Access Token:', accessToken);

        if (!accessToken) {
            //console.log('No access token found for user');
            return {
                success: false,
                message: 'No access token found for the user'
            };
        }

        //console.log('Access token successfully retrieved');
        return {
            success: true,
            accessToken: accessToken
        };

    } catch (error) {
        //console.log('==> Entering Error checks')
        if(error.response === 401 ){
            //console.log('EXPIRED TOKEN')
        }
        //console.error('Error fetching user token:', error.message);
        return {
            success: false,
            message: 'Internal server error during token retrieval',
            error: error.message
        };
    }
};

module.exports = getToken;
