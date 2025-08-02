import { createContext, useState, useContext } from "react";

// Aqui impotamos la función de registro que creamos en el archivo api/auth.js
import { registerRequest } from "../api/auth.js";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setError] = useState([]);

	const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log(res.data);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			setError(error.response.data.message);
			//console.log(error.response);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signup,
				user,
				isAuthenticated,
				errors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
