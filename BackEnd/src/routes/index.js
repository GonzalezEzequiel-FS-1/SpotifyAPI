const express = require("express");
const router = express.Router()
const {
    createUser,
    deleteUser,
    modifyUser,
    getOneUser,
    getAllUsers,
    signIn,
    deleteAll
} = require('../controllers/userController')

const { sessionChecker } = require("../middlewares/checkSession");


router.get("/session-data", (req, res) => {
    console.log(req.session)
    res.json(req.session)
})



// User Routes
router.post('/user', createUser);
router.delete("/user/:user_name", deleteUser);
router.patch("/user/:user_name", modifyUser);
router.get("/user/:user_name", getOneUser);
router.get("/user", getAllUsers);
router.get("/check", sessionChecker);



// Spotify's API Routes:

// Route to initiate the login process
// router.get('/auth', auth);

// Callback route that Spotify will redirect to
//router.get('/callback', callback);

//Testing
//router.get('/auth/spotify', redirectToAuthCodeFlow )
router.get("/home", (req, res) => {
    res.send("Session Created")
})
router.delete("/delete", deleteAll)
//router.get('/logout', logout)
router.post("/signin", signIn)

module.exports = router;