const UserList = ({ users, onSelect, selectedUser }) => {
    return (
      <div className="p-4 border-r border-gray-300 w-64">
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelect(user)}
            className={`p-2 cursor-pointer rounded-lg hover:bg-blue-100 ${
              selectedUser?._id === user._id ? 'bg-blue-200' : ''
            }`}
          >
            {user.name}
          </div>
        ))}
      </div>
    );
  };
  
  export default UserList;
  