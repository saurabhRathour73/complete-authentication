const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt  = require("bcrypt")

 async function registerController (req ,res){
    const {username, email, password} = req.body;

    const existingUser = await userModel.findOne({
        username
    })
    if(existingUser) return res.status(409).json({
        message: "username already exists"
    })

    const user = await userModel.create({
        username,
        email,
        password:await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SCRET)
    res.cookie("token", token)


    res.status(201).json({
        message: " user registered successfully",
        user
    })

}

async function loginController(req, res){
    const { username , password} = req.body;

    const user = await userModel.findOne({
        username
    })
    if(!user) return res.status(401).json({
        message: "invalid username " 
       })

       const isPasswordValid= await bcrypt.compare(password, user.password);
       
       if(!isPasswordValid) return res.status(401).json({
        message: "invalid password"
       })

       const token = jwt.sign({id: user._id}, process.env.JWT_SCRET);
       res.cookie("token", token);

       res.status(200).json({
        message: "user logged in successfully",
        user
       })
}

async function profileController (req, res){
    const {token} = req.cookies;
    if(!token) return res.status(401).json({
        message: "unauthrized user"
    })
     try{
        const decode =jwt.verify(token, process.env.JWT_SCRET)
        console.log(decode);
        const user= await userModel.findOne({
            _id: decode.id
        })

        res.status(200).json({
            message: "user profile fetched successfully",
            user
        })
        

     }
     catch(err){
        return res.status(401).json({
            message: " unauthrized user"
        })
     }
}

module.exports = {registerController , loginController, profileController}