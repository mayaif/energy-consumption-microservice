/** @format */

import mongoose, { Document, Model } from "mongoose";
import { formatDateWithDateFns } from "../utils/dateFormatting";

interface IEnergyConsumption {
  date: Date;
  consumption: number;
}

// Define and export the document interface
export interface IEnergyConsumptionDocument
  extends IEnergyConsumption,
    Document {
  formattedDate: string;
}

// Define the model interface
interface IEnergyConsumptionModel extends Model<IEnergyConsumptionDocument> {}

const EnergyConsumptionSchema = new mongoose.Schema<IEnergyConsumptionDocument>(
  {
    date: { type: Date, required: true },
    consumption: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

EnergyConsumptionSchema.virtual("formattedDate").get(function (
  this: IEnergyConsumptionDocument
) {
  return formatDateWithDateFns(this.date);
});

const EnergyConsumption = mongoose.model<
  IEnergyConsumptionDocument,
  IEnergyConsumptionModel
>("EnergyConsumption", EnergyConsumptionSchema);

export default EnergyConsumption;
