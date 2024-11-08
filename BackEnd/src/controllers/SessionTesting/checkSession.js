const checkSession = (req, res) => {
    const user = req.session.user.user;
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not registered"
        });
    }
    try {
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = checkSession;