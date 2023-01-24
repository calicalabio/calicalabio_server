import mongoose from 'mongoose';
import Message from '../models/Message.js';
import Filter from 'bad-words';

const filter = new Filter();

export const getMessages = async (req, res) => {
    try {
        console.log('Calling GET on server...');
        const messages = await Message.find().sort({ createdAt : -1 }).limit(10).exec();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMessage = async (req, res) => {   
    if (filter.isProfane(req.body.content)) {
        console.log("User tried to swear in POST.");
        res.status(400).json({ error: `Don't swear!` });
        //const error = new Error(`Don't swear! I have your IP address >:(`);
        //error.statusCode = 400;
        //return next(error);
    } else {
        const newMessage = new Message({
            _id: new mongoose.Types.ObjectId(),
            content: req.body.content, 
            author: req.body.author || req.socket.remoteAddress
        });
    
        try {
            console.log('Calling POST on server...');
            await newMessage.save();
            res.status(201).json({ newMessage });
        } catch (error) {
            res.status(409).json({ error });
        }
    }   
}