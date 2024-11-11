const User = require("../../models/User")

const deleteUser = async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(422).json({
            success: false,
            message: `No user name provided`
        })
    }
    try {
        const response = await User.deleteOne({ user_name: name })
        if (response.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: `User ${name} Deleted`,
                data: response
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `User ${name} not found.`
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}


module.exports = deleteUser;