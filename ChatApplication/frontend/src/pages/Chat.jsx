import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import UserList from '../components/UserList';
import ChatBox from '../components/ChatBox';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers(user.token);
      const otherUsers = res.data.filter(u => u._id !== user.id);
      setUsers(otherUsers);
    };
    fetchUsers();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <h2 className="text-white text-xl font-semibold">Welcome, {user.name}</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="flex p-4 space-x-4">
      
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Select a user to chat</h3>
          <div className="space-y-2">
            {users.map((userItem) => (
              <div 
                key={userItem._id} 
                onClick={() => setSelectedUser(userItem)} 
                className={`cursor-pointer p-2 rounded-lg hover:bg-blue-100 transition duration-150 
                            ${selectedUser?._id === userItem._id ? 'bg-blue-200' : 'bg-white'}`}
              >
                <p className="text-gray-800">{userItem.name}</p>
              </div>
            ))}
          </div>
        </div>

       
        {selectedUser && (
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-700">Chat with {selectedUser.name}</h3>
              <button 
                onClick={() => setSelectedUser(null)} 
                className="bg-gray-300 p-2 rounded hover:bg-gray-400"
              >
                Close Chat
              </button>
            </div>
            <ChatBox selectedUser={selectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
