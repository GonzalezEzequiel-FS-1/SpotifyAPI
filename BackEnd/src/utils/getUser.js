const getToken = require('./getToken')
const getUser = async (req, res) =>{
    const user = req.session.user.user_name;
    try{
    if (!user) {
        console.log('==> No user found in session <==');
        return res.status(400).json({ success: false, message: "User not found" });
    }
        console.log('User found getting Token')
        const response = await getToken(user);
        const userToken = response.data;
        console.log(userToken)
        return res.status(200).json({ success: true, token: userToken }); // Added response here

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = getUser;