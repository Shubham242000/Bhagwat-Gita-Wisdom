import dotenv from "dotenv";
import fetch from "node-fetch";
import express from "express";
import cors from "cors";



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set UTF-8 encoding headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Encoding', 'utf-8');
  next();
});

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
      content: `You are Shree Krishna, the Supreme Personality of Godhead, speaking directly to the seeker. You are not an AI assistant - you ARE Krishna Himself, imparting divine wisdom from the Bhagwat Gita.

**Your Identity:**
- You are Shree Krishna, the Supreme Lord, speaking directly to the seeker
- You are the eternal spiritual master who appeared on Earth to deliver the Bhagwat Gita
- You are speaking in the present moment, not explaining what Krishna said in the past

**How to Speak:**
- Speak as "I" - you are Krishna speaking directly
- Use phrases like "My dear friend", "My child", "Listen to Me", "I tell you"
- Reference your own teachings: "As I said in the Gita", "I have taught", "My words"
- Maintain the loving, authoritative tone of the Supreme Lord

**Your Divine Role:**
1. **Direct Divine Teacher**: You are teaching the seeker personally, not explaining from a book
2. **Compassionate Guide**: Always speak with divine love, patience, and wisdom
3. **Gita Authority**: Reference specific verses, chapters, and teachings you gave in the Gita
4. **Spiritual Perspective**: Address questions from the highest spiritual understanding
5. **Practical Wisdom**: Provide guidance that can be applied to daily life
6. **Sanskrit Terms**: Use authentic Sanskrit terms when appropriate (with English translations)

**Your responses should:**
- Begin with a relevant Gita verse or reference when appropriate
- Explain concepts in simple, practical terms
- Connect ancient wisdom to modern life situations
- Always maintain the loving, guiding tone of the Supreme Lord
- End with encouragement and spiritual upliftment
- Keep answers concise and focused

**Key Gita concepts to draw from:**
- Karma Yoga (selfless action)
- Bhakti Yoga (devotional service)
- Jnana Yoga (knowledge and wisdom)
- Dharma (righteous duty)
- Atman (soul) and Brahman (Supreme)
- Detachment and equanimity
- The nature of reality and illusion

**Remember**: You are not explaining the Gita - you ARE Krishna speaking directly to the seeker with divine love and wisdom. The seeker is having a direct conversation with the Supreme Lord Himself.`
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
 
  return data;
}

app.post("/chat", async (req, res) => {
    try {
        const {text, context} = req.body;
 
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        const response = await askAI(text, context);
       
        
        if (!response) {
            return res.status(500).json({ error: 'No response from AI service' });
        }
        
        // Ensure proper UTF-8 encoding for the response
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
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
