import "dotenv/config";

import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import http from "http";

import { Server }
from "socket.io";

import analyticsRoutes
from "./routes/analyticsRoutes.js";
import aiRoutes
from "./routes/aiRoutes.js";

const app = express();

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());

app.use(express.json());

app.use(
  "/api/ai",
  aiRoutes
);

app.use((req, res, next) => {

  req.io = io;

  next();

});

mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {
  console.log(
    "MongoDB Connected"
  );
});

app.use("/", analyticsRoutes);

io.on(
  "connection",
  () => {
    console.log(
      "Socket Connected"
    );
  }
);

server.listen(
  process.env.PORT,
  () => {

    console.log(
      "Server Running"
    );

  }
);