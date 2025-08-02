// Usamos axios para hacer peticiones HTTP
import axios from "./axios.js";

// Definimos la URL base de la API
// Asegúrate de que la URL sea correcta según tu configuración del backend

// Función para registrar un nuevo usuario
// Esta función envía una solicitud POST a la ruta /register con los datos del usuario
export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

// Función para verificar el token de autenticación
export const verifyTokenRequest = () => axios.get(`/verify`);
