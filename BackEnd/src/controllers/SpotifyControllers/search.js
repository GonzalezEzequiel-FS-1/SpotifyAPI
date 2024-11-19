const axios = require('axios');
const getToken = require('../../utils/getToken')
const User = require('../../models/User')

const search = async (req, res) =>{
    const query = req.body
    if(!query){
        res.status(400).json({
            success:false,
            message:`Query not provided`
        })
    }
    const user =  req.session.user
    if(!user){
        res.status(400).json({
            success:true,
            message:"User not provided"
        })
    }
    console.log(user)
    try{
        const response = await User.findOne({"user_name":"zeke"})
        const token = response.data.accessToken

    }catch(err){
        res.status(500).josn({
            success:false,
            error:error.message
        })
    }
    

   

}

module.exports = search; 