import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getChatResponse } from '../lib/ai';

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm MotionFleet's AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);

      if (user?.id) {
        const { data: history } = await supabase
          .from('chat_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(50);

        if (history) {
          setMessages(history.map(msg => ({
            text: msg.message,
            isBot: msg.is_bot
          })));
        }
      }
    };

    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const userMessage = input;
    setInput('');

    try {
      const response = await getChatResponse(userMessage, userId);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I encountered an error. Please try again later.",
        isBot: true
      }]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">MotionFleet Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-yellow-400 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;