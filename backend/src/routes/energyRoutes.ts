/** @format */

import express from "express";
import EnergyConsumption, {
  IEnergyConsumptionDocument,
} from "../models/EnergyConsumption";
import { startOfDay, format } from "date-fns";

const router = express.Router();

//POST /api/energy
router.post("/", async (req, res) => {
  try {
    const { date, consumption } = req.body;
    const dateStart = startOfDay(new Date(date));

    const updatedEntry = await EnergyConsumption.findOneAndUpdate(
      { date: dateStart },
      { date: dateStart, consumption },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving data", error });
  }
});

//GET /api/energy
router.get("/", async (req, res) => {
  try {
    const data = await EnergyConsumption.find().sort({ date: 1 });
    const formattedData = data.map((entry: IEnergyConsumptionDocument) => ({
      id: entry._id,
      date: format(entry.date, "dd/MM/yy"),
      consumption: entry.consumption,
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
