import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";

// Herramienta para encriptar contraseñas
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
	const { email, password, username } = req.body;

	//console.log(email, password, username);

	// Aquí podrías agregar la lógica para guardar el usuario en la base de datos
	// Instaciar un objeto de usario

	try {
		const passwordHash = await bcrypt.hash(password, 10); // --> esto da un string random

		const newUser = new User({
			email,
			password: passwordHash,
			username,
		});

		// Aquí podrías guardar el usuario en la base de datos
		const userSaved = await newUser.save();

		const token = await createAccessToken({ id: userSaved._id });

		res.cookie("token", token);
		res.json({
			message: "Usario creadted sucessfully",
		});

		// Solo devolvemos datos para el frontend sin la contraseña

		res.json({
			id: userSaved._id,
			username: userSaved.username,
			email: userSaved.email,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = (req, res) => {
	res.send("Login");
};
