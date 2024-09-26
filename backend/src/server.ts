/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import energyRoutes from "./routes/energyRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//MongoDB connection
connectDB();

//Routes
app.use("/api/energy", energyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
