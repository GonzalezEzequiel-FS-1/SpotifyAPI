const User = require("../../models/User")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No users in database`
            })
        }
        return res.status(200).json({
            success: true,
            data: users
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = getAllUsers;
