const jwt = require('jsonwebtoken');
require("dotenv").config();

const authentication = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.send({"msg":"Please Login again"})
    }
    const token  = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.key, function(err, decoded) {
        if(err){
            res.send("Please Login")
        }
        else{
            req.body.userId = decoded.userId;
            next()
        }
      });
}


module.exports = { authentication }