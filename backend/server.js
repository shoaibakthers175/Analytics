import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());

app.use(express.json());


// ✅ ADD THIS ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// AI Routes
app.use("/api/ai", aiRoutes);


// Socket Middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});


// Analytics Routes
app.use("/", analyticsRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});


// Socket Connection
io.on("connection", () => {
  console.log("Socket Connected");
});


// Server Start
server.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});
