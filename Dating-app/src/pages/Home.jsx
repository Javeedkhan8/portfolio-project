import { useEffect, useState } from 'react';
import { getUsers } from '../service/userService';
import Card from '../components/Card';

function Home() {
    const [users, setUsers] = useState([]);
    const [genderFilter, setGenderFilter] = useState("all");
    const [searchQuery,setSearchQuery] = useState("")

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const handleLike = (user) => console.log("Liked:", user.name.first);
    const handleDislike = (user) => console.log("Disliked:", user.name.first);

    
    const filteredUsers = users.filter((user) =>
        (genderFilter === "all" ? true : user.gender === genderFilter) &&
        (`${user.name.first} ${user.name.last}`.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-6 bg-gray-200">
            <h1 className="text-2xl font-bold">Discover People</h1>

            <div className="flex flex-col md:flex-row items-center gap-4 my-4">
            <input
               type="text"
               placeholder="Search by name..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="p-2 border rounded w-full md:w-1/3"
        />
            <div className="my-4">
                <label className="mr-2 font-semibold">Filter by Gender:</label>
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {filteredUsers.map((user) => (
                    <Card key={user.login.uuid} user={user} onLike={handleLike} onDislike={handleDislike} />
                ))}
            </div>
        </div>
    );
}

export default Home;
