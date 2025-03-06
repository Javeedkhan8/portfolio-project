import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../service/chatService";
import ChatBubble from "../components/chatBubble";

function Message() {
  const { userId } = useParams(); // Get user ID from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessages(getMessages(userId));
  }, [userId]);

  const handleSend = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    sendMessage(userId, message);
    setMessages([...messages, { message, isSender: true }]);
    setMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Chat with {userId}</h1>
      <div className="border p-4 h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isSender={msg.isSender} />
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default Message;
