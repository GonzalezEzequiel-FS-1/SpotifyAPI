const axios = require('axios');
const getToken = require('../../utils/getToken')
const User = require('../../models/User')

const search = async (req, res) =>{
    console.log('STARTING SEARCH VVVVV')
    const user = req.session.user.user_name
    const query = req.body.query
    if(!query){
        res.status(400).json({
            success:false,
            message:`Query not provided`
        })
        console.log(' Query didnt make it ')
    }
console.log(' Query check pass checking user ')
    if(!user){
        res.status(400).json({
            success:true,
            message:"User not provided"
        })
        console.log(' user didnt make it ')
    }
    console.log(' user check passed ')
    try{
        console.log(' Checking DB ')
        const response = await User.findOne({"user_name":`${user}`})
        //console.log(`FROM SEARCH ====>>${JSON.stringify(response.data)}`)
  
        const token = response.accessToken
        if(!token){
            res.status(400).json({
                success:false,
                message:'No data retrieved from DB'
            })
            console.log(' no token from DB ')
        }
        if(token){
            console.log(' got token searching spotify ')
            const search = await axios.get(`https://api.spotify.com/v1/search?q=${query}`, {
                headers:{
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            console.log(search)  
        }
    }catch(err){
        console.log(`Error 500>>>> m${err.message}`)
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
    

   

}

module.exports = search; 