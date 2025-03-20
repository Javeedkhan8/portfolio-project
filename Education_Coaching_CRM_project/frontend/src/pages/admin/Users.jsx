import { useEffect, useState } from "react";
import { getUsers } from "../../services/adminServices";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers();
            setUsers(Array.isArray(res) ? res : []);
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Users</h2>

                    {users.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Name</th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                        >
                                            <td className="py-3 px-6">{user.name}</td>
                                            <td className="py-3 px-6">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
