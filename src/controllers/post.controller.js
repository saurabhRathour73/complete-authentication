const postModel= require("../models/post.model");
const generateCaption= require("../service/ai.service")



async function createPostController( req, res){
    const file = req.file;
    console.log(" file received", file);

    const base64Image= Buffer.from(file.buffer).toString("base64");
    const caption = await generateCaption(base64Image);
    res.json({
        caption:caption
    })
    console.log("Generated Caption:", caption);
    
    
    


}



module.exports = {createPostController}