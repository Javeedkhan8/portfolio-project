import { useEffect, useState, useContext } from 'react';
import Message from './Message';
import { sendMessage, getMessages } from '../services/messageService';
import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';

const ChatBox = ({ selectedUser }) => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    try {
      const res = await getMessages(selectedUser._id, user.token);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      loadMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (msg) => {
        if (msg.senderId === selectedUser._id) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    }
  }, [socket, selectedUser]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const message = { receiverId: selectedUser._id, text };
    try {
      const res = await sendMessage(message, user.token);
      setMessages((prev) => [...prev, res.data]);
      socket.emit("send_message", {
        senderId: user._id,
        receiverId: selectedUser._id,
        text
      });
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg h-full">

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isOwn={msg.senderId === user._id} />
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSend} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
