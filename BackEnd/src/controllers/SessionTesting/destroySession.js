const destroySession = async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
            // Clear the cookie on the client side
            res.clearCookie('Spotnetcookie');
            
            return res.status(303).redirect("http://localhost:5173/home");
        });
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = destroySession;
