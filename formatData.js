const mongoose = require("mongoose");
const { DATABASE_URL } = require("./config");

mongoose
.connect(DATABASE_URL)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((e) => {
  console.log("connection failed");
});

const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: Number,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model("Data", dataSchema);

const chartSchema = mongoose.Schema({
  name:{},
  children:{
    type: mongoose.model.
  }
})
const ChartModel = mongoose.model("ChartModel", chartSchema);
