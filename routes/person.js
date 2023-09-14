const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// Create a person
router.post("/", async (req, res) => {
  try {
    // Assuming name must be unique, check if name already exists
    const existingName = await Person.findOne({
      name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
    });

    // Assuming e-mail must be unique,  Check if email already exists
    const existingEmail = await Person.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingName) {
      return res.status(400).json({ message: "Name already exists" });
    }

    const person = await Person.create(req.body);
    return res
      .status(200)
      .json({ person, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user by name
router.get("/:name", async (req, res) => {
  try {
    const person = await Person.findOne({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (!person) throw new Error("User not found");
    res.status(200).json({ person, message: "User found" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

// Update a user by name
router.put("/:name", async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: { $regex: req.params.name, $options: "i" } },
      req.body,
      {
        new: true,
      }
    );
    if (!person) throw new Error("User not found");
    res
      .status(200)
      .json({ person, message: "User details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

// Delete a user by name
router.delete("/:name", async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (!person) throw new Error("User not found");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
