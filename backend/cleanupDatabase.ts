/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
import EnergyConsumption from "./src/models/EnergyConsumption";
import { startOfDay } from "date-fns";

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

async function cleanupDatabase() {
  try {
    await connectDB();

    const allEntries = await EnergyConsumption.find().sort({ date: 1 });
    const uniqueEntries = new Map();

    for (const entry of allEntries) {
      const dateKey = startOfDay(entry.date).toISOString();
      if (
        !uniqueEntries.has(dateKey) ||
        entry.date > uniqueEntries.get(dateKey).date
      ) {
        uniqueEntries.set(dateKey, entry);
      }
    }

    await EnergyConsumption.deleteMany({});

    for (const entry of uniqueEntries.values()) {
      await EnergyConsumption.create({
        date: entry.date,
        consumption: entry.consumption,
      });
    }

    console.log(
      `Cleanup complete. ${uniqueEntries.size} unique entries remain.`
    );
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanupDatabase();
