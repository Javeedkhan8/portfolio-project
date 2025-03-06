export const likedUser = (userId) => {
    let likedUsers = JSON.parse(localStorage.getItem("likeduser")) || [];
    if(!likedUsers.includes(userId)){
        likedUsers.push(userId);
        localStorage.setItem("likeduser",JSON.stringify(likedUsers))
    }
    return likedUsers
}

export const getLikedUsers = () => {
    const storedData = localStorage.getItem("likeduser");
    return storedData ? JSON.parse(storedData) : [];
}

export const dislikeUser = (userId) => {
    let dislikeUsers = JSON.parse(localStorage.getItem("dislikeduser")) || [];
    if(!dislikeUsers.includes(userId)){
        dislikeUsers.push(userId);
        localStorage.setItem("dislikeduser",JSON.stringify(dislikeUsers))
    }
    return dislikeUsers
}