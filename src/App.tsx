import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import axios from "axios";
import { getToken } from "./utils/saveToken";

interface Message {
  id: number;
  text: string;
  isAi: boolean;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null); // Reference to scroll to bottom

  // Function to simulate typing effect
  const typeMessage = (message: string) => {
    return new Promise<string>((resolve) => {
      let currentText = "";
      let index = 0;

      const interval = setInterval(() => {
        if (isStoped) {
          clearInterval(interval); // Stop the typing effect
          resolve(currentText); // Resolve what was typed so far
          return;
        }

        currentText += message[index];
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const updatedMessages = prevMessages.slice(
            0,
            prevMessages.length - 1
          );
          return [...updatedMessages, { ...lastMessage, text: currentText }];
        });

        index++;
        if (index === message.length) {
          clearInterval(interval);
          resolve(currentText);
        }
      }, 10); // Adjust speed of typing
    });
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const token = getToken();

    try {
      // Make the request to the AI API
      const response = await axios.post(
        "https://lmzh.top/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: text,
            },
          ],
          model: "gpt-4o",
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiResponseText =
        response.data.choices[0]?.message.content || "No response from AI.";

      const aiMessage: Message = {
        id: messages.length + 2,
        text: "",
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      await typeMessage(aiResponseText); // Simulate typing effect
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, there was an error processing your request.",
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [isStoped, setIsStoped] = useState(false);

  useEffect(() => {
    console.log("isStoped", isStoped);
  }, [isStoped]);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto divide-y">
              {messages.map((message) => (
                <div key={message.id}>
                  <ChatMessage
                    message={message.text}
                    isAi={message.isAi}
                    timestamp={message.timestamp}
                  />
                </div>
              ))}
              <div ref={messageEndRef} /> {/* Scroll marker */}
            </div>
          </div>
          <div className="max-w-4xl mx-auto w-full mt-8">
            <ChatInput
              onSendMessage={handleSendMessage}
              isStoped={isStoped}
              setIsStoped={setIsStoped}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
