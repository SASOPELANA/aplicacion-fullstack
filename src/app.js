import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// Morgan para las peticiones HTTP por tewrminal.
app.use(morgan("dev"));
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
