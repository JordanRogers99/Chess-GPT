import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

interface TournamentChatProps {
  tournamentId: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

function TournamentChat({ tournamentId, messages, onSendMessage }: TournamentChatProps) {
  const { user } = useStore();
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Tournament Chat</h3>
      
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-2 mb-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg ${
              msg.userId === user?.id
                ? 'bg-blue-100 ml-8'
                : 'bg-gray-100 mr-8'
            }`}
          >
            <div className="text-sm font-semibold">
              {msg.username}
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={!user}
        />
        <button
          type="submit"
          disabled={!user || !message.trim()}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default TournamentChat;