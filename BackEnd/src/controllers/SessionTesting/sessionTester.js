const sessionTester = async (req, res, next) => {
    const loggedInUser = req.body.user;
    const user = req.session.user.user;
    if (!loggedInUser) {
        return res.status(400).json({
            success: false,
            message: "Logged in User not provided in the body of the request"
        })
    }
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User has no active session"
        })
    }
    if (loggedInUser !== user) {
        console.log
        return res.status(400).json({
            success: false,
            message: `The logged in user (${loggedInUser}) is not the user with an active session (${user}).`
        })
    }
    try {
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
module.exports = sessionTester;