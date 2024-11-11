const sessionTesting = (req, res) => {
    const isAuthenticated = req.session.user;
    console.log(isAuthenticated)
    isAuthenticated 
    ?  res.status(200).json({ isAuthenticated: true, data:req.session})
    :  res.status(400).json({ isAuthenticated: false, data:req.session })
};
module.exports = sessionTesting;