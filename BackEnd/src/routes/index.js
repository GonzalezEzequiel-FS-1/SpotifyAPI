const express = require("express");
const router = express.Router()
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