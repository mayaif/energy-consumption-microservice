/** @format */

import mongoose from "mongoose";

const EnergyConsumptionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  consumption: { type: Number, required: true },
});

export default mongoose.model("EnergyConsumption", EnergyConsumptionSchema);
