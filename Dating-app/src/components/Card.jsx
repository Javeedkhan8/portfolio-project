import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LikedContext } from "../context/LikedContext";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function Card({ user }) {
  const { addLikedProfile, removeLikedProfile, likedProfiles } = useContext(LikedContext);
  const [isLiked, setIsLiked] = useState(
    likedProfiles.some((profile) => profile.login.uuid === user.login.uuid)
  );

  const handleLike = () => {
    addLikedProfile(user);
    setIsLiked(true);
  };

  const handleRemove = () => {
    removeLikedProfile(user.login.uuid);
    setIsLiked(false);
  };

  return (
    <div className="p-4 rounded-lg shadow-md shadow-gray-400 text-center relative bg-white">
      {isLiked && (
        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
          Liked ✅
        </span>
      )}
      <img
        src={user.picture.large}
        alt={user.name.first}
        className="w-32 h-32 mx-auto rounded-full"
      />
      <h2 className="text-xl font-bold">
        {user.name.first} {user.name.last}
      </h2>
      <p>
        {user.location.city}, {user.location.country}
      </p>
      <div className="flex justify-center gap-4 mt-4">
        {!isLiked ? (
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
           <FontAwesomeIcon icon={faThumbsUp} style={{ color: "white", marginRight: "5px" }} />
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            <FontAwesomeIcon icon={faThumbsDown} style={{ color: "white", marginRight: "5px" }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
