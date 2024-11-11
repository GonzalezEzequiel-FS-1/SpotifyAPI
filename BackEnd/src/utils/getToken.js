const getToken = async (user) => {
    if (!user) {
        return {
            success: false,
            message: 'No user in session'
        }
    }
    try {
        const userData = await User.findOne({ user_name: user })
        if (!userData) {
            return {
                success: false,
                message: 'User not found'
            }
        }
        const accessToken = userData.accessToken

        if (!accessToken) {
            return {
                success: false,
                message: 'No access token provided'
            }
        }
        return {
            success: true,
            accessToken: accessToken
        }


    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}
module.exports = getToken;