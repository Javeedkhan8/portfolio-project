import { createContext, useState, useEffect } from "react";

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [likedProfiles, setLikedProfiles] = useState([]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedProfiles")) || [];
    setLikedProfiles(storedLikes);
  }, []);

  const addLikedProfile = (profile) => {
    setLikedProfiles((prev) => {
      const updatedLikes = [...prev, profile];
      localStorage.setItem("likedProfiles", JSON.stringify(updatedLikes));
      return updatedLikes;
    });

  };
  const removeLikedProfile = (id) => {
    setLikedProfiles((prev) => prev.filter((profile) => profile.login.uuid !== id));
  };

  return (
    <LikedContext.Provider value={{ likedProfiles, addLikedProfile,removeLikedProfile}}>
      {children}
    </LikedContext.Provider>
  );
};
