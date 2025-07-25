import mongoose from "mongoose";

// Aquí se hacen validaciones y se define el esquema del modelo de usuario
// Con esto también se define la estructura de los datos que se guardan en la base de datos

const userChema = new mongoose.Schema(
	{
		username: {
			type: String,
			// Validamos que el nombre de usuario sea único
			required: true,
			// Limpiamos el campo de espacios en blanco
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			// Validamos que el email sea único
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		// Sirve para agregar campos de fecha de creación y actualización automáticamente
		timestamps: true,
	},
);

// Esto es para interactuar con la base de datos y el modelo
export default mongoose.model("User", userChema);
