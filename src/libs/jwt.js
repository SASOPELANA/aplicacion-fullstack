import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export async function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		// Generar un token JWT
		jwt.sign(
			payload, // Carga útil del token, que puede ser un objeto con información del usuario
			TOKEN_SECRET, // Clave secreta para firmar el token
			{
				expiresIn: "1d", // El token expirará en 1 día
			},
			(err, token) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(token);
				}
			},
		);
	});
}
