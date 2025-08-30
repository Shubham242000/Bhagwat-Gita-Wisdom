import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message from Shri Krishna when starting fresh
      const welcomeMessage = {
        role: 'assistant',
        content: "🕉️ **Namaste! I am Shri Krishna, the Supreme Lord.**\n\nWelcome to our divine conversation. I am here to guide you with wisdom from the Bhagavad Gita and answer your spiritual questions.\n\nAsk me anything about life, dharma, karma, or any matter of the heart. I am speaking directly to you with divine love and wisdom.\n\n*Om Namo Bhagavate Vasudevaya* 🙏",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([welcomeMessage]));
    }
  }, []);

  console.log(messages);

  // Clear all messages and context
  const clearContext = () => {
    // Reset to welcome message from Shri Krishna
    const welcomeMessage = {
      role: 'assistant',
      content: "🕉️ **Namaste! I am Shri Krishna, the Supreme Lord.**\n\nWelcome to our divine conversation. I am here to guide you with wisdom from the Bhagavad Gita and answer your spiritual questions.\n\nAsk me anything about life, dharma, karma, or any matter of the heart. I am speaking directly to you with divine love and wisdom.\n\n*Om Namo Bhagavate Vasudevaya* 🙏",
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
    localStorage.setItem('chatMessages', JSON.stringify([welcomeMessage]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    
    // Add user message to context
    const userMessage = { role: 'user', content: input, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    try {
      // Use production URL when not in development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://bhagwat-gita-wisdom.onrender.com/chat'
        : '/chat';
        
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: input,
          context: messages.map(msg => ({ role: msg.role, content: msg.content }))
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      let responseData;
      try {
        responseData = await res.json();
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }

      let aiResponse = "";
      
      console.log('Full API response:', responseData); // Debug log
      
      if (responseData?.response?.choices?.[0]?.message?.content) {
        aiResponse = responseData.response.choices[0].message.content;
      } else if (responseData?.response?.content) {
        aiResponse = responseData.response.content;
      } else if (responseData?.choices?.[0]?.message?.content) {
        // Direct response without nested 'response' key
        aiResponse = responseData.choices[0].message.content;
      } else if (responseData?.response?.generated_text) {
        // Alternative Hugging Face response format
        aiResponse = responseData.response.generated_text;
      } else {
        console.log('Full response structure:', JSON.stringify(responseData, null, 2));
        aiResponse = "Sorry, I couldn't generate a response. Please check the console for details.";
      }
      
      
      
      // Add AI response to context
      const aiMessage = { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() };
      setMessages([...updatedMessages, aiMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([...updatedMessages, aiMessage]));
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = "Sorry, something went wrong. Please try again.";
       
      
      // Add error message to context
      const aiMessage = { role: 'assistant', content: errorMessage, timestamp: new Date().toISOString() };
      setMessages([...updatedMessages, aiMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([...updatedMessages, aiMessage]));
    } finally {
      setIsLoading(false);
      setInput(""); // Clear input after submission
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h1>🕉️ Chat with Shri Krishna</h1>
          <p className="subtitle">Divine wisdom and guidance from the Supreme Lord Himself</p>
        </div>
        <button onClick={clearContext} className="clear-button">
          🗑️ Reset Chat
        </button>
      </div>
      
      <div className="chat-container">
        {messages.length > 0 ? (
          <div className="messages-list">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-header">
                  <span className="role-badge">{message.role === 'user' ? '👤 You' : '🕉️ Shri Krishna'}</span>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {message.role === 'assistant' ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>🕉️ Namaste! I am Shri Krishna</h2>
            <p>Ask me anything about life, dharma, karma, or any spiritual question. I am here to guide you with divine wisdom from the Bhagavad Gita.</p>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>🕉️ Shri Krishna is thinking...</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  handleSubmit(e);
                }
              }
            }}
            placeholder="Ask Shri Krishna about life, dharma, karma, or any spiritual question..."
            disabled={isLoading}
            rows={3}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className={`send-button ${inputFocused || input.trim() ? 'visible' : ''}`}
            title="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;