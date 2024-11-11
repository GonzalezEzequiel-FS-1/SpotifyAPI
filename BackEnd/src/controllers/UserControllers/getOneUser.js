const User = require("../../models/User")
const getOneUser = async (req, res) => {
    const  user_name = req.params.name;
    console.log(user_name)
    try {
        // Attempt to find the user by user_name
        const user = await User.findOne({ user_name: user_name });

        // Handle case where the user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User ${user_name} not found`,
            });
        }

        // Return success response with the user data
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        // Handle errors during the database query
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = getOneUser;
