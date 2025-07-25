// Uso de mongoose para conectar a la base de datos MongoDB
import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost/merd-db");
		console.log(">>> DB is connected");
	} catch (error) {
		console.log(error);
	}
};
