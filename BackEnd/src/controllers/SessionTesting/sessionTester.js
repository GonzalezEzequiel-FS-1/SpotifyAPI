const sessionTesting = (req, res) => {
    const session = req.session;
    
    try {
        const userName = session.user ? session.user.user_name : null;

        if (!userName) {
            return res.status(404).json({
                message: "User not found in session"
            });
        }

        res.status(200).json(userName);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

module.exports = sessionTesting;
