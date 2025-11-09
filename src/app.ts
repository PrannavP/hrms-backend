import express, { Application } from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app: Application = express();

// use the cors middleware in express app so frontend can connect
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

// Use the express middlewar to parse the data in json
app.use(express.json());

// Route to user related
app.use("/api/user", userRoutes);

// Route to auth related
app.use("/api/auth", authRoutes);

export default app;