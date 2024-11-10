const User = require("../../models/User")
const modifyUser = async (req, res) => {
    const user = req.params.name;
    const { user_name, first_name, last_name, email, password, birthday } = req.body;

    console.log('Request Body:', req.body);

    const updatedData = {};

    if (first_name) updatedData.first_name = first_name;
    if (last_name) updatedData.last_name = last_name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;
    if (birthday) updatedData.birthday = birthday;
    if (user_name) updatedData.user_name = user_name;

    console.log(`Updating user: ${user}, with data:, ${updatedData}`);

    try {
        const userData = await User.findOne({ user_name: user });
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: `User ${user} not found.`,
            });
        }
        const user_id = userData._id;
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user_id },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: `User ${user} not found.`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Successfully edited user ${user}`,
            data: updatedUser
        });
    } catch (error) {
        console.error('Error during update:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating user: ' + error.message
        });
    }
};

module.exports = modifyUser;