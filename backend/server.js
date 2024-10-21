import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/utils/connectDB.js";
import authRoute from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoute.js";
import placeRouter from "./src/routes/placesRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", cors());

app.use("/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/places", placeRouter);

// Database connection
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
