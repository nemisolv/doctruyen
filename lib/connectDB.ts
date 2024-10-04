import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectDb = async () => {
    const connectionStr = process.env.MONGO_URI;
    if (!connectionStr) {
        throw new Error('Please add your Mongo URI to .env.local');
    }

    if (isConnected) {
        console.log('Using existing connection');
        return;
    }

    try {
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }as ConnectOptions);
        isConnected = true; // Set the connection status to true
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Could not connect to MongoDB');
    }
};
