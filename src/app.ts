import express, { Application } from "express";
import { setupSwagger } from "./swagger";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import employeeRoutes from "./routes/employee.routes";

const app: Application = express();

// use the cors middleware in express app so frontend can connect
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

// Use the express middlewar to parse the data in json
app.use(express.json());

setupSwagger(app);

// Route to user related
app.use("/api/user", userRoutes);

// Route to auth related
app.use("/api/auth", authRoutes);

// Route related to Menu
app.use("/api/menu", menuRoutes);

// Route related to employees
app.use('/api/employee', employeeRoutes);

export default app;