require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/person");

const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use all routes
app.use("/api", personRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// Log successful connection
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB.");
});

// Log Connection Errors
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// Log Disconnection
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
