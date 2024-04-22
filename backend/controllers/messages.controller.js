import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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
        const msgData = {
            senderId,
            receiverId,
            message
        }

        const createMsg = await Message.create(msgData);

        if (createMsg) {
            conversation.messages.push(createMsg._id);
        }
        Promise.all([conversation.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', createMsg);
        }
        return res.status(201).json(createMsg);
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