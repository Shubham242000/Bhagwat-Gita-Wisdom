import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  console.log(messages);

  // Clear all messages and context
  const clearContext = () => {
    setMessages([]);
    
    localStorage.removeItem('chatMessages');
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
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      let responseData;
      try {
        responseData = await res.json();
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }

      let aiResponse = "";
      
      if (responseData?.response?.choices) {
        aiResponse = responseData.response.choices[0].message.content;
      } else if (responseData?.response?.content) {
        aiResponse = responseData.response.content;
      } else {
        console.log('Full response:', responseData);
        aiResponse = "Sorry, I couldn't generate a response.";
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
        <h1>🕉️ Gita Wisdom</h1>
        <button onClick={clearContext} className="clear-button">
          🗑️ Clear Context
        </button>
      </div>
      
      <div className="chat-container">
        {messages.length > 0 ? (
          <div className="messages-list">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-header">
                  <span className="role-badge">{message.role === 'user' ? '👤 You' : '🤖 AI'}</span>
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
            <p>🕉️ Ask me about the wisdom of Bhagwat Gita</p>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI is thinking...</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
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
          placeholder="Ask about life, dharma, karma, or any spiritual question..."
          disabled={isLoading}
          rows={3}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? "..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default App;
