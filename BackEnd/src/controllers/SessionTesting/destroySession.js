const User = require('../../models/User')
const destroySession = async (req, res) => {
    const user = req.session.user;
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
            
            // Send the success response after session is fully destroyed
            return res.status(200).json({
                success: true,
                message: `User ${user} has logged out`
            });
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
