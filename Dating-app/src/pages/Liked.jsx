import { useContext } from "react";
import { LikedContext } from "../context/LikedContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const Liked = () => {
  const { likedProfiles, removeLikedProfile } = useContext(LikedContext);
  const navigate = useNavigate();

  const handleChat = (profile) => {
    navigate(`/chat/${profile.login.uuid}`, { state: { profile } });
  };

  return (
    
    <div>
      <Navbar/>
      <div className="min-h-screen pt-20 p-2">
      <h1 className="text-2xl font-bold mb-4">Liked Profiles</h1>
      {likedProfiles.length === 0 ? (
        <p>No liked profiles yet.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 xl:grid-cols-3 gap-4">
          {likedProfiles.map((profile, index) => (
            <div key={index} className="border-2 p-4 flex gap-4 rounded-lg">
              <div>
                <img
                  src={profile.picture.medium}
                  alt={profile.name.first}
                  className="w-full rounded-full"
                />
                <button
                  onClick={() => handleChat(profile)}
                  className="bg-blue-500 text-white p-2 mt-2 rounded-full"
                >
                  Chat 💬
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {profile.name.first} {profile.name.last}
                </h2>
                <p>
                  {profile.location.city}, {profile.location.country}
                </p>
                <button
                  onClick={() => removeLikedProfile(profile.login.uuid)}
                  className=" text-white px-4 py-2 rounded mt-2"
                >
                 ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Liked;
