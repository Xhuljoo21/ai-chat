import React from 'react';
import { Clock, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const chats = [
    { id: 1, title: 'Project Planning Discussion', date: '2024-03-10' },
    { id: 2, title: 'Code Review Assistance', date: '2024-03-09' },
    { id: 3, title: 'Bug Analysis Chat', date: '2024-03-08' },
  ];

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="font-semibold">Chat History</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left p-4 hover:bg-gray-50 border-b"
          >
            <h3 className="font-medium truncate">{chat.title}</h3>
            <p className="text-sm text-gray-500">{chat.date}</p>
          </button>
        ))}
      </div>
    </div>
  );
}