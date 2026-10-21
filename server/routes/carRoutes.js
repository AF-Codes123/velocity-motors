
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// GET: Fetch all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message,
    });
  }
});

// POST: Add a new car
router.post("/", async (req, res) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json({
      success: true,
      message: "Car added successfully!",
      car,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add car",
      error: error.message,
    });
  }
});

module.exports = router;

