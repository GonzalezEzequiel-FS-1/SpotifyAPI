const User = require("../../models/User")
const signIn = async (req, res) => {
    const user_name  = req.body.user_name;
    const password = req.body.password;

    try {
        const loggingUser = await User.findOne({ user_name });
        if (!loggingUser) {
            return res.status(404).json({
                success: false,
                message: `User ${user_name} not found.`
            });
        }
        const isMatch = await loggingUser.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: `Password did not match`
            });
        }

        req.session.user = { user_name: loggingUser.user_name };
        req.session.save((error) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });

        return res.status(200).json({
            success: true,
            message: `User ${user_name} authenticated successfully`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = signIn;
