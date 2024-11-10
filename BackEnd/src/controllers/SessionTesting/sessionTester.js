const sessionTesting = (req, res) => {
    const isAuthenticated = req.session.user;
    isAuthenticated 
    ?  res.status(200).json({ isAuthenticated: true, data:req.session })
    :  res.status(200).json({ isAuthenticated: false, data:req.session })
};
module.exports = sessionTesting;