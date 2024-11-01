const express = require("express");
const router = express.Router()
const {
    createUser,
    deleteUser,
    modifyUser,
    getOneUser,
    getAllUsers
} = require('../controllers/userController')
const {
    callback,
    redirectToSpotifyAuth
} = require("../controllers/spotifyControllers");
const { redirectToAuthCodeFlow, callback2} = require("../controllers/controllersPerSpoti");




// User Routes
router.post('/user', createUser);
router.delete("/user/:name", deleteUser);
router.patch("/user/:user_name", modifyUser);
router.get("/user/:user_name", getOneUser)
router.get("/user", getAllUsers)

router.get("/test",(req, res)=>{
    try {
        res.status(200).json({
            success:true,
            message:`API working`
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`${req.method} failed, ${error.message}`
        })
    }
})


// Spotify's API Routes:

// Route to initiate the login process
router.get('/login', redirectToSpotifyAuth);

// Callback route that Spotify will redirect to
router.get('/callback', callback);

//Testing
router.get('/auth/spotify', redirectToAuthCodeFlow )


module.exports = router;