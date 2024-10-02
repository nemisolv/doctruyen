import mongoose from "mongoose";

let isConnected = false;

export const connectDb =  () => {
    const connectionStr = process.env.MONGO_URI;
    if(!connectionStr) {
        throw new Error('Please add your Mongo URI to .env.local');
    }
    if(isConnected) {
        console.log('Using existing connection');
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mongoose.connect(connectionStr).then(_ => {
        isConnected = true;
        console.log('Connected to MongoDB');
    }).catch(error => {
        console.log('Error connecting to MongoDB', error);
    }) 
}