# 🕉️ Bhagwat Gita AI - Divine Wisdom Chat

> *"Yada yada hi dharmasya glanir bhavati bharata, Abhyutthanam adharmasya tadatmanam srjamy aham"*
> 
> *"Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself."* - Bhagwat Gita 4.7

## 🌟 Overview

Bhagwat Gita AI is a spiritual AI chat application that provides divine wisdom and guidance based on the sacred teachings of the Bhagwat Gita. The AI responds as if Shree Krishna himself is speaking, offering spiritual guidance, philosophical insights, and practical wisdom for daily life.

## ✨ Features

### 🕉️ **Divine AI Personality**
- **Krishna's Voice**: AI responds as Shree Krishna from the Bhagwat Gita
- **Sacred Wisdom**: Authentic teachings and references from the Gita
- **Spiritual Guidance**: Personal guidance for life's challenges
- **Sanskrit Integration**: Uses authentic Sanskrit terms with translations

### 💬 **Chat Experience**
- **Real-time Chat**: Interactive spiritual conversations
- **Message History**: Persistent chat history with localStorage
- **Context Awareness**: AI remembers conversation context
- **Markdown Support**: Beautiful formatting for spiritual content

### 🎨 **Royal Design**
- **Minimal Aesthetic**: Clean, sophisticated interface
- **Golden Theme**: Royal color scheme with divine elements
- **Responsive Layout**: Works on all devices
- **Professional UI**: Modern, elegant design

### 🔧 **Technical Features**
- **Streaming Responses**: Real-time AI responses
- **Error Handling**: Graceful error management
- **Loading States**: Visual feedback during processing
- **Cross-platform**: Works on web browsers

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Hugging Face API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham242000/Bhagwat-Gita-Wisdom.git
   cd Bhagwat-Gita-Wisdom
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   ```bash
   # In server directory, create .env file
   HF_API_KEY=your_huggingface_api_key_here
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   node chat.js
   ```
   Server will run on `http://localhost:5000`

2. **Start the client**
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Starting a Conversation
1. Type your spiritual question in the textarea
2. Press **Enter** to send, or **Shift+Enter** for new lines
3. Receive divine wisdom from Shree Krishna
4. Continue the conversation naturally

### Example Questions
- "What is karma yoga?"
- "How should I deal with failure?"
- "What is the meaning of dharma?"
- "How can I find inner peace?"
- "What does the Gita say about relationships?"

### Features
- **Clear Context**: Reset conversation history
- **Persistent Chat**: Messages saved automatically
- **Real-time Responses**: Instant spiritual guidance
- **Beautiful Formatting**: Markdown support for rich content

## 🏗️ Architecture

### Frontend (React)
- **Modern React**: Built with React 19 and hooks
- **State Management**: Local state with localStorage persistence
- **Styling**: Custom CSS with royal golden theme
- **Components**: Modular, reusable components

### Backend (Node.js)
- **Express Server**: RESTful API endpoints
- **AI Integration**: Hugging Face API for responses
- **Context Management**: Maintains conversation history
- **Error Handling**: Robust error management

### AI System
- **Personality**: Shree Krishna from Bhagwat Gita
- **Knowledge Base**: Comprehensive Gita teachings
- **Response Style**: Divine, compassionate, authoritative
- **Context Awareness**: Remembers conversation flow

## 🔧 Configuration

### Environment Variables
```env
# Server (.env file)
HF_API_KEY=your_huggingface_api_key
```

### API Endpoints
- `POST /chat` - Send message and receive AI response
- `GET /` - Health check endpoint

## 🌟 Key Features Explained

### Divine AI Context
The AI is programmed with a comprehensive system prompt that makes it behave as Shree Krishna, including:
- **Divine Identity**: Supreme Personality of Godhead
- **Teaching Style**: Compassionate spiritual master
- **Knowledge Source**: Bhagwat Gita authority
- **Response Format**: Verse references and practical wisdom

### Spiritual Guidance Areas
- **Karma Yoga**: Selfless action and duty
- **Bhakti Yoga**: Devotional service
- **Jnana Yoga**: Spiritual knowledge
- **Dharma**: Righteous living
- **Life Situations**: Practical spiritual advice

## 🤝 Contributing

We welcome contributions to make this spiritual tool even better!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📱 Screenshots

*[Add screenshots of your application here]*

## 🎨 Design Philosophy

The application follows a **minimal royal aesthetic** that reflects the divine nature of the content:
- **Golden Accents**: Represent divine wisdom and prosperity
- **Dark Theme**: Creates a sacred, focused atmosphere
- **Clean Typography**: Ensures readability of spiritual content
- **Responsive Design**: Accessible on all devices

## 🔮 Future Enhancements

- [ ] Voice interaction
- [ ] Multiple language support
- [ ] Meditation timer integration
- [ ] Daily wisdom notifications
- [ ] Community features
- [ ] Advanced AI models

## 📚 Resources

- [Bhagwat Gita Online](https://bhagavadgita.io/)
- [Sacred Texts](https://sacred-texts.com/hin/gita/)
- [Vedabase](https://vedabase.io/)

## 🙏 Acknowledgments

- **Divine Inspiration**: Shree Krishna and the Bhagwat Gita
- **Open Source**: Community contributions and libraries
- **Spiritual Teachers**: All gurus who preserve this wisdom

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🕉️ Om Tat Sat

*"Om Tat Sat" - That is the Absolute Truth*

---

**Built with ❤️ and divine wisdom for spiritual seekers worldwide**

*For questions or support, please open an issue on GitHub.*
