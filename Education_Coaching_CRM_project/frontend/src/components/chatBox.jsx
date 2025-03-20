import { useState, useEffect } from "react";
import { sendMessage, getMessages } from "../services/chatServices";
import { getCurrentUser } from "../services/authServices";
import { getInstructorsByStudent, getEnrolledStudents } from "../services/courseServices";
import { io } from "socket.io-client";

const socket = io("http://localhost:2000");

const ChatBox = () => {
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);  
    const [receiverId, setReceiverId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showContacts, setShowContacts] = useState(false); // Toggle for small screens

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (user) {
            const fetchContacts = user.role === "student" ? getInstructorsByStudent : getEnrolledStudents;
            fetchContacts(user._id)
                .then((data) => {
                    if (Array.isArray(data)) {
                        setContacts(data);
                        if (data.length > 0) {
                            setReceiverId(data[0]._id);
                        }
                    } else {
                        setContacts([]);
                    }
                })
                .catch(() => setContacts([]));
        }
    }, [user]);

    useEffect(() => {
        if (user && receiverId) {
            getMessages(user._id, receiverId)
                .then(setMessages)
                .catch(console.error);
        }
    }, [receiverId, user]);

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleSend = () => {
        if (!newMessage.trim() || !receiverId) return;

        const messageData = { sender: user._id, receiver: receiverId, message: newMessage };

        socket.emit("sendMessage", messageData);

        sendMessage(messageData)
            .then((res) => {
                setMessages((prev) => [...prev, res]);
                setNewMessage("");
            })
            .catch(console.error);  
    };

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Small Screen Toggle Button */}
            <button 
                className="md:hidden absolute top-4 left-4 bg-gray-900 text-white px-3 py-2 rounded-lg"
                onClick={() => setShowContacts(!showContacts)}
            >
                {showContacts ? "Hide Contacts" : "Show Contacts"}
            </button>

            {/* Sidebar for Contacts */}
            <div className={`absolute md:relative md:w-64 bg-gray-900 text-white p-4 overflow-y-auto h-full 
                ${showContacts ? "w-64" : "w-0 hidden"} md:block transition-all duration-300 ease-in-out`}>

                <h2 className="text-lg font-semibold mb-4">Contacts</h2>

                <ul>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <li
                                key={contact._id}
                                onClick={() => {
                                    setReceiverId(contact._id);
                                    setShowContacts(false); // Close the contact list after selection
                                }}
                                className={`p-3 rounded-lg cursor-pointer ${
                                    receiverId === contact._id ? "bg-gray-700" : "hover:bg-gray-700"
                                } transition`}
                            >
                                {contact.name}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No contacts available</p>
                    )}
                </ul>
            </div>

            {/* Chat Section */}
            <div className="flex-1 flex flex-col p-6">
                {/* Chat Header */}
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        Chat with {user?.role === "student" ? "Instructor" : "Student"}
                    </h3>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md p-4 mt-4 space-y-3">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-xs ${
                                    msg.sender === user._id ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"
                                }`}
                            >
                                {msg.message}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No messages yet</p>
                    )}
                </div>

                {/* Chat Input */}
                <div className="mt-4 flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
