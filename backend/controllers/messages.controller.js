import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        if (!receiverId) {
            return res.status(400).json({ message: 'Receiver is required' });
        }

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        Promise.all([newMessage.save(), conversation.save()]);
        return res.status(201).json({ newMessage });
    } catch (error) {
        console.error('Error in sendMessages: ', error);
        return res.status(500).json({ error: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: usertoChatId } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({ participants: { $all: [userId, usertoChatId] } }).populate('messages');

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages

        return res.status(200).json(messages);

    } catch (error) {
        console.error('Error in getMessages: ', error);
        return res.status(500).json({ error: error.message });
    }
}