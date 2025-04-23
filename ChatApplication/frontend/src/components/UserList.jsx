const UserList = ({ users, onSelect, selectedUser }) => {
  return (
    <div className="p-4 border-r border-gray-300 w-full sm:w-64 bg-white sm:h-full overflow-y-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">Users</h3>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelect(user)}
          className={`p-3 rounded-md mb-2 cursor-pointer transition-colors duration-200 ${
            selectedUser?._id === user._id ? 'bg-blue-200' : 'hover:bg-blue-100'
          }`}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
