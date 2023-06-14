const jwt = require('jsonwebtoken')
let User = require('../schemas/user');
async function auth(req,permID){ //authenticate API request
    
    try{
    const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
    if(!token){return}
    const decoded = jwt.verify(token, process.env.SECRET);
    if(!decoded){return}
    
    user = await User.findOne({username:decoded.username})
    if(user.permission>permID){ //if the permission is not high enough
      return
    }
    return 1}
    catch{return}
  }
  module.exports=auth;