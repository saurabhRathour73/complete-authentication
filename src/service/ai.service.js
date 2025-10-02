require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// API key environment se
console.log("🔑 API Key Loaded:", process.env.GEMINI_API_KEY ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate caption from image
async function generateCaption(base64ImageFile) {
  try {
    // yaha system instruction add kar rahe hain
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [
          { text: "You are an AI assistant that generates short, creative, human-like image captions in casual tone. generat caption in hindi" }
        ]
      }
    });

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile, // base64 string here
        },
      },
      { text: "Caption this image." },
    ];

    const result = await model.generateContent(contents);

    const caption = result.response.text();
    console.log("🖼️ Caption:", caption);

    return caption;
  } catch (err) {
    console.error("❌ Error generating caption:", err.message);
    return null;
  }
}

module.exports = generateCaption;
