const jwt = require ("jsonwebtoken")
const userModel = require ("../models/user.model")
async function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        message: "unauthorized user, please login first"
    })
    try{
        const decoded = jwt.verify(token, process.env.JWT_SCRET)
        const user = await userModel.findOne({
            _id: decoded.id
        })
      
        req.user=user
        next();
        
    }catch(err){
        return res.status(401).json({
            message: " invalid token, please login again"
        })
    }
}

module.exports= authMiddleware