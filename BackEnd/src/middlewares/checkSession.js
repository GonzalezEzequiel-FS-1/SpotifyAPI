const sessionChecker = (req, res, next) =>{
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Please log in to access this resource."
        });
    }
        next()
 
}
module.exports = {sessionChecker}