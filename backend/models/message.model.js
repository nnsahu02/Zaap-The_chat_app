import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        message: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);

export default Message;