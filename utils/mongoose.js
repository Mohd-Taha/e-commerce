// const {username, password}= process.env;
// export const connectionStr = "mongodb+srv://"+username+":"+password+"@cluster0.1jhqu.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0"
// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/utils/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useCreateIndex: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;