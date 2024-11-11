const sessionTester = (req, res, next) => {
    const isAuthenticated = req.session.user;
    isAuthenticated 
    ?  next()
    :  res.status(401).redirect(`http://localhost:5173/signup`)
};


const logout = (req,res, next) =>{
    const user = req.session.user;
    try {
        if(!user){
            res.status(400).json({
                success:false,
                message:"No session data available"
            })
        }
        req.session.destroy((error)=>{
            if(error){
                res.status(400).json({
                    success:false,
                    message:'Unable to destroy Session'
                })
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


module.exports = {
    sessionTester,
    logout
};

