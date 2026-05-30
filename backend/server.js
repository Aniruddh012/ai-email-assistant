import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://ai-email-assistant-navy.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


app.post("/generate-reply", async (req, res) => {
  try {
    const { email } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an AI email assistant."
        },
        {
          role: "user",
          content: `Reply professionally to this email: ${email}`
        }
      ]
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});