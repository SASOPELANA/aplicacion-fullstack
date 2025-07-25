import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// Morgan para las peticiones HTTP por tewrminal.
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);

export default app;
