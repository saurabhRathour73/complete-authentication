const mongoose = require("mongoose");



function connectToDB(){
    mongoose.connect(process.env.MONGOODB_URL)
    .then(()=>{
        console.log(" connected to DB");
        
    })
    .catch((err)=>{
        console.log(" error while connecting to DB", err);
        
    })
}





module.exports= connectToDB;