const {Message} = require("../models/Message")

const sendMessage = async (req,res) => {
    try{
    const {sender, receiver, message} = req.body;
    const newMessage = await Message.create({sender,receiver,message});
    res.json(newMessage);
    } catch (error) {
        res.status(500).json({message: "Error sending message", error})
    }
}

const getMessages = async (req,res) => {
    try{
        const {sender, receiver} = req.query;
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({createdAt: 1});

        res.json(messages);
    } catch (error){
        res.status(500).json({ message: "Error fetching messages", error });
    }
} 

module.exports = {sendMessage,getMessages}