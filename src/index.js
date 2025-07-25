import app from "./app.js";

// Importamos la base de datos
import { connectDB } from "./db.js";

// Conectamos a la base de datos
connectDB();

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
