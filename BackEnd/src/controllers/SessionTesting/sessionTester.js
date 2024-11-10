const sessionTester = (req, res) => {
    if (req.session.user) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
};

module.exports = sessionTester;