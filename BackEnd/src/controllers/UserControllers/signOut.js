const destroySession = require('../SessionTesting/destroySession');
const signOut = (req, res) => {
    try{
    destroySession(req, res, () => {
        res.status(200).json({
            success: true,
            message: 'User has logged out'
        });
    });
    localStorage.clear()
}catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })
}

};

module.exports = signOut;