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

// Session Protection
const checkSession = require('../controllers/SessionTesting/checkSession');
const sessionTester = require('../controllers/SessionTesting/sessionTester');
const destroySession = require('../controllers/SessionTesting/destroySession');
const  redirectToSpotifyAuth  = require("../controllers/SpotifyControllers/Redirect");
const  callback  = require("../controllers/SpotifyControllers/Callback");


//User CRUD Routes
router.get('/user', getAllUsers);
router.get('/user/:name', getOneUser);
router.delete('/user/:name', deleteUser);
router.patch('/user/:name', modifyUser);


//SignUp, SignIn and Out
router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/signout', (req, res) => { res.status(200).json({ message: "logged out" }) });
router.get("/redirect", redirectToSpotifyAuth)
router.get("/callback", callback)


//Session Routes
router.get("/session", sessionTester)
router.post('/session/destroy', destroySession);
router.get('/session/destroy', destroySession)


module.exports = router;