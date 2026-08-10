import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const login = async (email, password) => {
        try {
            // loginUser already returns response.data
            const data = await loginUser({
                email,
                password,
            });

            console.log("Login response:", data);

            localStorage.setItem("token", data.token);

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setUser(data.user);
            }

            setToken(data.token);

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error("Login error:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed",
            };
        }
    };

    const register = async (
        name,
        email,
        password,
        role = "customer"
    ) => {
        try {
            const data = await registerUser({
                name,
                email,
                password,
                role,
            });

            console.log("Register response:", data);

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error("Register error:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};