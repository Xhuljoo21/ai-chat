import React, { useEffect } from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isAi, timestamp, isStoped }: ChatMessageProps) {

  useEffect(() => {
    if (isStoped) {
      console.log(message.slice());
    } else {
      console.log(message);
    }
  }, [message]);

  return (
    <div className={`flex gap-4 p-4 ${isAi ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAi ? 'bg-blue-500' : 'bg-gray-700'
      }`}>
        {isAi ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{isAi ? 'AI Assistant' : 'You'}</span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <p className="mt-1 text-gray-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}