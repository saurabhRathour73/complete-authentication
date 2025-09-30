const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    password: String
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;