import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
    {
        content: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;