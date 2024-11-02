const sessionChecker = (req, res, next) => {
    if (req.session.user && req.session.user.user_name) {
        const UserName = JSON.stringify(req.session.user);
        console.log(`FROM CHECK USER: ${UserName}`);
        next(); 
    } else {
        const UserName = JSON.stringify(req.session);
        console.log(`FROM CHECK USER: ${UserName}`);

        res.status(401).json({
            success: false,
            message: "No session created",
            data: req.session 
        });
    }
};

module.exports = {
    sessionChecker
};
