const {Message} = require("../model/Message");

const sendMessage = async(req,res) => {
    const {receiverId,text} = req.body
    const senderId = req.user.id;

    if(!receiverId || !text){
        res.status(400).json({message : "Message and receiver are required"})
    }

    try{
        const newMessage = new Message({
            sender : senderId,
            receiver : receiverId,
            text,
        })

        await newMessage.save();
        res.status(200).json(newMessage)
    } catch (error){
        res.status(500).json({message : "Failed to send message",error})
    }
}

const getMessages = async (req,res) => {
    const userId = req.user.id;
    const otherUserId = req.params.userId;

    try{
        const messages = await Message.find({
            $or : [
                {sender : userId, receiver : otherUserId},
                {sender : otherUserId, receiver : userId},
            ],
        }).sort({createdAt : 1});
        res.status(200).json(messages)
    } catch (error){
        res.status(500).json({message : "failed to fetch messages", error})
    }
}

module.exports = {sendMessage,getMessages}

