import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	const signup = async (username, email, password) => {
		const res = await fetch("http://localhost:4000/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, email, password }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Signup failed");
		}

		const data = await res.json();
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
	};

	const login = async (email, password) => {
		const res = await fetch("http://localhost:4000/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Login failed");
		}

		const data = await res.json();
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
