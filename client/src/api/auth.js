// Usamos axios para hacer peticiones HTTP
import axios from "axios";

// Definimos la URL base de la API
// Asegúrate de que la URL sea correcta según tu configuración del backend
const API = "http://localhost:5000/api";

// Función para registrar un nuevo usuario
// Esta función envía una solicitud POST a la ruta /register con los datos del usuario
export const registerRequest = (user) => axios.post(`${API}/register`, user);
