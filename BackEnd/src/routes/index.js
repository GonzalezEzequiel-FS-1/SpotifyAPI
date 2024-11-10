// Create an instance of Express
const express = require("express");

//Create an instance eof router
const router = express.Router()

//Import User CRUD Modules
const signUp = require('../controllers/UserControllers/signUp');
const signIn = require('../controllers/UserControllers/signIn');
const modifyUser = require('../controllers/UserControllers/modifyUser');
const getOneUser = require('../controllers/UserControllers/getOneUser');
const getAllUsers = require('../controllers/UserControllers/getAllUsers');
const deleteUser = require('../controllers/UserControllers/deleteUser');

//Refreshing Tokens manually
const tokenRefresher = require('../controllers/SpotifyControllers/tokenRefresher')

// Session Protection

const {sessionTester} = require('../middlewares/middlewares');
const sessionTesting = require('../controllers/SessionTesting/sessionTester')
const setSession = require('../controllers/SessionTesting/setSession')
const destroySession = require('../controllers/SessionTesting/destroySession');
const  redirectToSpotifyAuth  = require("../controllers/SpotifyControllers/Redirect");
const  callback  = require("../controllers/SpotifyControllers/Callback");


//User CRUD Routes
router.get('/user', sessionTester, getAllUsers);
router.get('/user/:name', sessionTester, getOneUser);
router.delete('/user/:name', sessionTester , deleteUser);
router.patch('/user/:name', sessionTester, modifyUser);


//SignUp, SignIn and Out
router.post('/signin', signIn);
router.post('/signup', setSession, signUp);
router.get('/signout', (req, res) => { res.status(200).json({ message: "logged out" }) });
router.get("/redirect", (req, res) => {
    const user_name = req.query.user_name;
    if (!user_name) {
        return res.status(400).json({ success: false, message: 'user_name query parameter is required' });
    }
    redirectToSpotifyAuth(req, res);
});
router.get("/callback", callback);


//Session Routes
router.get("/session", sessionTesting)
router.post('/session/destroy', destroySession);
router.get('/session/destroy', destroySession)

router.post('/token/refresh', tokenRefresher)
module.exports = router;