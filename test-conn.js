import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = "mongodb://the-patil-photographer:the-patil-photographer@ac-mpligxt-shard-00-00.ewbbknv.mongodb.net:27017,ac-mpligxt-shard-00-01.ewbbknv.mongodb.net:27017,ac-mpligxt-shard-00-02.ewbbknv.mongodb.net:27017/the-patil-photography?ssl=true&replicaSet=atlas-4rwyp0-shard-0&authSource=admin";
const test = async () => {
    console.log("Testing connection (Standard URI)...");
    console.log("URI:", MONGODB_URI);
    console.log("DB Name:", process.env.DATABASE_NAME);

    try {
        mongoose.connection.on("connecting", () => console.log("Connecting..."));
        mongoose.connection.on("connected", () => console.log("Connected!"));
        mongoose.connection.on("error", (err) => console.log("Error event:", err.message));

        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.DATABASE_NAME,
            serverSelectionTimeoutMS: 10000,
        });

        console.log("Successfully connected to MongoDB");
        process.exit(0);
    } catch (err) {
        console.error("Connection failed catch:", err.message);
        process.exit(1);
    }
};

test();
