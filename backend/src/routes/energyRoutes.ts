/** @format */

import express from "express";
import EnergyConsumption, {
  IEnergyConsumptionDocument,
} from "../models/EnergyConsumption";

const router = express.Router();

//POST /api/energy
router.post("/", async (req, res) => {
  try {
    const { date, consumption } = req.body;
    const newEntry = new EnergyConsumption({ date, consumption });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving data", error });
  }
});

//GET /api/energy
router.get("/", async (req, res) => {
  try {
    const data = await EnergyConsumption.find().sort({ date: 1 });
    const formattedData = data.map((entry: IEnergyConsumptionDocument) => ({
      ...entry.toObject(),
      date: entry.formattedDate,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

//GET /api/energy/trend
router.get("/trend", async (req, res) => {
  try {
    const data = await EnergyConsumption.find().sort({ date: 1 });
    if (data.length < 2) {
      return res.json({ trend: "Not enough data" });
    }

    const lastIndex = data.length - 1;
    const trend =
      data[lastIndex].consumption > data[lastIndex - 1].consumption
        ? "Increasing"
        : "Decreasing";
    res.json({ trend });
  } catch (error) {
    res.status(500).json({ message: "Error calculating trend", error });
  }
});

export default router;
