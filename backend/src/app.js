import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

// ✅ Socket.IO
connectToSocket(server);

// ✅ ENV variables
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Middlewares
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// ✅ Routes
app.use("/api/v1/users", userRoutes);

// ✅ Start server
const start = async () => {
    try {
        if (!MONGO_URL) {
            throw new Error("MONGO_URL not found in .env 💔");
        }

        const connectionDb = await mongoose.connect(MONGO_URL);
        console.log(`Database Successfully Connected 🎉🎉🎉`);

        server.listen(PORT, () => {
            console.log(`🚀 MindMesh Server is listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

start();