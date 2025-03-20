const {Message} = require("../models/Message")

const sendMessage = async (req, res) => {
    try {
        console.log("🔹 Incoming Message Request:", req.body);

        const { sender, receiver, message } = req.body;

        if (!sender || !receiver || !message) {
            console.log("Missing Fields:", { sender, receiver, message });
            return res.status(400).json({ message: "Sender, receiver, and message are required" });
        }

        const newMessage = await Message.create({ sender, receiver, message });

        console.log(" Message saved:", newMessage);
        // res.json(newMessage);
        await newMessage.save();
        res.status(201).json(newMessage);
        
    } catch (error) {
        console.error(" Error sending message:", error);
        res.status(500).json({ message: "Error sending message", error });
    }
};



const getMessages = async (req,res) => {
    try{
        // const {sender, receiver} = req.query;
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ]
        }).sort({createdAt: 1});

        res.json(messages);
    } catch (error){
        res.status(500).json({ message: "Error fetching messages", error });
    }
} 

module.exports = {sendMessage,getMessages}