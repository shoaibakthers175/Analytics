import mongoose from "mongoose";

const analyticsSchema =
  new mongoose.Schema({

  clientId: String,

  visitorId: String,

  sessionId: String,

  page: String,

  url: String,

  element: String,

  eventType: String,

  x: Number,

  y: Number,

  scrollDepth: Number,

  device: String,

  browser: String,

  screenWidth: Number,

  screenHeight: Number,

  timestamp: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model(
  "Analytics",
  analyticsSchema
);