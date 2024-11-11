const setSession = (req, res, next) => {
    const { user_name } = req.body;
    if (!user_name) {
        return res.status(400).json({
            success: false,
            error: "No user provided."
        });
    }
    try {
        req.session.user = { user_name: user_name };
        req.session.save((error) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
            console.log(req.session)
            next(); // Only call next() after session is saved
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = setSession;