import { createContext, useEffect, useState } from "react";

export const MatchContext = createContext();

export const MatchProvider = ({children}) => {
    const [likedusers,setLikedUsers] = useState([]);
    const [dislikedusers,setDislikedusers] =useState([]);

    useEffect(() => {
        setLikedUsers(JSON.parse(localStorage.getItem("likeduser"))||[])
        setDislikedusers(JSON.parse(localStorage.getItem("dislikeduser"))||[])

    })

    const likeuser = (user) => {
        if(!likedusers.find((u) =>u.login.uuid === user.login.uuid)){
            const updatelikes = [...likedusers,user]
            setLikedUsers(updatelikes);
            localStorage.setItem("likeduser",JSON.stringify(updatelikes))
        }
    }

    const dislikeuser = (user) => {
        if(!dislikedusers.find((u) => u.login.uuid === user.login.uuid)){
            const updatedDislikes = [...dislikedusers,user];
            setDislikedusers(updatedDislikes);
            localStorage.setItem("dislikeuser",JSON.stringify(updatedDislikes))
        }
    }

    return (
        <MatchContext.Provider value={{likedusers,likeuser,dislikedusers,dislikeuser}}>
            {children}
        </MatchContext.Provider>
    )
}