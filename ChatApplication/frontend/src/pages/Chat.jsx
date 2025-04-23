import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
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
      const otherUsers = res.data.filter((u) => u._id !== user.id);
      setUsers(otherUsers);
    };
    fetchUsers();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <h2 className="text-white text-lg sm:text-xl font-semibold">
          Welcome, {user.name}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* User list */}
        <div className="w-full sm:w-1/4 bg-white rounded-lg shadow-lg p-4 space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center sm:text-left">
            Select a user to chat
          </h3>
          <div className="space-y-2">
            {users.map((userItem) => (
              <div
                key={userItem._id}
                onClick={() => setSelectedUser(userItem)}
                className={`cursor-pointer p-2 rounded-lg transition duration-150 ${
                  selectedUser?._id === userItem._id
                    ? 'bg-blue-200'
                    : 'hover:bg-blue-100'
                }`}
              >
                <p className="text-gray-800 text-sm sm:text-base">{userItem.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat box */}
        {selectedUser && (
          <div className="w-full sm:flex-1 bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center sm:text-left">
                Chat with {selectedUser.name}
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="mt-2 sm:mt-0 bg-gray-300 p-2 rounded hover:bg-gray-400 text-sm sm:text-base"
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
