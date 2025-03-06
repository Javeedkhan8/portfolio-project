import { useEffect, useState } from 'react';
import { getLikedUsers } from '../service/matchServices';

function Matches() {
    const [likedUsers, setLikedUsers] = useState([]);

    useEffect(() => {
        setLikedUsers(getLikedUsers()); 
    }, []);

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold'>My Matches</h2>
            {likedUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {likedUsers.map(user => (
                        <div key={user.id} className="border p-4 rounded-lg shadow-md text-center">
                            <img src={user.photo} alt={user.name} className="w-24 h-24 mx-auto rounded-full" />
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p>{user.city}, {user.country}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No matches yet.</p>
            )}
        </div>
    );
}

export default Matches;
