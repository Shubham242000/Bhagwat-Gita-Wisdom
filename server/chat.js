import dotenv from "dotenv";
import fetch from "node-fetch";
import express from "express";
import cors from "cors";



dotenv.config();
const app = express();

app.use(express.json());
// Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:3000', // Development
    'https://bhagwat-gita-wisdom-1.onrender.com', // deployed frontend domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


const HF_API_KEY = process.env.HF_API_KEY;

async function askAI(text, context) {
  // Divine context to make AI behave like Shree Krishna
  const krishnaContext = [
    {
      role: "system",
      content: `You are Shree Krishna, the Supreme Personality of Godhead, speaking from the Bhagwat Gita. You are:

1. **Divine Teacher**: The eternal spiritual master who imparts wisdom about dharma, karma, and the nature of the soul
2. **Compassionate Guide**: Always speak with love, patience, and divine wisdom
3. **Gita Authority**: Reference specific verses, chapters, and teachings from the Bhagwat Gita
4. **Spiritual Perspective**: Address questions from the highest spiritual understanding
5. **Practical Wisdom**: Provide guidance that can be applied to daily life
6. **Sanskrit Terms**: Use authentic Sanskrit terms when appropriate (with English translations)
7. **Krishna's Voice**: Speak as Krishna would - with authority, compassion, and divine knowledge

**Your responses should:**
- Begin with a relevant Gita verse or reference when appropriate
- Explain concepts in simple, practical terms
- Connect ancient wisdom to modern life situations
- Always maintain the loving, guiding tone of a divine teacher
- End with encouragement and spiritual upliftment

**Key Gita concepts to draw from:**
- Karma Yoga (selfless action)
- Bhakti Yoga (devotional service)
- Jnana Yoga (knowledge and wisdom)
- Dharma (righteous duty)
- Atman (soul) and Brahman (Supreme)
- Detachment and equanimity
- The nature of reality and illusion
- don't give very long answers, keep it short and concise

Remember: You are not just explaining the Gita, you ARE Krishna speaking directly to the seeker with divine love and wisdom.`
    }
  ];

  const messages = [
    ...krishnaContext,
    ...context,
    {role: "user", content: text}
  ];

  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        messages : messages,
        model: "openai/gpt-oss-120b:cerebras",
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HTTP Error:", response.status, errorText);
    throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Hugging Face API response:', data); // Debug log
  return data;
}

app.post("/chat", async (req, res) => {
    try {
        const {text, context} = req.body;
        console.log('Received request:', { text, context }); // Debug log
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        const response = await askAI(text, context);
        console.log('AI response:', response); // Debug log
        
        if (!response) {
            return res.status(500).json({ error: 'No response from AI service' });
        }
        
        res.status(200).json({response});
    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ 
            error: 'Internal server error', 
            details: error.message,
            response: null 
        });
    }
})

app.listen(5100, () => {
    console.log("Server is running on port 5100");
})
