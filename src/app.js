import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173", // --> Solo se comunica con esta ruta
	}),
);

// Morgan para las peticiones HTTP por tewrminal.
app.use(morgan("dev"));
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
