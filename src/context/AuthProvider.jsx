import { useContext, createContext, useState, useEffect } from "react";
import { verify } from "../api/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await verify();

                if (res?.data?.user) {
                    setAuthUser(res.data.user);
                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);