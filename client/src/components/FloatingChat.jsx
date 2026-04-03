import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import './FloatingChat.css';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am the Pixora AI. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getOrCreateGuestToken = async () => {
    let token = localStorage.getItem('ai_chat_token');
    if (token) return token;

    // Register a dummy guest user
    const guestEmail = `guest_${Date.now()}_${Math.floor(Math.random() * 10000)}@guest.pixoralabz.tech`;
    const guestPassword = `pwd_${Date.now()}_secure`;

    try {
      const res = await fetch('https://api.pixoralabz.tech/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Guest User',
          email: guestEmail,
          password: guestPassword
        })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('ai_chat_token', data.token);
        return data.token;
      }
    } catch (err) {
      console.error('Failed to auto-register guest', err);
    }
    return null;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      let token = await getOrCreateGuestToken();
      
      let res = await fetch('https://api.pixoralabz.tech/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (res.status === 401) {
        // Token might be expired, clear it and retry once
        localStorage.removeItem('ai_chat_token');
        token = await getOrCreateGuestToken();
        res = await fetch('https://api.pixoralabz.tech/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: userMessage })
        });
      }

      const data = await res.json();
      
      let textContent = null;
      if (data.result) {
        textContent = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
      } else if (data.data) {
        textContent = typeof data.data === 'string' ? data.data : (data.data.message || data.data.response);
      } else if (data.response) {
        textContent = data.response;
      } else if (data.reply) {
        textContent = data.reply;
      } else if (data.message && data.message !== 'User registered successfully') {
        textContent = data.message;
      } else {
        // Fallback: just dump the JSON so we can see what the API actually returns
        textContent = JSON.stringify(data);
      }

      if (data.status !== false && data.success !== false) {
        setMessages(prev => [...prev, { role: 'ai', content: textContent }]);
      } else {
        const errorMsg = textContent || 'Sorry, an unknown error occurred.';
        setMessages(prev => [...prev, { role: 'system', content: errorMsg }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'system', content: 'Connection error. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="floating-chat-wrapper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-title">AI Assistant</span>
              <span className="chat-subtitle">Powered by Pixora AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message ai">
                <div className="message-content typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-footer">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input"
            />
            <button type="submit" disabled={!inputText.trim()} className="send-btn" aria-label="Send">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-fab" aria-label="Open Chat">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingChat;
