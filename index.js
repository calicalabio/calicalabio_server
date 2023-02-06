import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import messageRoutes from './routes/messages.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        error: {
            message: err.message
        }
    })
});

app.use(cors());

app.use('/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the calicalabio API');
});

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));