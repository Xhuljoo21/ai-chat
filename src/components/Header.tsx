import React from 'react';
import { MessageSquare, Menu, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={onToggleSidebar}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
          <User className="w-6 h-6 text-blue-500" />
      </div>
    </header>
  );
}