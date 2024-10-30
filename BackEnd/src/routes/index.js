const express = require("express");
const router = express.Router()
const {
    createUser
} = require('../controllers/userController')


// User Routes
router.post('/user', createUser)
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

module.exports = router;