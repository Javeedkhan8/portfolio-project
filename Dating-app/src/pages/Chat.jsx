import { useLocation } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const location = useLocation();
  const profile = location.state?.profile;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="p-4">
      {profile ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Chat with {profile.name.first}</h1>
          <div className="border p-4 h-64 overflow-y-auto bg-gray-100">
            {messages.map((msg, index) => (
              <p key={index} className={`p-2 ${msg.sender === "user" ? "bg-blue-300" : "bg-gray-300"} rounded my-1`}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 w-full"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-green-500 text-white p-2 ml-2">Send</button>
          </div>
        </>
      ) : (
        <p>No chat selected.</p>
      )}
    </div>
  );
};

export default Chat;
