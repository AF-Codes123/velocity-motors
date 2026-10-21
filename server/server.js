
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const carRoutes = require("./routes/carRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cars", carRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Velocity Motors backend is running!"
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
