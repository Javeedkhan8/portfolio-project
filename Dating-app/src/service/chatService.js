export const sendMessage = (userId, message) => {
    let chats = JSON.parse(localStorage.getItem("chats")) || {};

    if (!chats[userId]) {
        chats[userId] = [];
    }

    chats[userId].push({
        message,
        timestamp: new Date().toISOString(),
        sender: "me",
    });

    localStorage.setItem("chats", JSON.stringify(chats));
};

export const getMessages = (userId) => {
    let chats = JSON.parse(localStorage.getItem("chats")) || {};
    return chats[userId] || []; 
};
