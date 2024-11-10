import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();
const UserContext = createContext()

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
export const useLoggedIn = () =>useContext(UserContext)