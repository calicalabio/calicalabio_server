import mongoose from 'mongoose';
import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMessage = async (req, res) => {    
    const newMessage = new Message({
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content, 
        author: req.body.author || req.socket.remoteAddress
    });

    try {
        await newMessage.save();
        res.status(201).json({ newMessage });
    } catch (error) {
        res.status(409).json({ error });
    }
}