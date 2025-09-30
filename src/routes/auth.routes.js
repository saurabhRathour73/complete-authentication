const express = require("express");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const {registerController , loginController, profileController} = require("../controllers/auth.controller")
const router = express.Router();


// register route api

router.post("/register", registerController )

// login route  api

router.post("/login", loginController)

// user profile route api
router.get("/profile",profileController )

module.exports= router;