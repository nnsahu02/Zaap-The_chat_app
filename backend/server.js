import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/users.routes.js";

import connectDB from "./db/mongo.connect.js";
import { app, server } from "./socket/socket.js";

app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to ZAAP, The chat app🚀"
    });
});
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT, async () => {
    await connectDB(MONGO_URI)
    console.log(`Server is running on port ${PORT}🏃‍♂️`);
});