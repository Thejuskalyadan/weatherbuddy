import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  pressure: Number,
  windSpeed: Number,
  rainLevel: Number,
  uvIntensity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Weather", weatherSchema);
