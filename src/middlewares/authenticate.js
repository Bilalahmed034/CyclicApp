const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const db = require("../models");
const User = db.user;
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 

  if (token == null || token == undefined || token == 'undefined') return res.status(401).send({
    status: false,
    message: 'Unauthorized'
});

  jwt.verify(token, JWT_SECRET_KEY , async (error , id ) => {
    console.log(error)

    if (error) return res.status(200).send({
      status:false,
      message:"Token is either invalid or missing!"
    })
    var authUser = await User.findOne({
      where:{
        id:id.id
      }
    })
    if(authUser){
      console.log(id.id +'=======id')
      // return ("id of current user "+ id.id)
      // req.body.id = id.id;
      // req.id = id.id;
      req.authUser = authUser;
      next()
    }else{
      return res.status(401).send({
        status:false,
        message:"OOPS! something went wrong login again to continue."
      })
    }
  })
}

module.exports = authenticateToken;